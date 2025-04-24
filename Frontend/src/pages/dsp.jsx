import React from 'react';
import DSPTable from '../components/DSPTable';
import DSPForm from '../components/DSPForm';

const DSPPage = () => {
  return (
    <div className="space-y-8 px-2 sm:px-4">
      <h1 className="text-2xl font-bold">DSPs</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/2">
          <DSPForm />
        </div>
        <div className="w-full lg:w-1/2">
          <DSPTable />
        </div>
      </div>
    </div>
  );
};

export default DSPPage;
