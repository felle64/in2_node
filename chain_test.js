const Blockchain = require("./modules/blockchain");
const messageJournal = new Blockchain();

const testChain = {
  chain: [
    {
      index: 1,
      timestamp: 1693313379681,
      data: [],
      nonce: 1,
      hash: "Genisis",
      previousHash: "Genisis",
    },
    {
      index: 2,
      timestamp: 1693313410542,
      data: [],
      nonce: 6237,
      hash: "00008cdb5100e5be8576893b15cadadecb2ac6d4989789cb814d96364f6849b0",
      previousHash: "Genisis",
    },
    {
      index: 3,
      timestamp: 1693313413152,
      data: [],
      nonce: 54838,
      hash: "0000c01612e2f2747c6ee5470fb543bd882c474d25e9006bddafc5e3faeecc35",
      previousHash:
        "00008cdb5100e5be8576893b15cadadecb2ac6d4989789cb814d96364f6849b0",
    },
    {
      index: 4,
      timestamp: 1693313622228,
      data: [],
      nonce: 263363,
      hash: "000041df369d4b6e2c100304fd94e25c9e7f7475fdfeff8303f68fa608879b46",
      previousHash:
        "0000c01612e2f2747c6ee5470fb543bd882c474d25e9006bddafc5e3faeecc35",
    },
  ],
  pendingList: [],
  networkNodes: [],
};

console.log("Är korrekt: ", messageJournal.isChainValid(testChain.chain));
console.log("Är korrekt: ", messageJournal.isChainValid(messageJournal.chain));
