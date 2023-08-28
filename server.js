const express = require("express");
const blockchain = require("./routes/blockchain-routes");

const app = express();

const PORT = process.argv[2];

app.use(express.json());

// Mount routers
app.use("/api/v1/bc", blockchain);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
