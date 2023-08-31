const { messageJournal, nodeAddress } = require("../config/config");
const axios = require("axios");

exports.getBlockchain = (req, res) => {
  res.status(201).json({
    success: true,
    data: {
      blockchain: messageJournal,
    },
  });
};

exports.mineBlock = async (req, res) => {
  const lastBlock = messageJournal.getLastBlock();
  const prevHash = lastBlock["hash"];
  const currentData = {
    data: messageJournal.pendingList,
    index: lastBlock["index"] + 1,
  };
  const nonce = messageJournal.proofOfWork(prevHash, currentData);
  const hash = messageJournal.createHash(prevHash, currentData, nonce);
  const block = messageJournal.createBlock(nonce, prevHash, hash);

  for (let i = 0; i < messageJournal.networkNodes.length; i++) {
    const networkNodeUrl = messageJournal.networkNodes[i];
    try {
      await axios.post(`${networkNodeUrl}/api/v1/block/add`, { block: block });
    } catch {
      (err) => console.log(err);
    }
  }

  res.status(200).json({
    success: true,
    data: block,
  });
};
