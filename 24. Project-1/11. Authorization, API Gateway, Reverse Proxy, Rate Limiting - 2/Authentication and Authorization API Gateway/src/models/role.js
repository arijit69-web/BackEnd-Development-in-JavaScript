/*
To create this file run the below command in the terminal 
inside the /src directory
npx sequelize model:generate --name Role --attributes name:string
*/
"use strict";
const { Model } = require("sequelize");
const { Enums } = require("../utils/common");
const { ADMIN, CUSTOMER, FLIGHT_COMPANY } = Enums.USER_ROLES_ENUMS;

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // One role can belong to many users -> Many to Many Associations | Through Table is User_Roles | Eg. CUSTOMER role can be given to `n` no. of users
      this.belongsToMany(models.User, { through: "User_Roles", as: "user" });
    }
  }
  Role.init(
    {
      name: {
        type: DataTypes.ENUM({
          values: [ADMIN, CUSTOMER, FLIGHT_COMPANY],
        }),
        allowNull: false,
        defaultValue: CUSTOMER,
      },
    },
    {
      sequelize,
      modelName: "Role",
    }
  );
  return Role;
};
