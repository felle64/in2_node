const { messageJournal } = require("../config/config");

exports.getBlockchain = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      blockchain: messageJournal,
    },
  });
};

exports.mineBlock = (req, res) => {
  const lastBlock = messageJournal.getLastBlock();
  const prevHash = lastBlock["hash"];
  const currentData = {
    message: req.body.message,
    sender: req.body.sender,
    recipient: req.body.recipient,
  };
  const nonce = messageJournal.proofOfWork(prevHash, currentData);
  const hash = messageJournal.createHash(prevHash, currentData, nonce);
  const block = messageJournal.createBlock(nonce, prevHash, hash);

  res.status(200).json({
    status: "success",
    data: {
      block,
    },
  });
};
