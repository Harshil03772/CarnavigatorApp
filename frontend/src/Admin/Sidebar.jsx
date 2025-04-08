import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li>
          <Link to="/dashboard">Home</Link>
        </li>
        {/* <li>
          <Link to="/add-brand">Add Brand</Link>
        </li> */}
        <li>
          <Link to="/add-car-model">Add Car Model</Link>
        </li>
        {/* Add more menu items here */}
      </ul>
    </div>
  );
};

export default Sidebar;
