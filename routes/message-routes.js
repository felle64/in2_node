const express = require("express");
const router = express.Router();

const {
  message,
  broadcastMessage,
} = require("../controllers/message-controller");

router.route("/add").post(message);

router.route("/broadcast").post(broadcastMessage);

module.exports = router;
