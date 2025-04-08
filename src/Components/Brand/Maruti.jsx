import React, { useEffect, useState } from 'react';
import Nav from '../Nav';
import '../../CSS/cartype.css';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import axios from 'axios';

const Maruti = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  const { brandName } = useParams();
  const { brandId } = useParams();
  console.log('Brand Name from Params:', brandName);

  const handleCarClick = (id, title, minPrice, maxPrice, image) => {
    console.log('Car clicked:', id, title, minPrice, maxPrice, image);
    navigate(`/models/${id}`, {
      state: { title, minPrice, maxPrice, image },
    });
  };

  // Fetch car data from the backend API
  useEffect(() => {
    axios
      .get(`http://localhost:5008/api/cars/brand/${brandId}`)
      .then((response) => {
        console.log('Fetched brands:', response.data);
        setCars(response.data);
      })
      .catch((error) => {
        console.error('Error fetching car data:', error);
      });
  }, [brandId]);

  return (
    <>
      <Nav />
      <div style={{ fontSize: '23px', fontWeight: '500', color: '#24272c' }}>
        <h2>{brandName} Car Models</h2>
      </div>
      <div>
        {cars.map((car, index) => {
          // Convert minPrice and maxPrice to Lakhs format
          const formattedMinPrice = (car.minPrice / 100000).toFixed(2);
          const formattedMaxPrice = (car.maxPrice / 100000).toFixed(2);

          return (
            <div className="col-sm-6" key={index}>
              <div
                className="card mb-3"
                style={{ maxWidth: '100%', borderRadius: '15px' }}
                onClick={() =>
                  handleCarClick(
                    car._id,
                    car.title,
                    car.minPrice,
                    car.maxPrice,
                    car.image,
                  )
                }
              >
                <div className="row g-0" style={{ margin: '15px' }}>
                  <div className="col-md-4">
                    <img
                      src={car.image}
                      className="img-fluid rounded-start"
                      alt="Car Image"
                      style={{
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: 'inherit',
                        width: '100%',
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                  <div className="col-md-8">
                    <div
                      className="card-body"
                      style={{
                        padding: '12px 28px',
                        height: '100%',
                        alignItems: 'center',
                        width: '-webkit-fill-available',
                      }}
                    >
                      <h5 className="card-title" style={{ fontSize: '20px' }}>
                        {car.title}
                      </h5>
                      <h5 className="card-title" style={{ fontSize: '18px' }}>
                        {`₹${formattedMinPrice} - ₹${formattedMaxPrice} Lakh*`}
                      </h5>

                      <div className="card-first" style={{ fontSize: '17px' }}>
                        <div>
                          <small>{car.type}</small>
                          <small style={{ marginLeft: '10px' }}>
                            {car.mileage} kmpl
                          </small>
                          <small style={{ marginLeft: '10px' }}>
                            {car.trans}
                          </small>
                        </div>
                      </div>
                      <div className="card-first" style={{ fontSize: '17px' }}>
                        <div style={{ marginRight: '5px' }}>
                          <small style={{ marginRight: '8px' }}>
                            {car.engine} cc
                          </small>
                          <small style={{ marginRight: '10px' }}>
                            {car.bhp} bhp
                          </small>
                          <small style={{ marginRight: '10px' }}>
                            {car.safety} Star
                          </small>
                        </div>
                      </div>
                      <button className="offerbutton">
                        Check Current Offers
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
};

export default Maruti;
