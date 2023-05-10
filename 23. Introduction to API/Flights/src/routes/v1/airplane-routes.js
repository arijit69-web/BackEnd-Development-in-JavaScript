const express = require("express");
const { AirplaneController } = require("../../controllers");
const router = express.Router();

/*
method: POST
URL : /api/v1/airplanes/
*/
router.post("/", AirplaneController.createAirplane);

module.exports = router;
