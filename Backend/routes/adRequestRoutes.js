const express = require('express');
const router = express.Router();
const { handleAdRequest, getLogs } = require("../controllers/adRequestController");

router.post("/ad-request", handleAdRequest);
router.get("/logs", getLogs);

module.exports = router;
