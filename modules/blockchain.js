const sha256 = require("sha256");
const { v4: uuidv4 } = require("uuid");

function Blockchain() {
  this.chain = [];
  this.pendingList = [];
  this.nodeUrl = process.argv[3];
  this.networkNodes = [];

  this.createBlock(1, "Genisis", "Genisis");
}

Blockchain.prototype.createBlock = function (nonce, previousHash, hash) {
  const block = {
    index: this.chain.length + 1,
    timestamp: Date.now(),
    data: this.pendingList,
    nonce: nonce,
    hash: hash,
    previousHash: previousHash,
  };

  this.pendingList = [];
  this.chain.push(block);

  return block;
};

Blockchain.prototype.getLastBlock = function () {
  return this.chain.at(-1);
};

Blockchain.prototype.addMessage = function (log, sender, recipient) {
  const message = {
    log,
    sender,
    recipient,
    messageId: uuidv4().split("-").join(""),
  };

  return message;
};
Blockchain.prototype.addMessageToPendingList = function (message) {
  this.pendingList.push(message);
  return this.getLastBlock()["index"] + 1;
};

Blockchain.prototype.createHash = function (prevHash, data, nonce) {
  const stringToHash = prevHash + JSON.stringify(data) + nonce.toString();
  const hash = sha256(stringToHash);
  return hash;
};

Blockchain.prototype.proofOfWork = function (prevHash, data) {
  let nonce = 0;
  let hash = this.createHash(prevHash, data, nonce);

  while (hash.substring(0, 4) !== "0000") {
    nonce++;
    hash = this.createHash(prevHash, data, nonce);
  }

  return nonce;
};

Blockchain.prototype.isChainValid = function (chain) {
  let valid = true;
  for (let i = 1; i < chain.length; i++) {
    const currentBlock = chain[i];
    const prevBlock = chain[i - 1];
    const blockHash = this.createHash(
      prevBlock["hash"],
      currentBlock["data"],
      currentBlock["nonce"]
    );
    if (blockHash.substring(0, 4) !== "0000") valid = false;
    if (currentBlock["previousHash"] !== prevBlock["hash"]) valid = false;
  }
  const genesisBlock = chain[0];
  const correctNonce = genesisBlock["nonce"] === 1;
  const correctPreviousHash = genesisBlock["previousHash"] === "Genisis";
  const correctHash = genesisBlock["hash"] === "Genisis";
  const correctData = genesisBlock["data"].length === 0;

  if (!correctNonce || !correctPreviousHash || !correctHash || !correctData)
    valid = false;

  return valid;
};

module.exports = Blockchain;
