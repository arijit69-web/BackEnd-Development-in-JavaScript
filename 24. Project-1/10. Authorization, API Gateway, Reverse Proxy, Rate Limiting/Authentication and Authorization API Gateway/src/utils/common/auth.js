const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { ServerConfig } = require("../../config");
function checkPassword(plainPassword, encryptedPassword) {
  //  if the password is valid/not
  try {
    return bcrypt.compareSync(plainPassword, encryptedPassword);
  } catch (error) {
    throw error;
  }
}

function createToken(input) {
  // creating a JWT Token and returning it to the client
  try {
    return jwt.sign(input, ServerConfig.JWT_SECRET, {
      expiresIn: ServerConfig.JWT_EXPIRY,
    });
  } catch (error) {
    throw error;
  }
}

function verifyToken(token) {
  // verifying a JWT Token
  try {
    return jwt.verify(token, ServerConfig.JWT_SECRET);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  checkPassword,
  createToken,
  verifyToken,
};
