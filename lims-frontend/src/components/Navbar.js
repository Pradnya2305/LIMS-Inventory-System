import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">LIMS Inventory</Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">

          {/* ✅ Admin sees everything */}
          {role === 'admin' && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/notifications">Notifications</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add-component">Add Component</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/components">Components</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/movements">Log Usage</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Add User</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/graph">Usage Graph</Link>
            </li>
            </>
          )}

          {/* ✅ Lab Technician */}
          {role === 'lab technician' && (
            <li className="nav-item">
              <Link className="nav-link" to="/add-component">Add Component</Link>
            </li>
          )}

          {/* ✅ Researcher */}
          {role === 'researcher' && (
            <li className="nav-item">
              <Link className="nav-link" to="/components">Components</Link>
            </li>
          )}

          {/* ✅ Manufacturing Engineer */}
          {role === 'manufacturing engineer' && (
            <li className="nav-item">
              <Link className="nav-link" to="/movements">Log Usage</Link>
            </li>
          )}
        </ul>

        {token && (
          <div className="text-white d-flex align-items-center">
            <span className="me-3">Logged in as: <strong>{role?.toUpperCase()}</strong></span>
            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
