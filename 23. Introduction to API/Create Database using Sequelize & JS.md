# Create Database using Sequelize & JS

Step 1: Inside the config/config.json file write the following code:

```json
{
  "development": {
    "username": "root",
    "password": "",
    "database": "Flights",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port": 3307 //*IMPORTANT* : If your SQL is running on any other port number other than 3306, you have to explicitly mention the port number.
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

Step 2: Inside the terminal, inside the `/src` folder write the following command:

```
$ npx sequelize db:create
```

It loaded the config/config.json file and used the `Development` environment by default and it created a database `Flights`. It gets the database name from the database key inside the config/config.json.

# Create Model using Sequelize

> Every table is considered a model. So to create a table, you have to create a model.

Step 1: Inside the terminal, inside the `/src` folder write the following command:

```
$ npx sequelize  model:generate --name <TableName> --attributes <attribute1Name>:<type>,<attribute2Name>:<type>`
```

Eg.

```
$ npx sequelize  model:generate --name Airplane --attributes modelNumber:string,capacity:integer`
```

```
2 files are created:
- airplane.js -> for JS level code
- 230508150837-create-airplane.js -> for DB level code
```

- Inside `airplane.js`, it created a class Airplane for us automatically. **It does not create a table inside the database; instead, it just creates a model file and migration file.**

- The migration file `230508150837-create-airplane.js` tells u that in the next update, these are the changes that will actually happen.

- The changes that will happen will be according to the up() function present inside the `230508150837-create-airplane.js` file.

- **Query Interface**
  An instance of Sequelize uses something called Query Interface to communicate to the database in a dialect-agnostic way. Most of the methods are implemented with the help of several methods from the query interface. The methods from the query interface are therefore lower-level methods; you should use them only if you do not find another way to do it with higher-level APIs from Sequelize. They are, of course, still higher-level than running raw queries directly (i.e., writing SQL by hand).

- If u make any changes inside the `airplane.js` file which contains the JS level code then u have to also make changes inside the `230508150837-create-airplane.js` file also which contains the Database level code and vice versa.

### Create actual table/model inside the Database

In order to actually create a table/model inside the DB.

Step 2: Inside the terminal, inside the `/src` folder write the following command:

```
$ npx sequelize db:migrate
```

It migrates or creates all the pending migrations (updates made inside the table) and actually creates a table/model inside the actual Database. **Now it originally creates a table inside the Database.**

> `airplane.js` file contains the JS level code and `230508150837-create-airplane.js` file contains the Database level code.

# Create Migration using Sequelize

Step 1: Inside the terminal, inside the `/src` folder write the following command:

```
$ npx sequelize migration:generate --name <file-name>
```

Eg.

```
$ npx sequelize migration:generate --name update-city-airport-association
```

```
1 file is created:
- 20230520050006-update-city-airport-association -> for DB level code
```

### Create actual changes to the table/model inside the Database

In order to actually make changes to the table/model inside the DB.

Step 2: Inside the terminal, inside the `/src` folder write the following command:

```
$ npx sequelize db:migrate
```

It migrates or creates all the pending migrations (updates made inside the table) and actually make changes to the table/model inside the actual Database. **Now it originally make changes to the table inside the Database.**


# Undo the migration

## Undo the last migration

Step 1: Inside the terminal, inside the `/src` folder write the following command:

```
$ npx sequelize db:migrate:undo
```

## Undo all the migrations

Step 1: Inside the terminal, inside the `/src` folder write the following command:

```
$ npx sequelize db:migrate:undo:all
```

> This is how u can create versions of your Database Schema. When u are `Adding a Migration`, `async up()` function present inside the `230508150837-create-airplane.js` file is going to be applied and when you are `Undoing a migration`, `async down()` function present inside the `230508150837-create-airplane.js` file is going to be applied. In `Undo Migration` u are going to lose all the data as it is going to `Drop the Table`.

Programmatically u will be interacting with models in JS but when u query a model internally it will query that table inside the database.

</br>

# Data Types of Sequelize:

- [Data Types](https://sequelize.org/docs/v7/other-topics/other-data-types/)

</br>

> Note: Everything in the Database level can be done without migration also, Sequelize supports establishing everything without migration known as `Model Synchronization`.

</br>

# Model synchronization

When you define a model, you're telling Sequelize a few things about its table in the database. However, what if the table actually doesn't even exist in the database? What if it exists, but it has different columns, less columns, or any other difference?

This is where model synchronization comes in. A model can be synchronized with the database by calling model.sync(options), an asynchronous function (that returns a Promise). With this call, Sequelize will automatically perform an SQL query to the database. Note that this changes only the table in the database, not the model in the JavaScript side. It does not maintain any version of your database schema.

# Create a seed file and seeds using Sequelize

Step 1: Inside the terminal, inside the `/src` folder write the following command:

```
$ npx sequelize seed:generate --name <file-name>
```

Eg.

```
$ npx sequelize seed:generate --name add-airplanes
```

It will create a new seed file named as `20230511060559-add-airplanes` inside the `src/seeders` folder.

Step 2: Inside the file `20230511060559-add-airplanes`, inside the async up() function whatever entries we have to make we can make those entries using the bulkInsert() function.

```js
 async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Airplanes", [
      {
        modelNumber: "airbus340",
        capacity: 900,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        modelNumber: "boeing777",
        capacity: 450,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  }
```
### To run all the seed files inside the seeders folder:

Step 3: Inside the terminal, inside the `/src` folder write the following command to bulk insert the data into the database table:

```
$ npx sequelize db:seed:all
```

### To run a specific seed file inside the seeders folder:

Step 3: Inside the terminal, inside the `/src` folder write the following command to bulk insert the data into the database table:

```
$ npx sequelize db:seed --seed <seed-file-name.js>
```
Eg.

```
$ npx sequelize db:seed --seed 20230511060559-add-airplanes.js
```

# Delete/Undo the seeds using Sequelize

## Delete particular seeds/entries from the DB table

Step 1: Inside the file `20230511060559-add-airplanes`, inside the async down() function we can delete particular entries/seeds using the bulkDelete() function.

```js
 async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Airplanes", {
      [Op.or]: [{ modelNumber: "airbus340" }, { modelNumber: "boeing777" }],
    });
  }
```
Step 2: Inside the terminal, inside the `/src` folder write the following command:

```
$ npx sequelize db:seed:undo:all
```

## Delete all the seeds/entries from the DB table

Step 1: Inside the file `20230511060559-add-airplanes`, inside the async down() function we can delete all the entries/seeds using the bulkDelete() function.

```js
 async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Airplanes", {});
  }
```
Step 2: Inside the terminal, inside the `/src` folder write the following command:

```
$ npx sequelize db:seed:undo:all
```
</br>
</br>

## NOTE: If you modify the migration files already created for the existing DB-Table

- Undo the migration
- Redo the migration

Inside the terminal, inside the `/src` folder write the following command:

```
$ npx sequelize db:migrate:undo

$ npx sequelize db:migrate
```