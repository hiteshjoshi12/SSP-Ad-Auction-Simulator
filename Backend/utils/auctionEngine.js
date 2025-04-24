const DSPs = require("../data/dspData.js");

const runAuction = (request) => {
  const bids = DSPs.map(dsp => {
    const bid = dsp.bidLogic(request.geo, request.device);
    return {
      dspId: dsp.id,
      bid,
      creative: dsp.creative
    };
  });

  const eligibleBids = bids.filter(b => b.bid > 1);
  const winner = eligibleBids.sort((a, b) => b.bid - a.bid)[0];

  return winner || null;
};

module.exports = runAuction;
