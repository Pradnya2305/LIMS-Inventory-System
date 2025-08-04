import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
// import Navbar from '../components/Navbar';

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/dashboard/stats', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <div className="text-center mt-5">Loading dashboard...</div>;

  return (
    <div>
      {/* <Navbar /> */}
      <div className="container mt-5">
        <h2 className="mb-4">📊 Dashboard Summary</h2>
        <div className="row g-4">
          {/* same cards as before */}
          <div className="col-md-4">
            <div className="card shadow border-primary">
              <div className="card-body">
                <h5>Total Components</h5>
                <h3>{stats.totalComponents}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow border-success">
              <div className="card-body">
                <h5>Total Quantity</h5>
                <h3>{stats.totalQuantity}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow border-warning">
              <div className="card-body">
                <h5>Low Stock Components</h5>
                <h3>{stats.lowStock}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow border-info">
              <div className="card-body">
                <h5>Inward This Month</h5>
                <h3>{stats.inwardThisMonth}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow border-danger">
              <div className="card-body">
                <h5>Outward This Month</h5>
                <h3>{stats.outwardThisMonth}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
