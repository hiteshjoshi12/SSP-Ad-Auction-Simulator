const DSP = require("../models/DSP");
const AdRequest = require("../models/AdRequest");

exports.handleAdRequest = async (req, res) => {
  const { publisher_id, ad_slot_id, geo, device, time } = req.body;

  const dsps = await DSP.find();

  const bids = dsps.map(dsp => {
    const matchGeo = dsp.targeting.geo.toUpperCase() === geo.toUpperCase();
    const matchDevice = dsp.targeting.device.toUpperCase() === device.toUpperCase();    
    if (matchGeo && matchDevice) {
      return {
        dsp_id: dsp.name,
        bid: dsp.bid_logic.bid,
        creative: dsp.creative
      };
    }
    return null;
  }).filter(Boolean);

  if (bids.length === 0) {
    return res.status(200).json({ message: 'No eligible bids' });
  }

  const winner = bids.reduce((max, bid) => bid.bid > max.bid ? bid : max);

  const adRequest = new AdRequest({
    publisher_id,
    ad_slot_id,
    geo,
    device,
    time,
    winning_dsp: winner.dsp_id,
    bid_price: winner.bid,
    creative: winner.creative
  });
  await adRequest.save();

  res.json({
    winner_dsp: winner.dsp_id,
    bid_price: winner.bid,
    creative: winner.creative
  });
};


exports.getLogs = async (req, res) => {
  try {
    const logs = await AdRequest.find().sort({ createdAt: -1 }); // latest first
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch ad logs' });
  }
};