import React, { useState } from 'react';
import axios from 'axios';

function RegisterUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'lab technician'
  });

  const [message, setMessage] = useState('');

  const roles = [
    'admin',
    'lab technician',
    'researcher',
    'manufacturing engineer'
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      setMessage('✅ User registered successfully!');
      setFormData({ name: '', email: '', password: '', role: 'lab technician' });
    } catch (err) {
      setMessage('❌ Registration failed: ' + err.response?.data?.msg || 'Server error');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register New User</h2>

      {message && (
        <div className="alert alert-info mt-3">{message}</div>
      )}

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Role:</label>
          <select
            className="form-control"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Register User</button>
      </form>
    </div>
  );
}

export default RegisterUser;
