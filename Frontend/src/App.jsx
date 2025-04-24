import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Admindashboard'; 
import DSPPage from './pages/dsp';   

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dsps" element={<DSPPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
