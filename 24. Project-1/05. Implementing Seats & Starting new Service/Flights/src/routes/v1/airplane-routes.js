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

/*
method: GET
URL : /api/v1/airplanes/
*/
router.get("/", AirplaneController.getAirplanes);

/*
method: GET
URL : /api/v1/airplanes/:id
*/
router.get("/:id", AirplaneController.getAirplane);

/*
method: DELETE
URL : /api/v1/airplanes/:id
*/
router.delete("/:id", AirplaneController.destroyAirplane);

/*
Here we don't have to validate this :id. But in MongoDB, we 
have to validate the id that we are passing as MongoDB does 
not provide incremental ids like 1,2,3,4,5... It gives u a 
hashed ID. So we have to put middleware in b/w to check if 
it is a valid Mongo ID or not, as someone can pass just a 
random :id 
*/

router.patch(
  "/:id",
  AirplaneMiddlewares.validateUpdateRequest,
  AirplaneController.updateAirplane
);

module.exports = router;
