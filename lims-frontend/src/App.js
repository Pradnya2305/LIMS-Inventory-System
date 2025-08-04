import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar'; // ✅ Add Navbar

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ComponentsList from './pages/ComponentsList';
import AddComponent from './pages/AddComponent';
import Movements from './pages/Movements';
import Notifications from './pages/Notifications';
import RegisterUser from './pages/RegisterUser';
import UsageGraph from './pages/UsageGraph';

function App() {
  return (
    <Router>
      {/* ✅ Global Navbar */}
      <Navbar />

      {/* ✅ Page Routes */}
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Admin */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/graph" element={<UsageGraph />} />

        {/* Lab Technician */}
        <Route path="/add-component" element={<AddComponent />} />

        {/* Researcher */}
        <Route path="/components" element={<ComponentsList />} />

        {/* Manufacturing Engineer */}
        <Route path="/movements" element={<Movements />} />
      </Routes>
    </Router>
  );
}

export default App;
