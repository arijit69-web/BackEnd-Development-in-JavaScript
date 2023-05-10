/*
- Controllers don't directly talk to models.
- Services have business logic, so they don't directly talk to models.
- Repository talks to models.
*/
/*
Follow this Documentation : 

- https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
- https://sequelize.org/docs/v6/core-concepts/model-querying-finders/
*/

const { Logger } = require("../config");
class CrudRepository {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    try {
      const response = await this.model.create(data); // insert data query
      return response;
    } catch (error) {
      Logger.error("Something went wrong in the CRUD Repo : create() function");
      throw error; // catch the error in the service layer and manipulate this error more logically and create more custom error objects.
    }
  }
  async destroy(data) {
    try {
      const response = await this.model.destroy({
        where: {
          id: data,
        },
      }); // delete data query based on id.
      return response;
    } catch (error) {
      Logger.error(
        "Something went wrong in the CRUD Repo : destroy() function"
      );
      throw error; // catch the error in the service layer and manipulate this error more logically and create more custom error objects.
    }
  }
  async get(data) {
    try {
      const response = await this.model.findByPk(data); // find data query based on Primary Key
      return response;
    } catch (error) {
      Logger.error("Something went wrong in the CRUD Repo : get() function");
      throw error; // catch the error in the service layer and manipulate this error more logically and create more custom error objects.
    }
  }
  async getAll() {
    try {
      const response = await this.model.findAll(); // find all the data query
      return response;
    } catch (error) {
      Logger.error("Something went wrong in the CRUD Repo : getAll() function");
      throw error; // catch the error in the service layer and manipulate this error more logically and create more custom error objects.
    }
  }
  async update(id, data) {
    // data -> {col: value, ....}, data should be an object over here.
    try {
      const response = await this.model.update(data, {
        // update data query based on id
        where: {
          id: id,
        },
      });
      return response;
    } catch (error) {
      Logger.error("Something went wrong in the CRUD Repo : update() function");
      throw error; // catch the error in the service layer and manipulate this error more logically and create more custom error objects.
    }
  }
}
module.exports = CrudRepository;


/* 
Extremely complex queries are not possible in Sequelize.
The better way is to write a raw query in Sequelize.

Follow this Documentation to write raw query in Sequelize:
- https://sequelize.org/docs/v6/core-concepts/raw-queries/

*/
