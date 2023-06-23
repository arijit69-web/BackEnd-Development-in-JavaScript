const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  SALT_ROUNDS: process.env.SALT_ROUNDS,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
  JWT_SECRET: process.env.JWT_SECRET,
};

/*
Environment Variable: An environment variable is a variable whose value is set 
outside the program, typically through functionality built 
into the operating system or microservice. An environment 
variable is made up of a name/value pair, and any number 
may be created and available for reference at a point in 
time.
*/
