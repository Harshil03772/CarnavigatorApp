import React from 'react';
import Slider from 'react-slick';
import '../CSS/Brand.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import Dash from './Dash';
import Footer from './Footer';
import axios from 'axios';
import { useEffect, useState } from 'react';

const PopularBrands = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5008/api/brands').then((response) => {
      console.log('Fetched brands:', response.data);
      setBrands(response.data);
    });
  }, []);

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 7,
    responsive: [
      {
        breakpoint: 1200, // Large screen breakpoint
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 768, // Tablet breakpoint
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480, // Mobile breakpoint
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Dash />
      <div className="container">
        <div className="popular-brands-box">
          <h2>Popular Brands</h2>
          <Slider {...settings}>
            {brands.map((brand) => {
              console.log('Rendering Brand:', brand);
              return (
                <div key={brand._id} className="brand-card">
                  <Link to={`/cars/${brand._id}`} className="brand-item">
                    <div className="card-content">
                      <img
                        src={brand.brandimage}
                        alt={brand.name}
                        className="brand-img"
                      />
                      <span className="brand-name">{brand.name}</span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PopularBrands;
