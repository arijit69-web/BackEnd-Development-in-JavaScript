/*
RabbitMQ is a messaging broker - an intermediary for messaging. It gives your applications a common platform to send and receive messages, and your messages a safe place to live until received.
Email/Notification Service is down -> We are in maintenance but people are still booking. Despite our email service being down once it is up we have to send all those pending queued mails. 
*/
const amqplib = require("amqplib"); // Package -> Inorder ot connect NodeJS with RabbitMQ
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const ServerConfig = require("./server-config");
let channel, connection;
/*
1. A connection (TCP) is a link between the client and the broker, that performs underlying networking tasks including initial authentication, IP resolution, and networking.
2. Connections can multiplex over a single TCP connection, meaning that an application can open "lightweight connections" on a single connection. This "lightweight connection" is called a channel. Each connection can maintain a set of underlying channels.
Many applications needs to have multiple connections to the broker, and instead of having many connections an application can reuse the connection, by instead, create and delete channels. Keeping many TCP connections open at the same time is not desired, as they consume system resources. The handshake process for a connection is also quite complex and requires at least 7 TCP packets or more if TLS is used.
A channel acts as a virtual connection inside a TCP connection. A channel reuses a connection, forgoing the need to reauthorize and open a new TCP stream. Channels allow you to use resources more efficiently (more about this later in this article).
Every AMQP protocol-related operation occurs over a channel.
*/
async function connectQueue() {
  try {
    connection = await amqplib.connect(ServerConfig.PUBSUB_SERVICE); // Create a new connection to the rabbitMQ Server
    channel = await connection.createChannel(); // Create a new channel (Lightweight Connection) inside a single TCP connection

    await channel.assertQueue("Notification-Queue"); //  assertQueue is a function that takes a queue name. It will first check if there is a queue of that name present inside the RabbitMQ Server or not, If it is present then it will set up a connection and if it is not it will create a queue of that name and set up the connection
  } catch (error) {
    console.log(error);
    throw new AppError(
      "An error occurred while connecting to the PubSub Service",
      StatusCodes.BAD_GATEWAY
    );
  }
}

async function sendData(data) {
  // data will be an object so stringify the object
  try {
    await channel.sendToQueue(
      "Notification-Queue",
      Buffer.from(JSON.stringify(data)) // Whenever u send a message u have to send it in the form of Buffer so u have to create a Buffer Object
    );
  } catch (error) {
    throw new AppError(
      "Sorry! The Mail was not sent successfully. Publisher Service is down",
      StatusCodes.BAD_GATEWAY
    );
  }
}

module.exports = {
  connectQueue,
  sendData,
};

// Link for RabbitMQ & AMQP -> https://medium.com/swlh/a-quick-guide-to-understanding-rabbitmq-amqp-ba25fdfe421d
