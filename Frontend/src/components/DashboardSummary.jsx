import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import { toast } from 'react-toastify';

const DashboardSummary = () => {
  const [summary, setSummary] = useState({
    totalRequests: 0,
    totalDSPs: 0,
    winRatePerDSP: [],
    avgCPMPerDSP: []
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get('/admin/summary');
        const dspSummary = res.data.dsp_summary;

        setSummary({
          totalRequests: res.data.total_requests,
          totalDSPs: dspSummary.length,
          winRatePerDSP: dspSummary.map(dsp => ({
            name: dsp.dsp_name,
            winRate: dsp.win_rate.toFixed(2)
          })),
          avgCPMPerDSP: dspSummary.map(dsp => ({
            name: dsp.dsp_name,
            avgCPM: parseFloat(dsp.average_cpm)
          }))
        });
      } catch (err) {
        toast.error('Failed to fetch summary:', err);

      }
    };

    fetchSummary();
  }, []); 
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 px-4 sm:px-0">
      
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
        <h3 className="text-xs sm:text-sm text-gray-500">Total Ad Requests</h3>
        <p className="text-lg sm:text-xl font-semibold text-purple-700 truncate">
          {summary.totalRequests.toLocaleString()}
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
        <h3 className="text-xs sm:text-sm text-gray-500">Total DSPs</h3>
        <p className="text-lg sm:text-xl font-semibold text-purple-700">
          {summary.totalDSPs}
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 lg:col-span-2 xl:col-span-1">
        <h3 className="text-xs sm:text-sm text-gray-500 mb-2">Win Rate Per DSP</h3>
        <div className="max-h-40 overflow-y-auto">
          {summary.winRatePerDSP.map((item, idx) => (
            <div key={idx} className="flex justify-between text-xs sm:text-sm text-gray-700 mb-1">
              <span className="truncate max-w-[70%]">{item.name}</span>
              <span className="whitespace-nowrap">{item.winRate}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 lg:col-span-2 xl:col-span-1">
        <h3 className="text-xs sm:text-sm text-gray-500 mb-2">Avg CPM Per DSP</h3>
        <div className="max-h-40 overflow-y-auto">
          {summary.avgCPMPerDSP.map((item, idx) => (
            <div key={idx} className="flex justify-between text-xs sm:text-sm text-gray-700 mb-1">
              <span className="truncate max-w-[70%]">{item.name}</span>
              <span className="whitespace-nowrap">${item.avgCPM.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
