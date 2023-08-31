const { messageJournal } = require("../config/config");
const axios = require("axios");

exports.message = (req, res) => {
  const newMessage = req.body;
  const blockIndex = messageJournal.addMessageToPendingList(newMessage);

  res.status(201).json({
    success: true,
    data: `Message will be added to block nr ${blockIndex}`,
  });
};

exports.broadcastMessage = (req, res) => {
  const newMessage = messageJournal.addMessage(
    req.body.message,
    req.body.sender,
    req.body.recipient
  );
  messageJournal.addMessageToPendingList(newMessage);

  messageJournal.networkNodes.forEach(async (networkNodeUrl) => {
    await axios.post(`${networkNodeUrl}/api/v1/message/add`, newMessage);
  });

  res.status(201).json({
    success: true,
    data: newMessage,
  });
};
