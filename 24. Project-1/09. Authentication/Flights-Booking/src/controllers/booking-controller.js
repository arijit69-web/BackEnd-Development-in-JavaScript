const { StatusCodes } = require("http-status-codes");
const { BookingService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

const inMemDb = {};

async function createBooking(req, res) {
  try {
    const response = await BookingService.createBooking({
      flightId: req.body.flightId,
      userId: req.body.userId,
      noOfSeats: req.body.noOfSeats,
    });
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}
async function makePayment(req, res) {
  try {
    const idempotencyKey = req.headers["x-idempotency-key"]; // req.headers -> An object containing the predefined/custom header given in the current request.
    if (!idempotencyKey) {
      ErrorResponse.error = "The IDEMPOTENCY KEY is missing";
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if (inMemDb[idempotencyKey]) {
      ErrorResponse.error = "Cannot retry the request on a Successful Payment";
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    const response = await BookingService.makePayment({
      totalCost: req.body.totalCost,
      userId: req.body.userId,
      bookingId: req.body.bookingId,
    });
    inMemDb[idempotencyKey] = idempotencyKey;
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
}

module.exports = {
  createBooking,
  makePayment,
};
