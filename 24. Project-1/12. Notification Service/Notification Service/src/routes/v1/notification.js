const express = require("express");

const { EmailController} = require("../../controllers");

const router = express.Router();

router.post("/createTicket", EmailController.createTicket);

module.exports = router;
