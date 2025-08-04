import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
// import Navbar from '../components/Navbar';

function ComponentsList() {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/components', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setComponents(response.data);
      } catch (err) {
        console.error('Error fetching components:', err.message);
      }
    };

    fetchComponents();
  }, []);

  return (
    <>
      {/* <Navbar /> */}
      <div className="container mt-4">
        <h2 className="mb-3">📋 Component Inventory</h2>
        {components.length === 0 ? (
          <p>No components found.</p>
        ) : (
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Critical Threshold</th>
                <th>Last Used</th>
              </tr>
            </thead>
            <tbody>
              {components.map((comp) => (
                <tr key={comp._id}>
                  <td>{comp.name}</td>
                  <td>{comp.description}</td>
                  <td>{comp.quantity}</td>
                  <td>{comp.criticalLowThreshold}</td>
                  <td>{comp.lastUsedAt ? new Date(comp.lastUsedAt).toLocaleDateString() : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default ComponentsList;
