const { messageJournal } = require("../config/config");
const axios = require("axios");

exports.synchronize = async (req, res) => {
  const chainLengthNow = messageJournal.chain.length;
  let maxChainLength = chainLengthNow;
  let longestChain = null;
  let pendingList = null;

  for (let i = 0; i < messageJournal.networkNodes.length; i++) {
    const node = messageJournal.networkNodes[i];
    console.log("node", node);

    try {
      const response = await axios.get(`${node}/api/v1/bc`);
      console.log(chainLengthNow);
      if (response.data.data.blockchain.chain.length > maxChainLength) {
        maxChainLength = response.data.data.blockchain.chain.length;
        longestChain = response.data.data.blockchain.chain;
        pendingList = response.data.data.blockchain.pendingList;
      }

      if (
        !longestChain ||
        (longestChain && !messageJournal.isChainValid(longestChain))
      ) {
        res.status(200).json({
          success: true,
          data: {
            message: "Chain has not been replaced",
          },
        });
      } else {
        messageJournal.chain = longestChain;
        messageJournal.pendingList = pendingList;
        res.status(200).json({
          success: true,
          data: {
            message: "Chain has been replaced",
            chain: messageJournal.chain,
            pendingList: messageJournal.pendingList,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
};
