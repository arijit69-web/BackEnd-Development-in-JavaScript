const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req, res, next) {
  if (!req.body.modelNumber) {
    ErrorResponse.message = "Failed to create an Airplane";
    ErrorResponse.error = new AppError(
      ["The Model Number was not found in the incoming request"],
      StatusCodes.BAD_REQUEST
    );

    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next(); // If users send the Model Number properly without any fail then u will call the next middleware (i.e. the controller) using the next() function
}
module.exports = {
  validateCreateRequest,
};
