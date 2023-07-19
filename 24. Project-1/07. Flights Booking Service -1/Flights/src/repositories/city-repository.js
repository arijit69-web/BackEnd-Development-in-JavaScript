const CrudRepository = require("./crud-repository");
const { City } = require("../models");
class CityRepository extends CrudRepository {
  constructor() {
    super(City); // calling the constructor of the parent class
  }
}

module.exports = CityRepository;
