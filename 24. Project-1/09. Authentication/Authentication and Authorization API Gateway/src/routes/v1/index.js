const express = require("express");
const router = express.Router();
const { InfoController } = require("../../controllers");
const { AuthRequestMiddlewares } = require("../../middlewares");
const userRouter = require("./user-routes");

router.get("/info", AuthRequestMiddlewares.checkAuth, InfoController.info);
router.use("/user", userRouter);

module.exports = router;
