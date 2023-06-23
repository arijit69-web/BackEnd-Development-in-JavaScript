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
    if (response) {
      // if no error actually happened
      req.user = response; // setting the user id in the req object | Downstream/internal APIs use this to identify that the incoming request is the authenticated one and who the actual user is.
      next();
    }
  } catch (error) {
    return res.status(error.statusCode).json(error);
  }
}

module.exports = {
  validateAuthRequest,
  checkAuth,
};
