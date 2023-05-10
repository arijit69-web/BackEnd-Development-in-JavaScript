const { AirplaneService } = require("../services");
const { StatusCodes } = require("http-status-codes");
/*
method: POST request 
URL: \airplanes
data: req.body: {modelNumber: 'airbus320', capacity:200}
*/
async function createAirplane(req, res) {
  try {
    const airplane = await AirplaneService.createAirplane({
      modelNumber: req.body.modelNumber,
      capacity: req.body.capacity,
    });
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Successfully created an Airplane",
      data: airplane,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to create an Airplane",
      data: {},
      error: error,
    });
  }
}

module.exports = {
  createAirplane,
};
