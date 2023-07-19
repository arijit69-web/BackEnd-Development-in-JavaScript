module.exports = {
  ErrorResponse: require("./error-response"),
  SuccessResponse: require("./success-response"),
  Enums: require("./enums"),
  /*
  CRONS: require("./cron-jobs"),
  This will give u an ERROR - Accessing non-existent property 'BookingService' 
  of module exports inside circular dependency.
  Eg. - There are two files - FileA.js, FileB.js
  Where FileA.js has:
  `const FileB = require("FileB");`

  and FileB.js has:
  `const FileA = require("FileA");`
  */
};
