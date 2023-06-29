const { TicketRepository } = require("../repositories");
const { MAILER } = require("../config");

const ticketRepo = new TicketRepository();

async function sendEmail(mailFrom, mailTo, subject, text) {
  try {
    const response = await MAILER.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: subject,
      text: text,
    });
    return response;
  } catch (error) {
    throw new AppError(
      "Sorry! The mail was not sent successfully. Notification Service is down!",
      StatusCodes.INTERNAL_SERVER_ERROR
    ); // Or else send server-related status code
  }
}

async function createTicket(data) {
  try {
    const response = await ticketRepo.create(data);
    return response;
  } catch (error) {
    throw new AppError(
      "Sorry! Failed to create a ticket. Notification Service is down!",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}
async function getPendingEmails() {
  try {
    const response = await ticketRepo.getPendingTickets();
    return response;
  } catch (error) {
    throw new AppError(
      "Sorry! Failed to fetch the pending emails. Notification Service is down!",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  sendEmail,
  createTicket,
  getPendingEmails,
};
