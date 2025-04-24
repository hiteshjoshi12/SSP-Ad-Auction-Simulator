import React, { useEffect, useState } from "react";
import axios from "../services/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const DSPList = () => {
  const [dsps, setDsps] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDsps = async () => {
      try {
        const response = await axios.get("/admin/dsps");
        setDsps(response.data);
      } catch (err) {
        setError("Failed to load DSPs",err);
        toast.error(error);
      }
    };

    fetchDsps();
  }, []); 

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4 overflow-x-auto">
      <h2 className="text-xl font-medium text-gray-700 mb-4">DSP List</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <table className="w-full table-auto">
        <thead className="hidden md:table-header-group">
          <tr>
            <th className="px-2 py-2 text-left text-sm">DSP Name</th>
            <th className="px-2 py-2 text-left text-sm">Publisher ID</th>
            <th className="px-2 py-2 text-left text-sm">Ad Slot ID</th>
            <th className="px-2 py-2 text-left text-sm">Targeting</th>
            <th className="px-2 py-2 text-left text-sm">Bid Logic</th>
            <th className="px-2 py-2 text-left text-sm">Creative</th>
          </tr>
        </thead>
        <tbody>
          {dsps.length > 0 ? (
            dsps.map((dsp) => (
              <tr key={dsp._id} className="border-t even:bg-gray-50">
                
                {/* Mobile View */}
                <td className="md:hidden p-3">
                  <div className="space-y-2">
                    <div>
                      <span className="font-semibold">DSP Name:</span> {dsp.name}
                    </div>
                    <div>
                      <span className="font-semibold">Publisher ID:</span> {dsp.publisher_id}
                    </div>
                    <div>
                      <span className="font-semibold">Ad Slot ID:</span> {dsp.ad_slot_id}
                    </div>
                    <div>
                      <span className="font-semibold">Targeting:</span><br/>
                      Geo: {dsp.targeting.geo}, Device: {dsp.targeting.device}
                    </div>
                    <div>
                      <span className="font-semibold">Bid Logic:</span><br/>
                      Geo: {dsp.bid_logic.geo}, Device: {dsp.bid_logic.device},<br/>
                      Bid: ${dsp.bid_logic.bid}
                    </div>
                    <div>
                      <span className="font-semibold">Creative:</span>
                      <a
                        href={dsp.creative.click_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block mt-2"
                      >
                        <img
                          src={dsp.creative.image_url}
                          alt="Creative"
                          className="w-24 h-24 object-cover mx-auto"
                        />
                        <span className="text-blue-600 underline text-sm block truncate">
                          {dsp.creative.click_url}
                        </span>
                      </a>
                    </div>
                  </div>
                </td>

                {/* Desktop View */}
                <td className="hidden md:table-cell px-2 py-3 text-sm">{dsp.name}</td>
                <td className="hidden md:table-cell px-2 py-3 text-sm">{dsp.publisher_id}</td>
                <td className="hidden md:table-cell px-2 py-3 text-sm">{dsp.ad_slot_id}</td>
                <td className="hidden md:table-cell px-2 py-3 text-sm">
                  <div className="space-y-1">
                    <div>Geo: {dsp.targeting.geo}</div>
                    <div>Device: {dsp.targeting.device}</div>
                  </div>
                </td>
                <td className="hidden md:table-cell px-2 py-3 text-sm">
                  <div className="space-y-1">
                    <div>Geo: {dsp.bid_logic.geo}</div>
                    <div>Device: {dsp.bid_logic.device}</div>
                    <div>Bid: ${dsp.bid_logic.bid}</div>
                  </div>
                </td>
                <td className="hidden md:table-cell px-2 py-3 text-sm">
                  <a
                    href={dsp.creative.click_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <img
                      src={dsp.creative.image_url}
                      alt="Creative"
                      className="w-16 h-16 object-cover mx-auto mb-2"
                    />
                    <span className="text-blue-600 underline text-xs truncate block">
                      {dsp.creative.click_url}
                    </span>
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-4 py-2 text-center text-sm">
                No DSPs found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DSPList;
