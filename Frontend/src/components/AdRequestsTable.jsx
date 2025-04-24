import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import { toast } from 'react-toastify';

const AdRequestsTable = () => {
  const [adRequests, setAdRequests] = useState([]);
  useEffect(() => {
    const fetchAdRequests = async () => {
      try {
        const response = await axios.get('/admin/adrequests');
        setAdRequests(response.data);
      } catch (err) {
        toast.err('Failed to load ad requests',err);
       
      }
    };
    fetchAdRequests();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4 overflow-x-auto">
      <h2 className="text-xl font-medium text-gray-700 mb-4">Ad Requests</h2>

      {/* Desktop Table */}
      <table className="min-w-full table-auto hidden md:table">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Publisher ID</th>
            <th className="px-4 py-2 text-left">Ad Slot ID</th>
            <th className="px-4 py-2 text-left">Geo</th>
            <th className="px-4 py-2 text-left">Device</th>
            <th className="px-4 py-2 text-left">Bid</th>
            <th className="px-4 py-2 text-left">Winning DSP</th>
          </tr>
        </thead>
        <tbody>
          {adRequests.length > 0 ? (
            adRequests.map((request) => (
              <tr key={request._id} className="border-t even:bg-gray-50">
                <td className="px-4 py-2">{request.publisher_id}</td>
                <td className="px-4 py-2">{request.ad_slot_id}</td>
                <td className="px-4 py-2">{request.geo}</td>
                <td className="px-4 py-2">{request.device}</td>
                <td className="px-4 py-2">${request.bid_price}</td>
                <td className="px-4 py-2">{request.winning_dsp || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-4 py-2 text-center">
                No ad requests found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Mobile Card Layout */}
      <div className="md:hidden space-y-4">
        {adRequests.length > 0 ? (
          adRequests.map((request) => (
            <div
              key={request._id}
              className="border rounded-lg p-3 shadow-sm bg-gray-50"
            >
              <div className="mb-1">
                <span className="font-semibold">Publisher ID:</span> {request.publisher_id}
              </div>
              <div className="mb-1">
                <span className="font-semibold">Ad Slot ID:</span> {request.ad_slot_id}
              </div>
              <div className="mb-1">
                <span className="font-semibold">Geo:</span> {request.geo}
              </div>
              <div className="mb-1">
                <span className="font-semibold">Device:</span> {request.device}
              </div>
              <div className="mb-1">
                <span className="font-semibold">Bid:</span> ${request.bid_price}
              </div>
              <div>
                <span className="font-semibold">Winning DSP:</span> {request.winning_dsp || 'N/A'}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600">No ad requests found</div>
        )}
      </div>
    </div>
  );
};

export default AdRequestsTable;
