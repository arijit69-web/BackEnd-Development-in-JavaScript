const { Sequelize } = require("sequelize");
const CrudRepository = require("./crud-repository");
const { Flight, Airplane, Airport, City } = require("../models");

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
}

module.exports = FlightRepository;

// Link for Eager Loading -> https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/
