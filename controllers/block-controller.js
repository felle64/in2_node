exports.addBlock = (req, res) => {
  const newBlock = req.body.block;
  const lastBlock = messageJournal.getLastBlock();
  const correctHash = lastBlock.hash === newBlock.prevHash;
  const correctIndex = lastBlock.index + 1 === newBlock.index;

  if (correctHash && correctIndex) {
    messageJournal.blockchain.push(newBlock);
    messageJournal.pendingList = [];
    res.status(201).json({
      success: true,
      data: newBlock,
    });
  } else {
    res.status(400).json({
      success: false,
      data: "Invalid block",
    });
  }
};
