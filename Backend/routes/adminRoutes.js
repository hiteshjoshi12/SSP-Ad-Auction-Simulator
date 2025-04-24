const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/dsps', adminController.getDSPs);
router.post('/dsps', adminController.createDSP);
router.get('/summary', adminController.getSummary);
router.get('/adrequests', adminController.getAdRequests);

module.exports = router;
