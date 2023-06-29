const amqplib = require("amqplib"); // Package -> Inorder ot connect NodeJS with RabbitMQ
const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/app-error");
const ServerConfig = require("./server-config");
const { EmailService } = require("../services");

async function connectQueue() {
  try {
    const connection = await amqplib.connect(ServerConfig.PUBSUB_SERVICE);
    const channel = await connection.createChannel();
    await channel.assertQueue("Notification-Queue"); // It is a best practice to check if there is a queue of that name present inside the RabbitMQ Server or not, If it is present then it will set up a connection and if it is not it will create a queue of that name
    channel.consume("Notification-Queue", async (data) => {
      const object = JSON.parse(`${Buffer.from(data.content)}`); // convert type of data.content from string to JSON
      await EmailService.sendEmail(
        ServerConfig.GMAIL_EMAIL,
        object.recepientEmail,
        object.subject,
        object.text
      ); // Send an acknowledgment once the mail has been sent
      channel.ack(data); // TCP connection -> so need acknowledgment that this message has been send | .ack() function is used for positive acknowledgement
    });
  } catch (error) {
    throw new AppError(
      "Sorry! The Mail was not sent successfully. Subscriber Service is down",
      StatusCodes.BAD_GATEWAY
    );
  }
}
module.exports = {
  connectQueue,
};
