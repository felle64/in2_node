const express = require("express");
const dotenv = require("dotenv");
const blockchainRoutes = require("./routes/blockchainRoutes");

// Load env vars
dotenv.config({ path: "./config/config.env" });

const app = express();

// Mount routers
app.use("/api/bc", placeholder);
