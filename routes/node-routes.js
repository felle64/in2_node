const express = require("express");
const router = express.Router();
const {
  brodcastNode,
  registerNode,
  registerNodesBulk,
} = require("../controllers/node-controller");

router.route("/").post(brodcastNode);

router.route("/register").post(registerNode);

router.route("/register-bulk").post(registerNodesBulk);

module.exports = router;
