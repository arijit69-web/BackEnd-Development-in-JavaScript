const express = require("express");

const { CityController } = require("../../controllers");
const { CityMiddlewares } = require("../../middlewares");

const router = express.Router();

router.post(
  "/",
  CityMiddlewares.validateCreateRequest,
  CityController.createCity
);

router.delete("/:id", CityController.destroyCity);

router.patch(
  "/:id",
  CityMiddlewares.validateUpdateRequest,
  CityController.updateCity
);
module.exports = router;
