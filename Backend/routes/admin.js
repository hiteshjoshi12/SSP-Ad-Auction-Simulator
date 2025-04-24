const express = require('express');
const router = express.Router();
const DSP = require('../models/DSP');

// Route to get all DSPs
router.get('/dsps', async (req, res) => {
  const dsps = await DSP.find();
  res.json(dsps);
});

//Route to create a new DSP
router.post('/dsps', async (req, res) => {
  try {
    const newDSP = new DSP(req.body);
    await newDSP.save();
    res.status(201).json(newDSP);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
