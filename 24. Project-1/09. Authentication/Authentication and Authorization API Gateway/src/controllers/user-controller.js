const { StatusCodes } = require("http-status-codes");

const { UserService } = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

/*
method: POST request 
URL: /signup 
data: req.body: {email, password}
*/

async function signup(req, res) {
  try {
    const user = await UserService.signup({
      email: req.body.email,
      password: req.body.password,
    });
    SuccessResponse.data = user;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/*
method: POST request 
URL: /signin
data: req.body: {email, password}
*/

async function signin(req, res) {
  try {
    const user = await UserService.signin({
      email: req.body.email,
      password: req.body.password,
    });
    SuccessResponse.data = user;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
  signup,
  signin,
};
