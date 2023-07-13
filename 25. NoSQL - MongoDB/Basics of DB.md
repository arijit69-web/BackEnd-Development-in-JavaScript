# Database

Store data in different ways. Similar to the traditional ways (files) DB is also a way to store data.

A database is an organized collection of structured information, or data, typically stored electronically in a computer system. A database is usually controlled by a database management system (DBMS). Together, the data and the DBMS, along with the applications that are associated with them, are referred to as a database system, often shortened to just database.

## Types of databases
There are many different types of databases. The best database for a specific organization depends on how the organization intends to use the data.

- Relational databases
Relational databases became dominant in the 1980s. Items in a relational database are organized as a set of tables with columns and rows. Relational database technology provides the most efficient and flexible way to access structured information.

- Object-oriented databases
Information in an object-oriented database is represented in the form of objects, as in object-oriented programming.

- Distributed databases
A distributed database consists of two or more files located in different sites. The database may be stored on multiple computers, located in the same physical location, or scattered over different networks.

- Data warehouses
A central repository for data, a data warehouse is a type of database specifically designed for fast query and analysis.

- NoSQL databases
A NoSQL, or nonrelational database, allows unstructured and semistructured data to be stored and manipulated (in contrast to a relational database, which defines how all data inserted into the database must be composed). NoSQL databases grew popular as web applications became more common and more complex.

- Graph databases
    - A graph database stores data in terms of entities and the relationships between entities.
    - OLTP databases. An OLTP database is a speedy, analytic database designed for large numbers of transactions performed by multiple users.

These are only a few of the several dozen types of databases in use today. Other, less common databases are tailored to very specific scientific, financial, or other functions. In addition to the different database types, changes in technology development approaches and dramatic advances such as the cloud and automation are propelling databases in entirely new directions. Some of the latest databases include

- Open source databases
An open source database system is one whose source code is open source; such databases could be SQL or NoSQL databases.

- Cloud databases
A cloud database is a collection of data, either structured or unstructured, that resides on a private, public, or hybrid cloud computing platform. There are two types of cloud database models: traditional and database as a service (DBaaS). With DBaaS, administrative tasks and maintenance are performed by a service provider.

- Multimodel database
Multimodel databases combine different types of database models into a single, integrated back end. This means they can accommodate various data types.

- Document/JSON database
Designed for storing, retrieving, and managing document-oriented information, document databases are a modern way to store data in JSON format rather than rows and columns.

- Self-driving databases
The newest and most groundbreaking type of database, self-driving databases (also known as autonomous databases) are cloud-based and use machine learning to automate database tuning, security, backups, updates, and other routine management tasks traditionally performed by database administrators.

## NoSQL Databases [Not Only SQL DB]

You can do all DB-related operations without SQL queries.
The NoSQL database stores data without creating tables. 
In NoSQL DBs, data can be stored in Graph-based DS, Key-Value pair structures, and Document-based structures. No interaction between tables is required over here.

## MongoDB

- case sensetive query
- MongoDB is a NoSQL document-based DB.
- MongoDB stores one instance or one record as a document and a group of documents belong to a collection/table. A collection has many documents.
- MongoDB is cross-platform.
- MongoDB is open source.
- When we download MongoDB, it executes a server behind the scene @ PORT 27017. By interacting with the server, we can give some instructions and expect some output.
- In MongoDB, a collection is a group of documents, and each document is a JSON-like structure called a BSON document. BSON is a binary representation of JSON documents, which allows for efficient storage and retrieval of data.
- MongoDB supports dynamic/flexible schemas for a collection. The dynamic schema in MongoDB means that documents within a collection can have different structures. Each document is self-contained and can have its own set of fields and field types. This flexibility allows you to store data that may have varying attributes or evolve over time without the need to predefine a strict schema for the entire collection. 

    Here's an example to illustrate this flexibility:

    Let's say you have a collection called "Products" where you store information about various products. Initially, you might have documents with fields like "name," "price," and "category." However, as your application evolves, you may introduce new products with additional attributes like "manufacturer," "description," or even nested objects like "reviews." In MongoDB, you can simply insert these new documents with their expanded structure without having to modify the existing documents or the collection schema. This flexibility allows for easy adaptation to changing business requirements and minimizes the need for costly database migrations.
- MongoDB is a distributed architecture.
- MongoDB is a highly scalable DB.
- MongoDB has high performance.

## JSON v/s BSON

- [LINK](https://www.mongodb.com/json-and-bson)

