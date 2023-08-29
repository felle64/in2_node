const express = require("express");
const router = express.Router();

const {
  addMessageToPendingList,
  broadcastMessage,
} = require("../controllers/message-controller");

router.route("/add").post(addMessageToPendingList);

router.route("/broadcast").post(broadcastMessage);

module.exports = router;
