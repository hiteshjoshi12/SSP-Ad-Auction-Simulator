const DSP = require('../models/DSP');
const AdRequest = require('../models/AdRequest');

// Get all DSPs
exports.getDSPs = async (req, res) => {
  try {
    const dsps = await DSP.find();
    res.json(dsps);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch DSPs' });
  }
};

// Create new DSP
exports.createDSP = async (req, res) => {
  try {
    const newDSP = new DSP(req.body);
    await newDSP.save();
    res.status(201).json(newDSP);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get summary
exports.getSummary = async (req, res) => {
  try {
    const totalRequests = await AdRequest.countDocuments();
    const dsps = await DSP.find();

    const dspSummary = await Promise.all(
      dsps.map(async (dsp) => {
        const winningRequests = await AdRequest.find({ winning_dsp: dsp.name });
        const winRate = totalRequests ? (winningRequests.length / totalRequests) * 100 : 0;
        const avgCPM = winningRequests.reduce((sum, request) => sum + request.bid_price, 0) / winningRequests.length || 0;

        // CPM trend
        const cpmTrend = winningRequests.reduce((acc, request) => {
          const date = request.time.toISOString().split('T')[0];
          if (!acc[date]) acc[date] = [];
          acc[date].push(request.bid_price);
          return acc;
        }, {});

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
          cpm_trend: cpmTrendData,
        };
      })
    );

    res.json({
      total_requests: totalRequests,
      dsp_summary: dspSummary,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch summary data' });
  }
};

// Get all ad requests
exports.getAdRequests = async (req, res) => {
  try {
    const adRequests = await AdRequest.find();
    res.json(adRequests);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch ad requests' });
  }
};
