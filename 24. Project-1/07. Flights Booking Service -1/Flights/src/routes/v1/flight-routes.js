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
  FlightMiddlewares.validatePriceAndSeats,
  FlightMiddlewares.validateArrivalDestinationCodeReqBody,
  FlightController.createFlight
);
router.get(
  "/",
  FlightMiddlewares.validateArrivalDestinationCodeQueryParams,
  FlightController.getAllFlights
);
router.get("/:id", FlightController.getFlight);

router.patch(
  "/:id/seats", // Update the seats of the flight having id as :id
  FlightMiddlewares.validateUpdateSeatsRequest,
  FlightController.updateSeats
);

module.exports = router;
