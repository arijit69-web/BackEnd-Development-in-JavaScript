const axios = require("axios");
/*
Axios is a promise-based HTTP library that lets developers make requests to either their own or a third-party server to fetch data. It offers different ways of making requests such as GET , POST , PUT/PATCH , and DELETE .
*/
const { StatusCodes } = require("http-status-codes");
const { BookingRepository } = require("../repositories");
const { ServerConfig, Queue } = require("../config");
const db = require("../models"); // get the db object that gets returned from the models index file - For Transaction
const AppError = require("../utils/errors/app-error");
const { Enums } = require("../utils/common");
const { BOOKED, CANCELLED } = Enums.BOOKING_STATUS;

const bookingRepository = new BookingRepository();

async function createBooking(data) {
  // Booking -> So 1 single Transaction

  return new Promise((resolve, reject) => {
    const result = db.sequelize.transaction(async function bookingImpl(t) {
      /* This is a Managed transactions
      Managed transactions handle committing or rolling back the transaction automatically. You start a managed transaction by passing a callback to sequelize.transaction. This callback can be async (and usually is).
      The following will happen in this case:

      Sequelize will automatically start a transaction and obtain a transaction object t
      Then, Sequelize will execute the callback you provided, passing t into it
      If your callback throws an error, Sequelize will automatically rollback the transaction
      If your callback succeeds, Sequelize will automatically commit the transaction
      Only then the sequelize.transaction call will settle:
      Either resolving with the resolution of your callback
      Or, if your callback throws, rejecting with the thrown error
      
      WE WILL CONVERT THIS TO UNMANAGED TRANSACTIONS ->  Committing and rolling back the transaction should be done manually by the user (by calling the appropriate Sequelize methods).
      */

      const flight = await axios.get(
        `${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`
      );
      const flightData = flight.data.data;
      console.log(flightData);
      if (data.noofSeats > flightData.totalSeats) {
        // Is the number of seats we want to book available within the flights?
        reject(
          new AppError(
            "Sorry! Seats are not available",
            StatusCodes.BAD_REQUEST
          )
        );
      }

      resolve(true);
    });
  });
}

module.exports = {
  createBooking,
};

// Link for Transactions -> https://sequelize.org/docs/v6/other-topics/transactions/
