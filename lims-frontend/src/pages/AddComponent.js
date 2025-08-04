import React, { useState } from 'react';
import axios from '../api/axios';
// import Navbar from '../components/Navbar';

function AddComponent() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [criticalLowThreshold, setThreshold] = useState('');
  const [message, setMessage] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        '/components',
        { name, description, quantity, criticalLowThreshold },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage('✅ Component added successfully!');
      setName('');
      setDescription('');
      setQuantity('');
      setThreshold('');
    } catch (err) {
      setMessage('❌ Error adding component');
      console.error(err.message);
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="container mt-5" style={{ maxWidth: '600px' }}>
        <h2 className="mb-4">➕ Add New Component</h2>
        {message && <div className="alert alert-info">{message}</div>}
        <form onSubmit={handleAdd}>
          <div className="mb-3">
            <label>Name</label>
            <input
              className="form-control"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Component name"
            />
          </div>
          <div className="mb-3">
            <label>Description</label>
            <input
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description"
            />
          </div>
          <div className="mb-3">
            <label>Quantity</label>
            <input
              className="form-control"
              type="number"
              required
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Critical Low Threshold</label>
            <input
              className="form-control"
              type="number"
              required
              value={criticalLowThreshold}
              onChange={(e) => setThreshold(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Add Component
          </button>
        </form>
      </div>
    </>
  );
}

export default AddComponent;
