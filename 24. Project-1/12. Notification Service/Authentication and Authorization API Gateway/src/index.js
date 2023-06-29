const { ServerConfig, Logger } = require("./config"); // If u are requiring from index.js file u don't need to specifically mention the file name i.e. index.js, it will automatically pick the index.js file
const { AboutController, HomeController } = require("./controllers");
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const rateLimit = require("express-rate-limit");
const apiRoutes = require("./routes");
const { AuthRequestMiddlewares } = require("./middlewares");

const app = express();
/*
By default ExpressJS doesnot know how to read the req.body.
U need to mention ExpressJS that in the incoming request,
if there is a `req.body` please read it like a JSON
*/
// Setting up Rate Limiting
const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes - Window
  max: 30, // Limit each IP to 30 requests per `window` (here, per 2 minutes)
});
// Setting up Reverse Proxy

app.use(
  "/flightsService", // if the user gives us a request to /flightsService
  [AuthRequestMiddlewares.checkAuth, AuthRequestMiddlewares.isAdmin],
  createProxyMiddleware({
    target: ServerConfig.FLIGHT_SERVICE, //  We will redirect the request to the Flight Service' IP address -> `http://localhost:3000`
    changeOrigin: true,
  })
);

app.use(
  "/bookingService",
  [AuthRequestMiddlewares.checkAuth],
  createProxyMiddleware({
    target: ServerConfig.BOOKING_SERVICE,
    changeOrigin: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limiter);

/*
a. express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object. This method is called as a middleware in your application using the code: app.use(express.json());

b. express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays. This method is called as a middleware in your application using the code: app.use(express.urlencoded());
*/

/*
app.use() is going to register a middleware for all the 
upcoming routes that are mentioned below it.

*/

app.use("/api", apiRoutes); // import apiRoutes from the ./routes folder & whenever somebody gives me an URL that starts with /api I will redirect all the requests to the apiRoutes. | |  Link : http://localhost:3000/api

app.listen(ServerConfig.PORT, () => {
  console.log(`Server is up and running on PORT: ${ServerConfig.PORT}`);
  // Logger.info("Successfully started the Server!", "root");
});

/* 
- Express Routers are a way to organize your Express 
application such that your primary app.js file does not 
become bloated and difficult to reason about. As you’re 
building an Express application or API, you’ll soon notice 
that the routes continue to pile up in app.js. This makes 
the file quite long and hard to read. As we add 
functionality to an application, this file would get long 
and cumbersome. The solution to this in Express is Routers. 
Routers are like mini versions of Express applications. 
They provide functionality for handling route matching, 
requests, and sending responses, but they do not start a 
separate server or listen on their own ports. Routers use 
all the .get(), .put(), .post(), and .delete() routes that 
you are now familiar with.

- app.use() -> The app.use() function is used to mount the specified middleware function(s) at the path which is being specified. It is mostly used to set up middleware for your application. 
We know how to use middlewares inside the app.get() / app.post(), but instead of adding the middlewares over there we will register/add the middlewares inside the app.use().
*/

// `npm run dev` -> To start & run the Server.
