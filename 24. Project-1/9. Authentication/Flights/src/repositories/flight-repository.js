const { Sequelize } = require("sequelize");
const CrudRepository = require("./crud-repository");
const { Flight, Airplane, Airport, City } = require("../models");
const db = require("../models"); // get the db object that gets returned from the models index file  - To perform raw query in Sequelize
const { addRowLockOnFlights } = require("./queries"); // RAW MYSQL Queries
const AppError = require("../utils/errors/app-error");
const { StatusCodes } = require("http-status-codes");
const { Logger } = require("../config");

class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }

  async getAllFlights(filter, sort) {
    const response = await Flight.findAll({
      where: filter,
      order: sort,
      include: [
        {
          // Join is already made on the Primary Key Column
          // Eager Loading - Eager Loading is the act of querying data of several models at once (one 'main' model and one or more associated models). At the SQL level, this is a query with one or more joins.
          model: Airplane, // The entire Airplane Model Object will be fetched by airplaneId inside the Flight Model Object
          required: true, // When eager loading, we can force the query to return only records which have an associated model, effectively converting the query from the default OUTER JOIN to an INNER JOIN. This is done with the `required: true` option
        },
        {
          // Join is not made on the Primary Key Column, rather it is made on the Airport.code (Not Primary Key Column)
          model: Airport,
          required: true,
          as: "departureAirport", // Airport is associated to Flight multiple times. To identify the correct association, you must use the 'as' keyword to specify the alias of the association you want to include.
          // departureId is based on Airport.code and not based on Airport.id. But by default it will try to do the mapping on Airport.id but we want to do the mapping on Airport.code so for that we can specifically mention on what columns u want the comparison of the join to happen using `on:` property
          // On which particular columns u want to do the corresponding mapping
          on: {
            col1: Sequelize.where(
              // which columns to compare in the joining of 2 tables
              Sequelize.col("Flight.departureAirportId"),
              "=",
              Sequelize.col("departureAirport.code")
            ),
          },
          include: {
            model: City,
            required: true,
          },
        },
        {
          // Join is not made on the Primary Key Column, rather it is made on the Airport.code (Not Primary Key Column)

          model: Airport, // The entire Airport Model Object will be fetched by airplaneId inside the Flight Model Object
          required: true,
          as: "arrivalAirport", // Airport is associated to Flight multiple times. To identify the correct association, you must use the 'as' keyword to specify the alias of the association you want to include.
          on: {
            col1: Sequelize.where(
              Sequelize.col("Flight.arrivalAirportId"),
              "=",
              Sequelize.col("arrivalAirport.code")
            ),
          },
          include: {
            model: City,
            required: true,
          },
        },
      ],
    });
    return response;
  }
  /*
  1. flightId - For what flight u want to update the seats
  2. seats - No. of Seats booked / canceled
  3. dec -  decrease with default value as true [If this parameter is true decrease the no. of seats & if this parameter is false increase the no. of seats]
 */
  async updateRemainingSeats(flightId, seats, dec = true) {
    // We will execute these inside a Transaction and the other service that will use this function will bind it into a Transaction and then things will start working.
    /*
    SELECT FOR UPDATE is a SQL command that’s useful in the context of transactional workloads. It allows you to “lock” the rows returned by a SELECT query until the entire transaction that query is part of has been committed. Other transactions attempting to access those rows are placed into a time-based queue to wait, and are executed chronologically after the first transaction is completed.
    This is useful because it prevents the thrashing and unnecessary transaction retries that would otherwise occur when multiple transactions are attempting to read those same rows. Any time multiple transactions are likely to be working with the same rows at roughly the same time, SELECT FOR UPDATE can be used to increase throughput and decrease tail latency (compared to what you would see without using it).
    In other words: SELECT FOR UPDATE makes contended transactions process more smoothly (which generally also means they process more quickly and efficiently).

    await db.sequelize.query(
      `SELECT * FROM Flights WHERE Flights.id = ${flightId} FOR UPDATE;`
    ); // -> Raw Query of MYSQL in Sequelize for ROW-LEVEL LOCK -> In this query, we are going to put a ROW-LEVEL LOCK on the table row for any updates we wish to make.
    */
    const transaction = await db.sequelize.transaction(); // Whenever I need to wrap a query within a transaction, I use the transaction object. I can pass the `transaction` object.
    // Wrapping all of these in 1 transaction -> It will execute in 1 complete transaction

    try {
      await db.sequelize.query(addRowLockOnFlights(flightId)); // -> Raw Query of MYSQL in Sequelize for ROW-LEVEL LOCK -> In this query, we are going to put a ROW-LEVEL LOCK on the table row for any updates we wish to make.
      const flight = await Flight.findByPk(flightId); // get the flight from the DB by id
      if (+dec) {
        // dec is coming as a string datatype so we typecast it -> Number Conversion using urnary operator.
        await flight.decrement(
          "totalSeats",
          { by: seats },
          { transaction: transaction }
        ); // If Booked - decrement the totalSeats by seats
      } else {
        await flight.increment(
          "totalSeats",
          { by: seats },
          { transaction: transaction }
        ); // If Canceled - increment the totalSeats by seats
      }
      await transaction.commit(); // If everything goes well do a commit
      return flight.reload(); // Reload the Flight Object Model from the database
    } catch (error) {
      await transaction.rollback(); // If we get any error/anything fails above do a rollback
      throw new AppError(
        "Sorry! Flight Service is down. The seats were not booked",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = FlightRepository;

// Link for Eager Loading -> https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/
// Link for Incrementing and Decrementing integer values using Sequelize -> https://sequelize.org/docs/v6/core-concepts/model-instances/#incrementing-and-decrementing-integer-values
