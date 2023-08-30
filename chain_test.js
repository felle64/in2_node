const Blockchain = require("./modules/blockchain");
const messageJournal = new Blockchain();

const testChain = {
  chain: [
    {
      index: 1,
      timestamp: 1693426340643,
      data: [],
      nonce: 1,
      hash: "Genesis",
      previousHash: "Genesis",
    },
  ],
  pendingList: [],
  networkNodes: [],
};

console.log("Är korrekt: ", messageJournal.isChainValid(testChain.chain));
