const mongoose = require('mongoose');

const DSPSchema = new mongoose.Schema({
  publisher_id: String,
  ad_slot_id: String,
  name: String,
  targeting: {
    geo: String,
    device: String,
  },
  bid_logic: {
    geo: String,
    device: String,
    bid: Number,
  },
  creative: {
    image_url: String,
    click_url: String,
  }
});

module.exports = mongoose.model('DSP', DSPSchema);
