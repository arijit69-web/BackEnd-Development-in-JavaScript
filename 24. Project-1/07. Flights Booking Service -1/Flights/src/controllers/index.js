module.exports = {
  InfoController: require("./info-controller"),
  AirplaneController: require("./airplane-controller"),
  CityController: require("./city-controller"),
  AirportController: require("./airport-controller"),
  FlightController: require('./flight-controller')
};
/*
This index.js file exports all the files of this current folder controllers. As a result, we will not have to write too many require() functions when importing all the files from this folder.
*/
