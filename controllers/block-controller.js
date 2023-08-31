const { messageJournal } = require("../config/config");

exports.addBlock = (req, res) => {
  const newBlock = req.body.block;
  const lastBlock = messageJournal.getLastBlock();
  const correctHash = lastBlock.hash === newBlock.previousHash;
  const correctIndex = lastBlock.index + 1 === newBlock.index;

  if (correctHash && correctIndex) {
    console.log(newBlock);
    messageJournal.chain.push(newBlock);

    messageJournal.pendingList = [];
    res.status(201).json({
      success: true,
      data: newBlock,
    });
  } else {
    console.log(correctHash, correctIndex);
    res.status(400).json({
      success: false,
      data: "Invalid block",
    });
  }
};
