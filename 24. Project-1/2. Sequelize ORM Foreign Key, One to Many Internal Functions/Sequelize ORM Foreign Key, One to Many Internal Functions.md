# Sequelize Foreign Key

The `cityid` column in the `airports` table is a plain & simple integer column. So we want to modify a column in the SQL table. We would like the `cityid` column in the `airports` table to become a foreign key. If we need to make this column a foreign key then we have to make a database-level change and if u want to do a DB-level change a migration is good to go with.


### [QueryInterface of Sequelize](https://sequelize.org/api/v6/class/src/dialects/abstract/query-interface.js~queryinterface#instance-method-addConstraint)

## DB level change - Migration

Step 1: Inside the terminal, inside the `/src` folder write the following command:

```
$ npx sequelize migration:generate --name <file-name>
```
Eg.
```
$ npx sequelize migration:generate --name update-city-airport-association
```

> migration:generate -> means u already have a model u just want to make updates to the model. U don't create a new model or generate a new model.

Step 2: Inside the migration file `update-city-airport-association.js` we have to write the code ourselves regarding what changes we are actually looking forward inside this particular migration/DB.

```js
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
    await queryInterface.removeConstraint("Airports", "city_fkey_constraint");
  },
};
```

Added the `cityId` as a `foreign key` constraint to the `airports'` table referencing the `cities` table. 

Step 3: Inside the terminal, inside the `/src` folder write the following command:

```
$ npx sequelize db:migrate
```

**Changes to the airports table are made at the DB level.**

Step 4: These constraints happen only on the DB level but on the JS level, sequelize provides u with some extra functionalities. Inside the `model`  folder inside the `airports.js` file, there is a ` static associate(models){ } ` method that can help us to make changes on the JS level code too.

```js
 static associate(models) {
      this.belongsTo(models.City, {
        foreignKey: "cityId",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      }); // Airports belong to a City and Foreign Key is the cityId inside the airports table based on u say Airports belong to a City.
    }
```

Now u have set Airport belongs to a City which means 1 Airport will belong to 1 City but 1 City has many Airports.

Inside the `model`  folder inside the `city.js` file, there is a ` static associate(models){ } ` method that can help us to make changes on the JS level code too.

```js
 static associate(models) {
      // 1 City has many Airports.
      this.hasMany(models.Airport, { 
        foreignKey: 'cityId',
        onDelete: 'CASCADE',
        onUpdate: "CASCADE",
      })
    }
```

**Now, changes to the airports table are made at the DB level as well as at the JS level.**

</br>

```diff
+ IMPORTANT NOTE: Using Migration u have DB level constraints but if u will also set up JS level constraints then sequelize gives u interesting functions by default. It will automatically create some functions for you on the go. Those functions will never be created by you; they will be provided by sequelize itself. U will be able to use those functions directly using the models. Write those interesting functions in a camelCase manner. 

eg-1. await city.createAirport({});
eg-2. await city.getAirports({}); 

- These above functions have never been created by us. These are the inbuilt functions provided by the Sequelize only.
```

Watch this video to know more about the `Sequelize Auto-Inbuilt Functions`:
### [VIDEO](https://drive.google.com/file/d/1PsAmXzgfdXESrfATrh85cuWTDAmwUy89/view?usp=share_link)

</br>

>NOTE: MySQL Query to check if a constraint has been applied or not:

```
> select * from INFORMATION_SCHEMA.KEY_COLUMN_USAGE where TABLE_NAME = 'airports' AND CONSTRAINT_SCHEMA = 'flights';
```
