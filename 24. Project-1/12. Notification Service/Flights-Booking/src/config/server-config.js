const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  FLIGHT_SERVICE: process.env.FLIGHT_SERVICE,
  PUBSUB_SERVICE: process.env.PUBSUB_SERVICE,
};

/*
Environment Variable: An environment variable is a variable whose value is set 
outside the program, typically through functionality built 
into the operating system or microservice. An environment 
variable is made up of a name/value pair, and any number 
may be created and available for reference at a point in 
time.
*/
