const express = require("express");
const v1Routes = require("./v1"); // inside ./v1 folder we are going to write the version-1 APIs, similarly we can make a ./v2 folder and write the version-2 APIs
const router = express.Router();
router.use("/v1", v1Routes); // if u got /v1 after /api then u are going to redirect them to v1Routes. |  Link : http://localhost:3000/api/v1

module.exports = router;
