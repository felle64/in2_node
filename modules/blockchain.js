const sha256 = require("sha256");
const { v4: uuidv4 } = require("uuid");

function Blockchain() {
  this.chain = [];
  this.pendingList = [];
  this.nodeUrl = process.argv[3];
  this.networkNodes = [];

  this.createBlock(1, "Genesis", "Genesis");
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

Blockchain.prototype.addMessage = function (message, sender, recipient) {
  const data = {
    message,
    sender,
    recipient,
    messageId: uuidv4().split("-").join(""),
  };

  return data;
};
Blockchain.prototype.addMessageToPendingList = function (data) {
  this.pendingList.push(data);
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
    if (blockHash !== currentBlock["hash"]) {
      valid = false;
      console.log("Hash is not correct");
    }
    if (currentBlock["previousHash"] !== prevBlock["hash"]) {
      valid = false;
      console.log("Previous hash is not correct");
    }
  }
  const genesisBlock = chain[0];
  const correctNonce = genesisBlock["nonce"] === 1;
  const correctPreviousHash = genesisBlock["previousHash"] === "Genesis";
  const correctHash = genesisBlock["hash"] === "Genesis";
  const correctData = genesisBlock["data"].length === 0;

  if (!correctNonce || !correctPreviousHash || !correctHash || !correctData) {
    console.log("Genesis block is not correct");
    valid = false;
  }
  return valid;
};

module.exports = Blockchain;
