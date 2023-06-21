"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Airports", {
      // Add a constraint to a table
      type: "FOREIGN KEY",
      name: "city_fkey_constraint",
      fields: ["cityId"],
      references: {
        table: "Cities",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    // Remove a constraint from a table
    await queryInterface.removeConstraint("Airports", "city_fkey_constraint");
  },
};

/*
MySQL Query to check if constraint has been applied or not :
select * from INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'airports' AND CONSTRAINT_SCHEMA = 'flights';
*/
