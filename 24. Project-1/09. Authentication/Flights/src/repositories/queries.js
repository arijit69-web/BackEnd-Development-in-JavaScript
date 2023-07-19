function addRowLockOnFlights(flightId) {
  return `SELECT * FROM Flights WHERE Flights.id = ${flightId} FOR UPDATE;`;
}

module.exports = {
  addRowLockOnFlights,
};
