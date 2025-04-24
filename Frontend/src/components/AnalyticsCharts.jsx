import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import axios from "../services/api";
import { toast } from "react-toastify";

const AnalyticsCharts = () => {
  const [summaryData, setSummaryData] = useState(null);

  useEffect(() => {
    axios
      .get("/admin/summary")
      .then((res) => setSummaryData(res.data))
      .catch((err) => toast.error(err));
  }, []); 

  if (!summaryData)
    return (
      <div className="text-center py-10 text-gray-600">
        Loading analytics...
      </div>
    );

  const { total_requests, dsp_summary } = summaryData;

  return (
    <div className="p-3 sm:p-6 space-y-8 sm:space-y-10">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center sm:text-left">
        Analytics Dashboard
      </h2>

      <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow text-lg sm:text-xl font-medium text-center sm:text-left">
        Total Ad Requests:{" "}
        <span className="font-bold text-indigo-600">{total_requests}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
  
        <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow">
          <h3 className="text-base sm:text-lg font-semibold mb-2">
            Win Rate per DSP
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={dsp_summary}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dsp_name" fontSize={12} />
              <YAxis unit="%" fontSize={12} />
              <Tooltip />
              <Legend />
              <Bar dataKey="win_rate" fill="#1B4E6B" name="Win Rate (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      
        <div className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow">
          <h3 className="text-base sm:text-lg font-semibold mb-2">
            Average CPM per DSP
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={dsp_summary}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dsp_name" fontSize={12} />
              <YAxis unit="$" fontSize={12} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey={(entry) => parseFloat(entry.average_cpm)}
                fill="#5C63A2"
                name="Avg CPM ($)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 className="text-base sm:text-lg font-semibold mb-4 text-center sm:text-left">
          CPM Trend Over Time
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {dsp_summary.map((dsp, index) => (
            <div
              key={index}
              className="bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow mb-4"
            >
              <h4 className="font-medium text-gray-700 mb-2 text-center sm:text-left">
                {dsp.dsp_name}
              </h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={dsp.cpm_trend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" fontSize={12} />
                  <YAxis unit="$" fontSize={12} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey={(d) => parseFloat(d.cpm)}
                    stroke="#F59E0B"
                    name="CPM"
                    dot={{ r: 3 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
