const { StatusCodes } = require("http-status-codes");

const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const { UserService } = require("../services");

function validateAuthRequest(req, res, next) {
  if (!req.body.email) {
    ErrorResponse.message = "Failed to authenticate the user";
    ErrorResponse.error = new AppError(
      ["The Email was not found in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.password) {
    ErrorResponse.message = "Failed to authenticate the user";
    ErrorResponse.error = new AppError(
      ["The Password was not found in the incoming request"],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}
async function checkAuth(req, res, next) {
  try {
    const response = await UserService.isAuthenticated(
      // This middleware will check if the user is authenticated or not using JWT Token
      req.headers["x-access-token"] // x-access-token -> JWT Token
    );
    if (response) {// response is the user id
      // if no error actually happened
      req.user = response; // setting the user id inside the req object's user property | Downstream/internal APIs use this to identify that the incoming request is the authenticated one and who the actual user is.
      next();
    }
  } catch (error) {
    return res.status(error.statusCode).json(error);
  }
}

async function isAdmin(req, res, next) {
  const response = await UserService.isAdmin(req.user); // When we are doing isAutenticated() then inside isAutenticated() if the user is Autenticated then inside the req object I was setting the `user` property which contains the id of the user `req.user = response;`. So we don't want to separately pass the user id, we will just pass req.user as a parameter
  if (!response) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "The user is not authorized to perform this action" });
  }
  next();
}
module.exports = {
  validateAuthRequest,
  checkAuth,
  isAdmin
};
