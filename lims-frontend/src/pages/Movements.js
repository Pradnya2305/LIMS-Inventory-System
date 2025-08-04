import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

function Movements() {
  const [components, setComponents] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [type, setType] = useState('inward'); // default: inward
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/components', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setComponents(response.data);
      } catch (err) {
        console.error('Error fetching components:', err);
      }
    };
    fetchComponents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    console.log('Component not found');

    if (!selectedId || !quantity || isNaN(quantity) || Number(quantity) <= 0) {
      return setMessage('❌ Please select a component and enter a valid quantity.');
    }

    try {
      const token = localStorage.getItem('token');
      const url = `/movements/${type}`;
      const payload = {
        componentId: selectedId,
        quantity: Number(quantity) // FIX: force number to avoid graph issues
      };

      await axios.post(url, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage(`✅ ${type === 'inward' ? 'Inward' : 'Outward'} logged successfully`);
      setQuantity('');
      setSelectedId('');
    } catch (err) {
      console.error(err);
      setMessage('❌ Error performing movement');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">🔁 Component Movement</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Select Component</label>
          <select
            className="form-control"
            required
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
          >
            <option value="">-- Select --</option>
            {components.map((comp) => (
              <option key={comp._id} value={comp._id}>
                {comp.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Quantity</label>
          <input
            type="number"
            className="form-control"
            required
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min={1}
          />
        </div>

        <div className="mb-3">
          <label>Movement Type</label>
          <select
            className="form-control"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="inward">Inward (Add)</option>
            <option value="outward">Outward (Remove)</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit Movement
        </button>
      </form>
    </div>
  );
}

export default Movements;
