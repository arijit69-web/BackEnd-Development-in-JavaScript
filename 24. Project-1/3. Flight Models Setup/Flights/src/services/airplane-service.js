/*
- Controllers pass the request to the service.
- Services use repositories to interact with the database.
*/

const { AirplaneRepository } = require("../repositories/");
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data) {
  try {
    const airplane = await airplaneRepository.create(data);
    return airplane;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      // If u get a SequelizeValidationError, it is something that is not coming correctly from the client side.  We have to send a meaningful full response to the user/client that this validation is not going correctly, so please correct this field. So status code will also be some client related status code.
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST); // Send client-related status code for SequelizeValidationError
    }
    throw new AppError(
      "Cannot create a new Airplance Object!",
      StatusCodes.INTERNAL_SERVER_ERROR
    ); // Or else send server-related status code
  }
}

async function getAirplanes() {
  try {
    const airplanes = await airplaneRepository.getAll();
    return airplanes;
  } catch (error) {
    throw new AppError(
      "Data for all airplanes cannot be retrieved!",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAirplane(id) {
  try {
    const airplane = await airplaneRepository.get(id);
    return airplane;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        // error.message, //Overriding the error message thrown from the get(id) function inside the crud-repository file
        "There is no airplane available for the request you made!",
        error.statusCode
      );
    }
    throw new AppError(
      `The airplane's data cannot be retrieved!`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function destroyAirplane(id) {
  try {
    const response = await airplaneRepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        // error.message, //Overriding the error message thrown from the destroy(id) function inside the crud-repository file
        "For the request you made, there is no airplane available to delete!",
        error.statusCode
      );
    }
    throw new AppError(
      `The airplane's data cannot be retrieved!`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function updateAirplane(id, data) {
  try {
    const response = await airplaneRepository.update(id, data);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        // error.message, //Overriding the error message thrown from the destroy(id) function inside the crud-repository file
        "For the request you made, there is no airplane / column available to update!",
        error.statusCode
      );
    } else if (error.name == "SequelizeValidationError") {
      // If u get a SequelizeValidationError, it is something that is not coming correctly from the client side.  We have to send a meaningful full response to the user/client that this validation is not going correctly, so please correct this field. So status code will also be some client related status code.
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST); // Send client-related status code for SequelizeValidationError
    }
    throw new AppError(
      `The airplane's data cannot be updated!`,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createAirplane,
  getAirplanes,
  getAirplane,
  destroyAirplane,
  updateAirplane,
};
