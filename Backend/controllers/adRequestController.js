const runAuction = require("../utils/auctionEngine");

let requestLogs = []; // in-memory store

exports.handleAdRequest = (req, res) => {
  const request = req.body;
  const result = runAuction(request);

  const log = {
    request,
    result,
    time: new Date()
  };

  requestLogs.push(log);
  res.json(result);
};

exports.getLogs = (req, res) => {
  res.json(requestLogs);
};
