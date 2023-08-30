const axios = require("axios");
const { messageJournal } = require("../config/config");

exports.brodcastNode = async (req, res) => {
  const urlToAdd = req.body.nodeUrl;

  if (messageJournal.networkNodes.indexOf(urlToAdd) === -1) {
    messageJournal.networkNodes.push(urlToAdd);
  }

  messageJournal.networkNodes.forEach(async (url) => {
    const body = { nodeUrl: urlToAdd };

    await fetch(`${url}/api/v1/node/register`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
  });

  const body = {
    nodes: [...messageJournal.networkNodes, messageJournal.nodeUrl],
  };

  await fetch(`${urlToAdd}/api/v1/node/register`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  res.status(201).json({ success: true, data: "Ny nod tillagd" });
};

exports.registerNode = (req, res) => {
  const newNodeUrl = req.body.nodeUrl;
  const nodeNotAlreadyPresent =
    messageJournal.networkNodes.indexOf(newNodeUrl) === -1;
  const notCurrentNode = messageJournal.currentNodeUrl !== newNodeUrl;
  if (nodeNotAlreadyPresent && notCurrentNode) {
    messageJournal.networkNodes.push(newNodeUrl);
    res.status(200).json({
      status: "success",
      data: {
        message: "Node added",
      },
    });
  } else {
    res.status(400).json({
      status: "fail",
      data: {
        message: "Node not added",
      },
    });
  }
};

exports.registerNodesBulk = (req, res) => {
  const bulkNodes = req.body.networkNodes;
  bulkNodes.forEach((node) => {
    const nodeNotAlreadyPresent =
      messageJournal.networkNodes.indexOf(node) === -1;
    const notCurrentNode = messageJournal.currentNodeUrl !== node;
    if (nodeNotAlreadyPresent && notCurrentNode) {
      messageJournal.networkNodes.push(node);
    }
  });
  res.status(200).json({
    status: "success",
    data: {
      message: "Bulk registration successful",
    },
  });
};
