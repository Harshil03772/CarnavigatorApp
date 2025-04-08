import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          Car Brand Dashboard
        </Link>
        <div className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/add-brand">Add Brand</Link>
          {/* Add any other links you need here */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
