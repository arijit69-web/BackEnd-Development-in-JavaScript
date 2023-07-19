const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;

const customFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} : [${label}] : ${level} : ${message}`;
});

const logger = createLogger({
  format: combine(
    label({ label: "Checking Logger!" }),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    customFormat
  ),
  transports: [
    new transports.Console(), //It will print all the logs on the console
    new transports.File({ filename: "AllLogs.log" }), // It will store all the logs in a file named `AllLogs.log`
  ],
});

module.exports = logger;
