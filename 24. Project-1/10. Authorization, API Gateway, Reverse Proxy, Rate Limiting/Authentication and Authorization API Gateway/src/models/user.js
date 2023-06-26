/*
To create this file run the below command in the terminal 
inside the /src directory
npx sequelize model:generate --name User --attributes email:string,password:string
*/
"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const { ServerConfig } = require("../config");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // One user can have many roles -> Many to Many Associations | Through Table is User_Roles | Eg. 1 user can get `m` no. of roles i.e. When he works in the Airline Company, he is the ADMIN, CUSTOMER, and FLIGHT COMPANY
      this.belongsToMany(models.Role, { through: "User_Roles", as: "role" });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 50],
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  /*
  Hooks in Sequelize
  Before we create a new user we can write a hook/triggers 
  that encrypts/hash the user's password before storing it 
  in the DB.
  */
  User.beforeCreate(function encrypt(user) {
    // user is a plain JS object that is going to be used in order to create an entry in MySQL
    // user is the object before the creation of the record in the MySQL DB
    const encryptedPassword = bcrypt.hashSync(
      user.password,
      +ServerConfig.SALT_ROUNDS // converting the string type to a number type using + unary operator
    );
    user.password = encryptedPassword;
  });

  return User;
};

/*
Hooks (also known as lifecycle events), are functions which
are called before and after calls in sequelize are executed.
For example, if you want to always set a value on a model 
before saving it, you can add a beforeUpdate hook.
A trigger defines a set of actions that are performed in 
response to an insert, update, or delete operation on a 
specified table. When such an SQL operation is executed, 
the trigger is said to have been activated. 
Hooks are triggers in sequelize.

Before we create a new user we can write a hook/triggers 
that encrypts/hash the user's password before storing it 
in the DB.

JS library bycrypt will be used to encrypt the users' 
passwords.

Bcrypt turns a simple password into fixed-length characters
called a hash. Before hashing a password, bcrypt applies a 
salt — a unique random string that makes the hash 
unpredictable. 
Bycypt will also compare the normal string password given 
by the user with the hash password stored in the database 
when the user signs in.


With "salt round" they actually mean the cost factor. The cost factor controls how much time is needed to calculate a single BCrypt hash. The higher the cost factor, the more hashing rounds are done. Increasing the cost factor by 1 doubles the necessary time. The more time is necessary, the more difficult is brute-forcing.
The salt is a random value, and should differ for each calculation, so the result should hardly ever be the same, even for equal passwords.

Link for Hooks in Sequelize  -> https://sequelize.org/docs/v6/other-topics/hooks/
*/
