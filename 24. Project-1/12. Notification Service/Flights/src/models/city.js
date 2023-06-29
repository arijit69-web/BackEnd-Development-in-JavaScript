/* 
To create this file run the below command in the terminal 
inside the /src directory

` npx sequelize model:generate --name City --attributes name:string`
*/
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Airport, {
        // 1 City has many Airports.
        foreignKey: "cityId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  City.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "City",
    }
  );
  return City;
};
