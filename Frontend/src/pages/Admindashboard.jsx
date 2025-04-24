import React from 'react';
import AnalyticsCharts from '../components/AnalyticsCharts';
import DashboardSummary from '@/components/DashboardSummary';
import DSPList from '@/components/DSPList';
import AdRequestsTable from '@/components/AdRequestsTable';

const Dashboard = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">SSP Admin Dashboard</h1>
      <DashboardSummary />
      <DSPList />
      <AnalyticsCharts />
      <AdRequestsTable />
    </div>
  );
};

export default Dashboard;
