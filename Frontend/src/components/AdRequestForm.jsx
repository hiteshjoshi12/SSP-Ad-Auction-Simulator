import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AdRequestForm = ({ isOpen, closeModal }) => {
  const [formData, setFormData] = useState({
    publisher_id: "",
    ad_slot_id: "",
    geo: "US",
    device: "Mobile",
    time: new Date().toISOString().slice(0, 16),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://ssp-ad-auction-simulator.vercel.app/ad-request", formData);
      console.log("erroe res",res)
      if (res.data.winner_dsp && res.data.bid_price) {
        toast.success(`Winner: ${res.data.winner_dsp} | Bid: $${res.data.bid_price}`);
      } else if (res.data.message) {
        toast.error(res.data.message);
      } else {
        toast.error("Unexpected response from server");
      }
      setFormData("")
      closeModal();
    } catch (error) {
      toast.error("Ad request error:", error);
      toast.error("Failed to simulate ad request.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-400/55 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Simulate Ad Request</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="publisher_id"
            placeholder="Publisher ID"
            value={formData.publisher_id}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="ad_slot_id"
            placeholder="Ad Slot ID"
            value={formData.ad_slot_id}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <select
            name="geo"
            value={formData.geo}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="US">US</option>
            <option value="India">India</option>
            <option value="Europe">Europe</option>
          </select>

          <select
            name="device"
            value={formData.device}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="Mobile">Mobile</option>
            <option value="Desktop">Desktop</option>
            <option value="Tablet">Tablet</option>
          </select>

          <input
            type="datetime-local"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-xl transition duration-300 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-xl transition duration-300 cursor-pointer"
            >
              Send Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdRequestForm;
