const axios = require("axios");
const { messageJournal } = require("../config/config");

exports.brodcastNode = async (req, res) => {
  const urlToAdd = req.body.nodeUrl;

  if (messageJournal.networkNodes.indexOf(urlToAdd) === -1) {
    messageJournal.networkNodes.push(urlToAdd);
  }

  for (const url of messageJournal.networkNodes) {
    const body = { nodeUrl: urlToAdd };

    try {
      await axios.post(`${url}/api/v1/node/register`, body, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.log(err);
    }

    const bulkBody = {
      nodes: [...messageJournal.networkNodes, messageJournal.nodeUrl],
    };

    await axios.post(`${urlToAdd}/api/v1/node/register-bulk`, bulkBody, {
      headers: { "Content-Type": "application/json" },
    });
  }
  res
    .status(201)
    .json({ success: true, data: `Connected to node ${urlToAdd}` });
};

exports.registerNode = (req, res) => {
  const newNodeUrl = req.body.nodeUrl;
  const nodeNotAlreadyPresent =
    messageJournal.networkNodes.indexOf(newNodeUrl) === -1;
  const notCurrentNode = messageJournal.nodeUrl !== newNodeUrl;
  if (nodeNotAlreadyPresent && notCurrentNode) {
    messageJournal.networkNodes.push(newNodeUrl);
    res.status(201).json({
      success: true,
      data: {
        message: "Node added",
      },
    });
  } else {
    res.status(400).json({
      success: false,
      data: {
        message: "Node not added",
      },
    });
  }
};

exports.registerNodesBulk = (req, res) => {
  const bulkNodes = req.body.nodes;
  bulkNodes.forEach((node) => {
    const nodeNotAlreadyPresent =
      messageJournal.networkNodes.indexOf(node) === -1;
    const notCurrentNode = messageJournal.nodeUrl !== node;
    if (nodeNotAlreadyPresent && notCurrentNode) {
      messageJournal.networkNodes.push(node);
    }
  });
  res.status(201).json({
    success: true,
    data: {
      message: "Bulk registration successful",
    },
  });
};
