# Object Relational Mapping (ORM) 

It is a technique used in creating a "bridge" between object-oriented programs and, in most cases, relational databases. ORM as the layer that connects object oriented programming (OOP) to relational databases. 
When interacting with a database using OOP languages, you'll have to perform different operations like creating, reading, updating, and deleting (CRUD) data from a database. By design, you use SQL for performing these operations in relational databases.

While using SQL for this purpose isn't necessarily a bad idea, the ORM and ORM tools help simplify the interaction between relational databases and different OOP languages.
eg. of ORM is Sequelize 

# Object Document Mapping (ODM)

ODM on the other hand is an Object Document Mapper, which maps objects with a Document Database like MongoDB. The main difference is that ORM is for MySQL databases, while ODM does the mapping for document representation of data. 
eg. of ODM is Mongoose


# Installing Sequelize [ORM]

```
$ npm install sequelize
$ npm i sequelize-cli
```

You'll also have to manually install the driver for your database of choice:

```
# One of the following:
$ npm install --save pg pg-hstore # Postgres
$ npm install --save mysql2
$ npm install --save mariadb
$ npm install --save sqlite3
$ npm install --save tedious # Microsoft SQL Server
$ npm install --save oracledb # Oracle Database
```

In order to initialize sequelize, we need to run the command `npx sequelize init` in the directory where we want to initialize the models, and in the directory where we want to write the code.
Go inside the `src` folder and execute the command `npx sequelize init`.
```
$ cd .\src\
$ npx sequelize init
```
>NPM is a package manager used to install, delete, and update Javascript packages on your machine. NPX is a package executer, and it is used to execute javascript packages directly, without installing them.

- It created a config.json file inside the config folder

- It created a model folder

- It created a migration folder

- It created a seeder folder

</br>

## config.json

The Config.json file gives us configurations for three environments:

- **Development**: This is where application/system development tasks, such as designing, programming, debugging, etc., take place.

- **Test**: As the name implies, this is where application testing is conducted to find and fix errors.

- **Production**: The last environment in software development, this is where new builds/updates are moved into production for end users. 

- `dialect` -> What database are we using? eg. 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle'

- `host` -> Get the URL of the server where u have actually hosted the MySQL server.

- `database` -> Set the Database name that u want to set.

**Include this config.json file inside your .gitignore file.**


