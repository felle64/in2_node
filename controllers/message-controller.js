const { messageJournal } = require("../config/config");

exports.addMessageToPendingList = (req, res) => {
  const newMessage = req.body;
  const blockIndex = messageJournal.addMessageToPendingList(newMessage);
  res.status(200).json({
    status: "success",
    data: {
      message: `Message will be added to block ${blockIndex}`,
    },
  });
};

exports.broadcastMessage = (req, res) => {
  const newMessage = messageJournal.addMessage(
    req.body.message,
    req.body.sender,
    req.body.recipient
  );
  const blockIndex = messageJournal.addMessageToPendingList(newMessage);
  res.status(200).json({
    status: "success",
    data: {
      message: `Message will be added to block ${blockIndex}`,
    },
  });
};
