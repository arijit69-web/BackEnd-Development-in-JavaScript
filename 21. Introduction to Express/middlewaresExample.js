const express = require("express");

const PORT = 3000;

const app = express(); // Create an Express Server object

// Middleware 1
const myLogger = (req, res, next) => {
  console.log("Logging from Middleware 1");
  return res.json({ msg: "Done from Middleware 1" }); // -> prints only `Logging from Middleware 1` in the console and displays `{"msg": "Done from Middleware 1"}` in the browser. Because it returns JSON from the response, it does not forward your request to the next middleware because the next() was never called. It is important to set the 'return' keyword otherwise it throws an Error: `Can't set headers after they are sent to the client`.
  next(); // calls the next middleware. If u don't call the next() the request will not be forwarded from one middleware to another middleware.
};

// Middleware 2
const extLogger = (req, res, next) => {
  console.log("Logging from Middleware 2");
  next(); // calls the next middleware.
};

// Middleware 3 / Controller
/*
Usecases of Controller:
- forwarding reqs to the backend logic(models).
- it prepares the response object. It forms how ur response should look like in case of success and failure.
*/
app.get("/home", myLogger, extLogger, (request, response) => {
  // This is the last middleware and it also acts as a controller because the last middleware is the one that finally sends requests to the backend and it does not call any other middleware.  Whatever response it got from the backend, it simply sends it to the client as a response.
  // If no modifications are made to the request/response objects, e.g. in myLogger and extLogger middleware, the same request object and response object are passed.
  console.log("Last Middleware: Middleware 3");
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
