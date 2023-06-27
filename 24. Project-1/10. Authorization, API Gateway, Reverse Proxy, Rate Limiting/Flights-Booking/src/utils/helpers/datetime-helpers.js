function compareTime(timeString1, timeString2) {
  // creating the JS Date object by inserting the timeString as a parameter
  let dateTime1 = new Date(timeString1);
  let dateTime2 = new Date(timeString2);
  return dateTime1.getTime() > dateTime2.getTime(); // getTime() returns the number of milliseconds since January 1, 1970 00:00:00.

}

/*
Epoch times are measured in milliseconds. The Unix epoch (or Unix time or POSIX time or Unix timestamp) is the number of seconds that have elapsed since January 1, 1970 (midnight UTC/GMT), not counting leap seconds (in ISO 8601: 1970-01-01T00:00:00Z). 
*/

module.exports = {
  compareTime,
};
