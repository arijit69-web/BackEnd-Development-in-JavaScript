const express = require("express");
const app = express(); // After importing the express module, the code creates an instance of the Express application by calling the express() function
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

console.log(__dirname + "/public/index.html");
app.use("/", express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

/*
When u render ur index.html file u create a new web-socket connection from your client
to the server, if the connection is established, the server receives an event named as `connection`
*/
io.on("connection", (socket) => {
  // socket.io is an event driven architecture | Client connects -> Event, Client disconnects -> Event
  console.log("User Connected: ", socket.id); // When a web-socket with event named as `connection` comes up this is what we will going to do
  socket.on("disconnect", () => {
    // Once the connection is set up, it will wait and listen to the `disconnect` event on that particular connection only using the `socket` object
    console.log("User Disconnected: ", socket.id); // When a web-socket with event named as `disconnect` comes up this is what we will going to do
  });
  socket.on("FromClient", () => {
    console.log("Received Event From Client");
  });

  setInterval(function f() {
    socket.emit("FromServer");
  }, 3000);
});

server.listen(3000, () => {
  console.log("Server is Live @ PORT: 3000");
});

/*
When you refresh a page in a web application that uses Socket.IO for real-time communication, you might get a new socket ID. This behavior is a result of the way Socket.IO handles client connections and how the WebSocket protocol works.

Here's why you may get a new socket ID when you refresh the page:

1. Client Disconnect and Reconnect: When you refresh the page, the WebSocket connection between the client (browser) and the server is closed, and the client is disconnected. When the page is reloaded, a new WebSocket connection is established as the client reconnects to the server.

2. Server-Side Socket Handling: Socket.IO assigns a unique socket ID to each connected client to identify and manage individual connections. When the client disconnects (by refreshing the page), the server releases the previous socket associated with that client.

3. Socket Reconnection Mechanism: Socket.IO includes a built-in reconnection mechanism. After the client disconnects (e.g., due to a page refresh), it attempts to automatically reconnect to the server. This new reconnection process results in the assignment of a new socket ID, as it represents a new connection attempt.

Socket.IO provides an easy way to handle these disconnections and reconnections gracefully on both the client and server side. You can use the disconnect and connect events on the client side, and the corresponding events on the server side to handle the disconnection and reconnection logic.

Even though the socket ID changes, the underlying socket connection can still maintain any established session or user data through other mechanisms, such as authentication, cookies, or session management. This allows you to maintain the user's identity and context across reconnections despite the changing socket ID.

*/

/*

In Socket.IO, socket.emit() and socket.on() are two important methods used for real-time bidirectional communication between the server and the client in JavaScript. These methods are used to send and receive events and data between the server and the connected clients (web browsers in most cases). Let's take a closer look at each of them:

1. socket.emit(eventName, data):The socket.emit() method is used on the client-side to send custom events to the server. It allows the client to emit (send) a specific event to the server, along with optional data to be transmitted.
The `eventName` parameter is a string that specifies the name of the event you want to emit. For example, you could have an event named "message", "userJoined", "notification", etc.
The `data` parameter is an optional argument that contains the data you want to send along with the event. This can be any valid JavaScript object or data.

2. socket.on(eventName, callback): The socket.on() method is used on both the server-side and the client-side to listen for incoming events from the other end (client or server, depending on where it is used).
It allows you to define a callback function that will be executed when a specific event (specified by eventName) is received.
The `eventName` parameter is a string that indicates which event to listen for.
The `callback` parameter is a function that will be called when the specified event is received. The data sent from the other end (client or server) will be passed as an argument to this callback function.

*/
