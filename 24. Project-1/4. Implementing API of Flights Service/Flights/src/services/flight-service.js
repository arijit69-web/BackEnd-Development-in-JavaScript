const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const { Op } = require("sequelize");
const AppError = require("../utils/errors/app-error");
const flightRepository = new FlightRepository();

/*
- Admin will create/update a Flight
- User will get/fetch all the Flights
*/

async function createFlight(data) {
  try {
    const flight = await flightRepository.create(data);
    return flight;
  } catch (error) {
    //console.log(error);
    if (
      error.name == "SequelizeValidationError" ||
      error.name == "SequelizeUniqueConstraintError"
    ) {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    } else if (
      error.name == "SequelizeForeignKeyConstraintError" ||
      error.name == "SequelizeDatabaseError"
    ) {
      let explanation = [];
      explanation.push(error.parent.sqlMessage);
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    throw new AppError(
      "Cannot create a new Flight object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllFlights(query) {
  let customFilter = {};
  let sortFilter = [];
  const endingTripTime = " 23:59:00";
  // trips = Souce-Destination | eg. MUM-DEL
  if (query.trips) {
    [departureAirportId, arrivalAirportId] = query.trips.split("-");
    customFilter.departureAirportId = departureAirportId;
    customFilter.arrivalAirportId = arrivalAirportId;
  }
  if (query.price) {
    [minPrice, maxPrice] = query.price.split("-");
    console.log(maxPrice);
    customFilter.price = {
      [Op.between]: [minPrice, maxPrice == undefined ? 100000 : maxPrice], // If maxPrice is not set from the frontend, set it to 100000
    };
  }
  if (query.travellers) {
    // The available no. of seats should be equal to the number of travelers expected or greater than that
    customFilter.totalSeats = {
      [Op.gte]: query.travellers,
    };
  }
  if (query.tripDate) {
    // Display all flights on a particular date
    customFilter.departureTime = {
      [Op.between]: [query.tripDate, query.tripDate + endingTripTime],
    };
  }
  if (query.sort) {
    // sort by Departure Time ASC order and along with that sort by Price DESC order
    const params = query.sort.split(","); // departureTime_ASC,price_DESC
    const sortFilters = params.map((param) => param.split("_")); //  [ 'price', 'DESC' ], [ 'departureTime', 'ASC' ] 
    sortFilter = sortFilters; // put it inside an array -> [ [ 'price', 'DESC' ], [ 'departureTime', 'ASC' ] ]
  }

  try {
    const flights = await flightRepository.getAllFlights(
      customFilter,
      sortFilter
    );
    return flights;
  } catch (error) {
    console.log(error);
    throw new AppError(
      "The flight's data cannot be retrieved!",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
module.exports = {
  createFlight,
  getAllFlights,
};
