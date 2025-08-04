import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Notifications() {
  const [lowStock, setLowStock] = useState([]);
  const [oldStock, setOldStock] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAlerts = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('No token found. Please log in again.');
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      try {
        const lowRes = await axios.get(
          'http://localhost:5000/api/notifications/low-stock',
          { headers }
        );
        setLowStock(lowRes.data);
      } catch (err) {
        setError('Failed to fetch low stock alerts: ' + (err.response?.data?.msg || err.message));
      }

      try {
        const oldRes = await axios.get(
          'http://localhost:5000/api/notifications/old-stock',
          { headers }
        );
        setOldStock(oldRes.data);
      } catch (err) {
        setError('Failed to fetch old stock alerts: ' + (err.response?.data?.msg || err.message));
      }
    };

    fetchAlerts();
  }, []);

  return (
    <div className="container mt-5">
      <h2>🔔 Notifications & Alerts</h2>

      {error && (
        <div className="alert alert-danger mt-3">
          <strong>Error:</strong> {error}
        </div>
      )}

      <div className="mt-4">
        <h4>🔻 Low Stock Components</h4>
        {lowStock.length === 0 ? (
          <p>No low stock components 🎉</p>
        ) : (
          <ul className="list-group">
            {lowStock.map((item) => (
              <li key={item._id} className="list-group-item">
                {item.name} — Qty: {item.quantity} (Threshold: {item.criticalLowThreshold})
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-5">
        <h4>🕒 Old Stock (Unused ≥ 3 Months)</h4>
        {oldStock.length === 0 ? (
          <p>No old stock items 🎉</p>
        ) : (
          <ul className="list-group">
            {oldStock.map((item) => (
              <li key={item._id} className="list-group-item">
                {item.name} — Last used: {new Date(item.lastUsedAt).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Notifications;
