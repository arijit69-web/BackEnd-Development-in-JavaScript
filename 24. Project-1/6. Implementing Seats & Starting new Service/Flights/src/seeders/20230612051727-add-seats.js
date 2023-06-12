/*
To create this file run the below command in the terminal 
inside the /src directory
`npx sequelize seed:generate --name add-seats`
*/
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Seats", [
      {
        airplaneId: 10,
        row: 1,
        col: "A",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 10,
        row: 1,
        col: "B",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 10,
        row: 1,
        col: "C",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 10,
        row: 1,
        col: "D",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 10,
        row: 1,
        col: "E",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 10,
        row: 1,
        col: "F",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 10,
        row: 2,
        col: "A",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 10,
        row: 2,
        col: "B",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 10,
        row: 2,
        col: "C",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 10,
        row: 2,
        col: "D",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 10,
        row: 2,
        col: "E",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        airplaneId: 10,
        row: 2,
        col: "F",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

/*
To run this specific seed file inside the seeders folder, run the below command in the terminal 
inside the /src directory
`npx sequelize db:seed --seed 20230612051727-add-seats.js`
*/