const express = require("express");
const router = express.Router();
const { addBlock } = require("../controllers/block-controller");

router.route("/add").post(addBlock);

module.exports = router;
