const { ServerConfig, Logger } = require("./config"); // If u are requiring from index.js file u don't need to specifically mention the file name i.e. index.js, it will automatically pick the index.js file
const { AboutController, HomeController } = require("./controllers");
const express = require("express");
const apiRoutes = require("./routes");
const Queue = require("./config/queue-config");
const nodemailer = require("nodemailer");
const app = express();
const mailsender = require("./config/email-config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRoutes); // import apiRoutes from the ./routes folder & whenever somebody gives me an URL that starts with /api I will redirect all the requests to the apiRoutes. | |  Link : http://localhost:3000/api
app.listen(ServerConfig.PORT, async () => {
  console.log(`Server is up and running on PORT: ${ServerConfig.PORT}`);
  //Logger.info("Successfully started the Server!", "root");
  await Queue.connectQueue(); //Subscribing/Consuming the message
  console.log(
    "The queue is connected successfully and Subscribing/Consuming the message!"
  ); // If the Queue is connected above print the msg
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
