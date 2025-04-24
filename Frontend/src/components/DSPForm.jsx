import React, { useState } from "react";
import axios from "../services/api";
import { toast } from "react-toastify";

const DSPForm = () => {
  const [dspData, setDspData] = useState({
    publisher_id: "",
    ad_slot_id: "",
    name: "",
    geo: "US",
    device: "Mobile",
    bidPrice: 1, 
    image_url: "",
    click_url: "",
  });

  // ChangeHandler for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDspData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { geo, device } = dspData;

    // Bid price logic
    let bidPrice = 1; //Defalut
    if (geo === "US" && device === "mobile") {
      bidPrice = 3.5;
    }

    // Form data for backend
    const newDsp = {
      publisher_id: dspData.publisher_id,
      ad_slot_id: dspData.ad_slot_id,
      name: dspData.name,
      targeting: {
        geo: dspData.geo,
        device: dspData.device,
      },
      bid_logic: {
        geo: dspData.geo,
        device: dspData.device,
        bid: bidPrice,
      },
      creative: {
        image_url: dspData.image_url,
        click_url: dspData.click_url,
      },
    };

    try {
      await axios.post("/admin/dsps", newDsp);
      toast.success("DSP added successfully!")
    } catch (err) {
      toast.error("Failed to add DSP!",err)  
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-xl font-medium text-gray-700 mb-4">Add DSP</h2>
      <form onSubmit={handleSubmit} >
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="publisher_id"
          >
            Publisher ID
          </label>
          <input
            type="text"
            id="publisher_id"
            name="publisher_id"
            value={dspData.publisher_id}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="ad_slot_id"
          >
            Ad Slot ID
          </label>
          <input
            type="text"
            id="ad_slot_id"
            name="ad_slot_id"
            value={dspData.ad_slot_id}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="name"
          >
            DSP Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={dspData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="geo"
          >
            Geo Targeting
          </label>
          <select
            id="geo"
            name="geo"
            value={dspData.geo}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="US">US</option>
            <option value="India">India</option>
            <option value="Europe">Europe</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="device"
          >
            Device Targeting
          </label>
          <select
            id="device"
            name="device"
            value={dspData.device}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="mobile">Mobile</option>
            <option value="desktop">Desktop</option>
            <option value="tablet">Tablet</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="image_url"
          >
            Ad Image URL
          </label>
          <input
            type="url"
            id="image_url"
            name="image_url"
            value={dspData.image_url}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="click_url"
          >
            Click URL
          </label>
          <input
            type="url"
            id="click_url"
            name="click_url"
            value={dspData.click_url}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-xl transition duration-300 cursor-pointer"
          >
            Add DSP
          </button>
        </div>
      </form>
    </div>
  );
};

export default DSPForm;
