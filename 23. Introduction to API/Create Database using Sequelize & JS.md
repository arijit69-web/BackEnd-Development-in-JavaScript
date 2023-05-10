# Create Database using Sequelize & JS

Step 1: Inside the config/config.json file write the following code:

```json
{
  "development": {
    "username": "root",
    "password": "Arijit@2000",
    "database": "Flights",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port":3307 //*IMPORTANT* : If your SQL is running on any other port number other than 3306, you have to explicitly mention the port number.

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

Step 2: Inside the terminal, inside the `\src` folder write the following command:

```
$ npx sequelize db:create
```
It loaded the config/config.json file and used the `Development`  environment by default and it created a database `Flights`. It gets the database name from the database key inside the config/config.json.

# Create Model using Sequelize

>Every table is considered a model. So to create a table, you have to create a model.

Step 1: Inside the terminal, inside the `\src` folder write the following command:

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

Step 2: Inside the terminal, inside the `\src` folder write the following command:

```
npx sequelize db:migrate
```

It migrates or creates all the pending migrations (updates made inside the table) and actually creates a table/model inside the actual Database. **Now it originally creates a table inside the Database.**

> `airplane.js` file contains the JS level code and `230508150837-create-airplane.js` file contains the Database level code.

# Undo the migration

## Undo the last migration

Step 1: Inside the terminal, inside the `\src` folder write the following command:
```
npx sequelize db:migrate:undo
```

## Undo all the migrations

Step 1: Inside the terminal, inside the `\src` folder write the following command:
```
npx sequelize db:migrate:undo:all
```

> This is how u can create versions of your Database Schema. When u are `Adding a Migration`, `async up()` function present inside the `230508150837-create-airplane.js` file is going to be applied and when you are `Undoing a migration`, `async down()` function present inside the `230508150837-create-airplane.js` file is going to be applied. In `Undo Migration` u are going to lose all the data as it is going to `Drop the Table`.

Programmatically u will be interacting with models in JS but when u query a model internally it will query that table inside the database.

</br>

# Data Types of Sequelize:

- [Data Types](https://sequelize.org/docs/v7/other-topics/other-data-types/)

</br>

>Note: Everything in the Database level can be done without migration also, Sequelize supports establishing everything without migration known as `Model Synchronization`.

</br>

# Model synchronization

When you define a model, you're telling Sequelize a few things about its table in the database. However, what if the table actually doesn't even exist in the database? What if it exists, but it has different columns, less columns, or any other difference?

This is where model synchronization comes in. A model can be synchronized with the database by calling model.sync(options), an asynchronous function (that returns a Promise). With this call, Sequelize will automatically perform an SQL query to the database. Note that this changes only the table in the database, not the model in the JavaScript side. It does not maintain any version of your database schema.

