const { blockchainJournal } = require("../config/config");

exports.getBlockchain = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      blockchain: blockchainJournal,
    },
  });
};
