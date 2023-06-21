/*
There is an Error class in JS
*/
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.explanation = message;
  }
}
module.exports = AppError;
