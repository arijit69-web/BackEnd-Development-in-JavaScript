/*
To create this file run the below command in the terminal 
inside the /src directory
`npx sequelize model:generate --name 
Flight --attributes flightNumber:string,airplaneId:integer,departureAirportId:integer,arrivalAirportId:integer,arrivalTime:date,departureTime:date,price:integer,boardingGate:string,totalSeats:integer;`
*/
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Airplane, {
        // A flight will belong to an Airplane
        foreignKey: "airplaneId",
      });
      this.belongsTo(models.Airport, {
        foreignKey: "departureAirportId",
        as: "departureAirport", // In flight-reposiorty, Airport is associated to Flight multiple times below. To identify the correct association, you must use the 'as' keyword to specify the alias of the association you want to include.
      });
      this.belongsTo(models.Airport, {
        foreignKey: "arrivalAirportId",
        as: "arrivalAirport", // In flight-reposiorty, Airport is associated to Flight multiple times above. To identify the correct association, you must use the 'as' keyword to specify the alias of the association you want to include.
      });
    }
  }
  Flight.init(
    {
      flightNumber: { // In this project, The same flightNumber can be there for multiple routes, so kept it repeatable.
        type: DataTypes.STRING,
        allowNull: false,
      },
      airplaneId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      departureAirportId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      arrivalAirportId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      arrivalTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      departureTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      boardingGate: {
        type: DataTypes.STRING,
      },
      totalSeats: {
        // total remaining seats
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Flight",
    }
  );
  return Flight;
};
