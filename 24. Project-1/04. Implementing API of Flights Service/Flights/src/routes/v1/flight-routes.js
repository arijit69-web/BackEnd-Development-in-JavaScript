const express = require("express");

const { FlightController } = require("../../controllers");
const { FlightMiddlewares } = require("../../middlewares");
const {
  validateDateTime,
  validatePrice,
} = require("../../middlewares/flight-middlewares");

const router = express.Router();

router.post(
  "/",
  FlightMiddlewares.validateCreateRequest,
  FlightMiddlewares.validateDateTime,
  FlightMiddlewares.validatePrice,
  FlightMiddlewares.validateArrivalDestinationCodeReqBody,
  FlightController.createFlight
);
router.get(
  "/",
  FlightMiddlewares.validateArrivalDestinationCodeQueryParams,
  FlightController.getAllFlights
);

module.exports = router;
