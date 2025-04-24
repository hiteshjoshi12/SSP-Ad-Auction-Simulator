import React, { useEffect, useState } from 'react';
import axios from '../services/api';

const DSPTable = () => {
  const [dsps, setDsps] = useState([]);

  useEffect(() => {
    axios.get('/admin/dsps').then((res) => setDsps(res.data));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-xl font-medium text-gray-700 mb-4">DSPs</h2>
      {/* Desktop Table */}
      <div className="overflow-x-auto hidden md:block">
        <table className="w-full text-sm text-left text-gray-600">
          <thead>
            <tr>
              <th className="px-4 py-2">Publisher ID</th>
              <th className="px-4 py-2">Ad Slot ID</th>
              <th className="px-4 py-2">Geo</th>
              <th className="px-4 py-2">Device</th>
              <th className="px-4 py-2">Bid</th>
              <th className="px-4 py-2">Creative</th>
            </tr>
          </thead>
          <tbody>
            {dsps.map((dsp, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{dsp.publisher_id}</td>
                <td className="px-4 py-2">{dsp.ad_slot_id}</td>
                <td className="px-4 py-2">{dsp.targeting.geo}</td>
                <td className="px-4 py-2">{dsp.targeting.device}</td>
                <td className="px-4 py-2">{dsp.bid_logic.bid}</td>
                <td className="px-4 py-2">
                  <a
                    href={dsp.creative.click_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-indigo-600 break-all"
                  >
                    <img
                      src={dsp.creative.image_url}
                      alt="Creative"
                      className="w-16 h-16 object-cover mb-1"
                    />
                    <span className="block text-xs">{dsp.creative.click_url}</span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-3">
        {dsps.map((dsp, i) => (
          <div key={i} className="border rounded-lg p-3 shadow-sm bg-gray-50">
            <div>
              <span className="font-semibold">Publisher ID:</span> {dsp.publisher_id}
            </div>
            <div>
              <span className="font-semibold">Ad Slot ID:</span> {dsp.ad_slot_id}
            </div>
            <div>
              <span className="font-semibold">Geo:</span> {dsp.targeting.geo}
            </div>
            <div>
              <span className="font-semibold">Device:</span> {dsp.targeting.device}
            </div>
            <div>
              <span className="font-semibold">Bid:</span> {dsp.bid_logic.bid}
            </div>
            <div className="mt-2">
              <span className="font-semibold">Creative:</span>
              <a
                href={dsp.creative.click_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-1"
              >
                <img
                  src={dsp.creative.image_url}
                  alt="Creative"
                  className="w-24 h-24 object-cover mb-1"
                />
                <span className="block text-xs text-blue-600 underline break-all">
                  {dsp.creative.click_url}
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DSPTable;
