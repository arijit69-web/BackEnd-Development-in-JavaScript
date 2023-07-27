const express = require("express");
const { Tweet } = require("./models");

const app = express();

const { ServerConfig, DatabaseConfig } = require("./config");
app.listen(ServerConfig.PORT, async () => {
  console.log(`Server is up and running on PORT: ${ServerConfig.PORT}`);

  await DatabaseConfig.connect();
  console.log(`MongoDB Connected!`);
});

//1:12:00