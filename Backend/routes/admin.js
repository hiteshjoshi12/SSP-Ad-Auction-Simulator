const express = require('express');
const router = express.Router();
const DSP = require('../models/DSP');
const AdRequest = require('../models/AdRequest');

// Get all DSPs
router.get('/dsps', async (req, res) => {
  const dsps = await DSP.find();
  res.json(dsps);
});

// Create new DSP
router.post('/dsps', async (req, res) => {
  try {
    const newDSP = new DSP(req.body);
    await newDSP.save();
    res.status(201).json(newDSP);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/summary', async (req, res) => {
  try {
    // Calculate total ad requests
    const totalRequests = await AdRequest.countDocuments();

    // Get all DSPs
    const dsps = await DSP.find();

    // Prepare the summary data for each DSP
    const dspSummary = await Promise.all(
      dsps.map(async (dsp) => {
        // Get all ad requests where this DSP was the winning DSP
        const winningRequests = await AdRequest.find({ winning_dsp: dsp.name });

        // Calculate win rate (number of wins / total requests)
        const winRate = totalRequests ? (winningRequests.length / totalRequests) * 100 : 0;

        // Calculate average CPM (average bid price of winning requests)
        const avgCPM = winningRequests.reduce((sum, request) => sum + request.bid_price, 0) / winningRequests.length || 0;

        // Group winning requests by date to track CPM trend over time
        const cpmTrend = winningRequests.reduce((acc, request) => {
          const date = request.time.toISOString().split('T')[0]; // Get date in YYYY-MM-DD format
          if (!acc[date]) acc[date] = [];
          acc[date].push(request.bid_price);
          return acc;
        }, {});

        // Calculate average CPM for each date
        const cpmTrendData = Object.keys(cpmTrend).map((date) => {
          const cpmValues = cpmTrend[date];
          const avgDailyCPM = cpmValues.reduce((sum, value) => sum + value, 0) / cpmValues.length;
          return { date, cpm: avgDailyCPM.toFixed(2) };
        });

        return {
          dsp_name: dsp.name,
          win_rate: winRate,
          average_cpm: avgCPM.toFixed(2),
          total_wins: winningRequests.length,
          cpm_trend: cpmTrendData, // Add the CPM trend data here
        };
      })
    );

    // Return the summary data
    res.json({
      total_requests: totalRequests,
      dsp_summary: dspSummary,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch summary data' });
  }
});


router.get('/adrequests', async (req, res) => {
  try {
    const adRequests = await AdRequest.find(); // Fetch all ad requests from the database
    res.json(adRequests);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch ad requests' });
  }
});


module.exports = router;
