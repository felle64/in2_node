const express = require("express");
const blockchainRoutes = require("./routes/blockchainRoutes");

const app = express();

const PORT = process.argv[2];

app.use(express.json());

// Mount routers
app.use("/api/bc", placeholder);
