import React from 'react';
import '../CSS/Dash.css';
import { FiSearch } from 'react-icons/fi';
import main from '../../src/img/main.png';
import Nav from './Nav';

function Dash() {
  return (
    <>
      <div>
        <Nav />
        <div className="img">
          <img src={main} alt="main" />
        </div>

        {/* Find Your Car Box Container */}
        {/* <div className="car-box-container">
          <h2 className="find-your-car-header">Find your right car</h2>

          <div className="button-group">
            <button className="car-option-button">New Car</button>
            <button className="car-option-button">Used Car</button>
          </div>

          <div className="radio-group">
            <label className="radio-label">
              <input type="radio" name="car-type" /> By Budget
            </label>
            <label className="radio-label">
              <input type="radio" name="car-type" /> By Brand
            </label>
          </div>

          <div className="dropdowns-group">
            <select className="budget-dropdown">
              <option value="">Select Budget</option>
              <option value="10k-20k">10k - 20k</option>
              <option value="20k-30k">20k - 30k</option>
              <option value="30k-40k">30k - 40k</option>
            </select>

            <select className="vehicle-type-dropdown">
              <option value="">All Vehicle Types</option>
              <option value="sedan">Sedan</option>
              <option value="suv">SUV</option>
              <option value="hatchback">Hatchback</option>
            </select>
            
          </div>
          <button className="car-option-button">Search</button>
        </div> */}
      </div>
    </>
  );
}

export default Dash;
