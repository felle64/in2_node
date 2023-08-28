const sha256 = require("sha256");
const { v4: uuidv4 } = require("uuid");

// Class...
// Constructor function...
function Blockchain() {
  this.chain = [];
  this.pendingList = [];
  this.nodeUrl = process.argv[3];
  this.networkNodes = [];

  // Skapa genesis blocket...
  this.createBlock(1, "Genisis", "Genisis");
}

// Skapa ett block
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

// Hämta senaste blocket...
Blockchain.prototype.getLastBlock = function () {
  return this.chain.at(-1);
};

// Funktion för att lägga till data i pendingList...
Blockchain.prototype.addTransaction = function (amount, sender, recipient) {
  const transaction = {
    amount,
    sender,
    recipient,
    transactionId: uuidv4().split("-").join(""),
  };

  return transaction;
};
Blockchain.prototype.addTransactionToPendingList = function (transaction) {
  this.pendingList.push(transaction);
  return this.getLastBlock()["index"] + 1;
};

// Skapa ett hash värde...
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
