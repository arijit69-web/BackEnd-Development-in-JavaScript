const express = require("express");

const PORT = 3000;

const app = express(); // Create an Express Server object

app.get("/home", (request, response) => {
  response.send("Hi Arijit!");
  /*  response.json({
         message: "OK get"
     })
  */
});

app.post("/home", (request, response) => {
  response.json({
    message: "OK",
  });
});

app.listen(PORT, () => {
  console.log(`Server is up and running on PORT: ${PORT}`);
});
