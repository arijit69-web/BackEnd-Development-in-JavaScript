/* 
To create this file run the below command in the terminal 
inside the /src directory

`npx sequelize model:generate --name Airport --attributes name:string,code:string,address:string,cityId:integer`
*/
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Airport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.City, {
        foreignKey: "cityId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }); // Airports belong to a City and Foreign Key is the cityId inside the airports table based on u say Airports belong to a City.
      this.hasMany(models.Flight, {
        // 1 Airport can have many Flights
        foreignKey: "departureAirportId",
        onDelete: "CASCADE",
      });
      this.hasMany(models.Flight, {
        // 1 Airport can have many Flights
        foreignKey: "arrivalAirportId",
        onDelete: "CASCADE",
      });
    }
  }
  Airport.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      address: {
        type: DataTypes.STRING,
        unique: true,
      },
      cityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Airport",
    }
  );
  return Airport;
};
