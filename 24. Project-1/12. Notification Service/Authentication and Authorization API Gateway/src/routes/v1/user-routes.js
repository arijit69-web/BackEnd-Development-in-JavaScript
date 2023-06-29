const express = require("express");
const { UserController } = require("../../controllers");
const { AuthRequestMiddlewares } = require("../../middlewares");
const router = express.Router();

router.post(
  "/signup",
  AuthRequestMiddlewares.validateAuthRequest,
  UserController.signup
);
router.post(
  "/signin",
  AuthRequestMiddlewares.validateAuthRequest,
  UserController.signin
);
// If u are a logged-in admin then only u can add a role to a user - Authorization
router.post(
  "/role",
  AuthRequestMiddlewares.checkAuth,
  AuthRequestMiddlewares.isAdmin,
  UserController.addRoleToUser
);

module.exports = router;
