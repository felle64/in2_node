const Blockchain = require("./modules/blockchain");
const messageJournal = new Blockchain();

const testChain = {
  chain: [
    {
      index: 1,
      timestamp: 1693464559471,
      data: [],
      nonce: 1,
      hash: "Genesis",
      previousHash: "Genesis",
    },
    {
      index: 2,
      timestamp: 1693464888840,
      data: [
        {
          message: "Hello World",
          sender: "Felix",
          recipient: "Linus",
          messageId: "6576df3b071e4add942d0b682625ba75",
        },
      ],
      nonce: 10732,
      hash: "0000dfea70d98dc48f3221182b61661aaca007786d79dc714d4a174a431b27e1",
      previousHash: "Genesis",
    },
    {
      index: 3,
      timestamp: 1693464892824,
      data: [
        {
          message: "Hello World",
          sender: "Felix",
          recipient: "Linus",
          messageId: "4f6a9c8c0d234e81ae19926a2c3c985c",
        },
        {
          message: "Hello World",
          sender: "Felix",
          recipient: "Linus",
          messageId: "719d36ac2e9c4120b74eab64f3b21cd3",
        },
      ],
      nonce: 35472,
      hash: "0000ecb38dc3d2a6e630625ecc8cbd576495b0fbc6c9c6af22f974b06cca12b2",
      previousHash:
        "0000dfea70d98dc48f3221182b61661aaca007786d79dc714d4a174a431b27e1",
    },
    {
      index: 4,
      timestamp: 1693464899253,
      data: [
        {
          message: "Hello World",
          sender: "Felix",
          recipient: "Linus",
          messageId: "8035069c8e164f19b7d9700be6631be8",
        },
        {
          message: "Hello World",
          sender: "Felix",
          recipient: "Linus",
          messageId: "d51f7238c18a430cba98d7f289d9bb48",
        },
        {
          message: "Hello World",
          sender: "Felix",
          recipient: "Linus",
          messageId: "b930cb85d56a42b9a79e713ff2b2b196",
        },
      ],
      nonce: 10948,
      hash: "0000b755b1639a63a6cf25a8b58f60fbd45408f88d12dc221503bf3ac17f1c4e",
      previousHash:
        "0000ecb38dc3d2a6e630625ecc8cbd576495b0fbc6c9c6af22f974b06cca12b2",
    },
  ],
  pendingList: [],
  nodeUrl: "http://localhost:3001",
  networkNodes: ["http://localhost:3002"],
};

console.log("Är korrekt: ", messageJournal.isChainValid(testChain.chain));
