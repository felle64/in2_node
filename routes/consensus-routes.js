const express = require("express");
const router = express.Router();

const { synchronize } = require("../controllers/consensus-controller");

router.route("/sync").get(synchronize);

module.exports = router;
