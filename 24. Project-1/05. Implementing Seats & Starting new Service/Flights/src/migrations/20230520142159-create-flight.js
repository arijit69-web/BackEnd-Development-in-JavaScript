"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Flights", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      flightNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      airplaneId: {
        // Foreign Key
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Airplanes",
          key: "id", // id column of Airports table/model
        },
        onDelete: "CASCADE",
      },
      departureAirportId: {
        // Foreign Key

        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Airports",
          key: "code", // code column of Airports table/model
        },
        onDelete: "CASCADE",
      },
      arrivalAirportId: {
        // Foreign Key

        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "Airports",
          key: "code", // code column of Airports table/model
        },
        onDelete: "CASCADE",
      },
      arrivalTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      departureTime: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      boardingGate: {
        type: Sequelize.STRING,
      },
      totalSeats: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Flights");
  },
};
