const mongoose = require("mongoose");

const AdRequestSchema = new mongoose.Schema(
  {
    publisher_id: String,
    ad_slot_id: String,
    geo: String,
    device: String,
    time: Date,
    winning_dsp: String,
    bid_price: Number,
    creative: {
      image_url: String,
      click_url: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AdRequest", AdRequestSchema);
