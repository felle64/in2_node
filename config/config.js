const Blockchain = require("../modules/blockchain");
const { v4: uuidv4 } = require("uuid");

const messageJournal = new Blockchain();
const nodeAddress = uuidv4().split("-").join("");

module.exports = { messageJournal, nodeAddress };
