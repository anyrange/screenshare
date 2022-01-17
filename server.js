const express = require("express");
const { ExpressPeerServer } = require("peer");
const app = express();

app.enable("trust proxy");

const PORT = process.env.PORT || 9000;

app.get("/health", (req, res) => res.send("I'm alive!"));

const server = app.listen(PORT, () =>
  console.log(`App listening on port ${PORT}`),
);

const key = process.env.KEY;
const peerServer = ExpressPeerServer(server, {
  path: "/peer",
  ...(key && { key }),
});

app.use("/", peerServer);

module.exports = app;
