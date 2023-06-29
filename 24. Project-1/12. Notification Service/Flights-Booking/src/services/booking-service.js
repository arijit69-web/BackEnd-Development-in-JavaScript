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
  /*
 We will be also making one transaction inside the 
 updateRemainingSeats() function in the flight-repository.js  
 because if anyone starts using this function createBooking(data) we wanted to be 
 club inside 1 transaction that either everything goes 
 or nothing goes.
*/
  // This is a Managed Transactions -> committing and rolling back the transaction should be done manually by the user (by calling the appropriate Sequelize methods).
  const transaction = await db.sequelize.transaction(); // Whenever I need to wrap a query within a transaction, I use the transaction object. I can pass the `transaction` object.
  // Wrapping all of these in 1 transaction
  try {
    const flight = await axios.get(
      `${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}`
    );
    const flightData = flight.data.data;
    if (data.noOfSeats > flightData.totalSeats) {
      // Is the number of seats we want to book available within the flights?
      throw new AppError(
        "Sorry! Seats are not available",
        StatusCodes.BAD_REQUEST
      );
    }
    const totalBillingAmount = data.noOfSeats * flightData.price;
    const bookingPayload = { ...data, totalCost: totalBillingAmount }; // When users send somethings we have currently userId, noOfSeats, flightId. In order to create a booking we need a totalCost as well so destructuring the object `data` using the spread operator `...data` and then adding one more key-value pair
    const booking = await bookingRepository.createBooking(
      bookingPayload,
      transaction
    ); // This is going to create a new booking for us and will be in an `INITIATED` state and the transaction will reserve the selected number of seats for the current booking for 5 mins for the end users to actually complete the payment, if not completed the payment on time then whatever no. of seats blocked by the transaction for the current booking should be released.
    await axios.patch(
      `${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}/seats`,
      {
        seats: data.noOfSeats, // passing the data inside the req.body
      }
    ); // Booking has been `INITIATED` so reserve noOfSeats in the actual flights or update the seats in the actual flights using patch()

    await transaction.commit(); // If everything goes well do a commit
    return booking;
  } catch (error) {
    await transaction.rollback(); // If we get any error/anything fails above do a rollback
    if (error.code == "ERR_BAD_REQUEST") {
      throw new AppError(
        // error.message, //Overriding the error message thrown from the destroy(id) function inside the crud-repository file
        "There is no flight available for the request you made!",
        400
      );
    }
    if (error.statusCode == StatusCodes.BAD_REQUEST) {
      throw new AppError(
        // error.message, //Overriding the error message thrown from the destroy(id) function inside the crud-repository file
        "Sorry! Seats are not available",
        error.statusCode
      );
    }
    throw new AppError(
      "Sorry! The Booking was not successful. Booking Service is down",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function makePayment(data) {
  const transaction = await db.sequelize.transaction();
  try {
    const bookingDetails = await bookingRepository.get(
      data.bookingId,
      transaction
    );
    if (bookingDetails.status == BOOKED) {
      throw new AppError(
        "You have already booked your flight! You can't retry the request on a successful Booking ID",
        StatusCodes.BAD_REQUEST
      );
    }
    if (bookingDetails.status == CANCELLED) {
      throw new AppError(
        "Booking session has expired",
        StatusCodes.BAD_REQUEST
      );
    }
    const bookingTime = new Date(bookingDetails.createdAt);
    const currentTime = new Date();

    if (currentTime - bookingTime > 300000) {
      // The transaction will reserve the selected number of seats for the current booking for 5 mins for the end users to actually complete the payment, if not completed the payment on time then whatever no. of seats blocked by the transaction for the current booking should be released.
      await cancelBooking(data.bookingId);
      throw new AppError(
        "Booking session has expired",
        StatusCodes.BAD_REQUEST
      );
    }

    if (bookingDetails.userId != data.userId) {
      throw new AppError(
        "There is no match between the user and the booking",
        StatusCodes.NOT_FOUND
      );
    }
    if (bookingDetails.totalCost != data.totalCost) {
      // The payment that we have made does not match the booking payment
      throw new AppError(
        "There is a discrepancy in the amount of the payment",
        StatusCodes.PAYMENT_REQUIRED
      );
    }

    // we assume here that payment is successful
    const response = await bookingRepository.update(
      data.bookingId,
      { status: BOOKED },
      transaction
    );
    Queue.sendData({
      recepientEmail: "arijitsrkr13@gmail.com",
      subject: "Flight Booked",
      text: `Booking successfully done for the booking ${data.bookingId}`,
    }); // Queue.sendData() should work asynchronously so no need for `await` here
    await transaction.commit();
    return response;
  } catch (error) {
    await transaction.rollback();
    if (error instanceof AppError) throw error;

    throw new AppError(
      "Sorry! The Booking was not successful. Payment Service is down",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function cancelBooking(bookingId) {
  const transaction = await db.sequelize.transaction();
  try {
    const bookingDetails = await bookingRepository.get(bookingId, transaction);
    if (bookingDetails.status == CANCELLED) {
      await transaction.commit();
      return true;
    }
    await axios.patch(
      `${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${bookingDetails.flightId}/seats`,
      {
        seats: bookingDetails.noOfSeats,
        dec: false,
      }
    );
    await bookingRepository.update(
      bookingId,
      { status: CANCELLED },
      transaction
    );
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        // error.message, //Overriding the error message thrown from the destroy(id) function inside the crud-repository file
        "For the request you made, there is no bookingId available to cancel!",
        error.statusCode
      );
    }
    throw new AppError(
      "Sorry! The Cancellation was unsuccessful. Cancellation Service is down",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
/*
We need to execute the same logic as cancelBooking() after 
every 5-10 mins to check for bookings whose sessions are 
already expired and can never be booked by the respected 
users. So all the seats occupied by those bookings should 
be set free so that other users can book those seats.

The task cancelBooking() must be executed periodically after
a certain interval. We can use a timer using setTimeInterval()
to execute that after every 5-10 minutes. There is a problem
with that if the server is down for some time then those
changes/cancellations were not gonna work.

To handle this kind of case we have CRON JOBS

Cron jobs are scheduled at recurring intervals, specified 
using a format based on unix-cron. You can define a schedule
so that your job runs multiple times a day, or runs on 
specific days and months.

We will use a package called node-cron.

*/
async function cancelOldBookings() {
  const transaction = await db.sequelize.transaction();
  try {
    const time = new Date(Date.now() - 1000 * 300); // new Date object 5 mins ago from now()
    const allBookingDetails = await bookingRepository.getAll(time);
    for (const booking of allBookingDetails) {
      const { flightId, noOfSeats } = booking.dataValues;
      await axios.patch(
        `${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/${flightId}/seats`,
        {
          seats: noOfSeats,
          dec: false,
        }
      );
    }
    const response = await bookingRepository.cancelOldBookings(time); // Cancel Bookings whose sessions are already expired seats and  occupied by those bookings should be set free
    await transaction.commit();
    return response;
  } catch (error) {
    await transaction.rollback();
    throw new AppError(
      "An error occurred while running the CRON JOB",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllFlights(data) {
  try {
    const flight = await axios.get(
      `${ServerConfig.FLIGHT_SERVICE}/api/v1/flights/`,
      { params: data }
    );
    return flight.data.data;
  } catch (error) {
    if (error.code == "ERR_BAD_REQUEST") {
      throw new AppError(
        // error.message, //Overriding the error message thrown from the destroy(id) function inside the crud-repository file
        error.response.data.message,
        400
      );
    }

    throw new AppError(
      "Sorry! The Search was not successful. Search Service is down",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createBooking,
  makePayment,
  cancelBooking,
  cancelOldBookings,
  getAllFlights,
};

// Link for Transactions -> https://sequelize.org/docs/v6/other-topics/transactions/

// Link for JS Destructuring & Spread Operator -> https://www.freecodecamp.org/news/javascript-destructuring-and-spread-operator-explained/
