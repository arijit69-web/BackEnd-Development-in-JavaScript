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

/*
We have removed the try-catch block from here because now we will handle logical errors inside the airplane-service file.
*/
const { StatusCodes } = require("http-status-codes");
const { Logger } = require("../config");
const AppError = require("../utils/errors/app-error");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const response = await this.model.create(data);
    return response;
  }

  async destroy(data) {
    const response = await this.model.destroy({
      where: {
        id: data,
      },
    });
    // We will throw an error if we are unable to find a response
    if (!response) {
      throw new AppError(
        "The data for the given ID could not be found",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
  }

  async get(data) {
    const response = await this.model.findByPk(data);
    // We will throw an error if we are unable to find a response
    if (!response) {
      throw new AppError(
        "The data for the given ID could not be found",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
  }

  async getAll() {
    const response = await this.model.findAll();
    return response;
  }

  async update(id, data) {
    const tableAttributes = Object.keys(this.model.rawAttributes);
    const reqAttributes = Object.keys(data);
    const hasAllAttributes = reqAttributes.every((elem) =>
      tableAttributes.includes(elem)
    );
    if (hasAllAttributes) {
      const response = await this.model.update(data, {
        where: {
          id: id,
        },
      });

      if (response[0] == 0) {
        throw new AppError(
          "The data for the given ID could not be found",
          StatusCodes.NOT_FOUND
        );
      }
      return response;
    } else {
      throw new AppError(
        "The column for the given ID could not be found",
        StatusCodes.NOT_FOUND
      );
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
