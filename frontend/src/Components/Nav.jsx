import React from 'react';
import '../CSS/Dash.css';
import { FiSearch } from 'react-icons/fi';
import imagelogo from '../img/image.png';

function Nav() {
  return (
    <>
      <div>
        <nav className="navbar flex items-center justify-between px-8 py-4 bg-white shadow-md">
          <div className="logo">
            <img className="logo-img" src={imagelogo} alt="CarDekho Logo" />
          </div>

          <div>
            <input
              type="text"
              placeholder="Search or Ask a Question"
              className="search-input"
            />

            <button className="search-button bg-gray-200 p-2 rounded-full ml-2 text-gray-600 hover:bg-gray-300">
              <i className="fas fa-search"></i>
            </button>
          </div>

          {/* Language Dropdown */}
          <div className="language-selector relative">
            <select className="language-dropdown bg-white border border-gray-300 p-2 rounded-md">
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Gujarati">Gujarati</option>
            </select>
          </div>
        </nav>

        <div className="items">
          <div className="dropdown-container">
            <a
              href="#"
              style={{ textDecoration: 'none' }}
              className="dropdown-link"
            >
              <span>New Cars</span>
            </a>
          </div>
          <a href="#" style={{ textDecoration: 'none' }}>
            Used Cars
          </a>
          <a href="#" style={{ textDecoration: 'none' }}>
            News&Reviews
          </a>
          <a href="#" style={{ textDecoration: 'none' }}>
            Videos
          </a>
        </div>
      </div>
    </>
  );
}

export default Nav;
