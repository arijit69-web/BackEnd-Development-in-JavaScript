const express = require("express");
const { AirplaneController } = require("../../controllers");
const { AirplaneMiddlewares } = require("../../middlewares");

const router = express.Router();

/*
method: POST
URL : /api/v1/airplanes/
*/
router.post(
  "/",
  AirplaneMiddlewares.validateCreateRequest,
  AirplaneController.createAirplane
); // So whenever you come to this request, you will first validate this request using the middleware `AirplaneMiddlewares.validateCreateRequest` and then u will create the request using the `AirplaneController.createAirplane` controller.
module.exports = router;
