import React, { useState, useEffect } from 'react';
import { Carousel, Card } from 'react-bootstrap'; // Import Carousel from react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { FaRegThumbsUp, FaShareAlt } from 'react-icons/fa'; // Importing React Icons for Like and Share buttons
import '../../../CSS/model.css';
import Nav from '../../Nav'; // Assuming you already have a Nav component
import Footer from '../../Footer';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const Fronx = (props) => {
  const [activeTab, setActiveTab] = useState('key-specification');
  const [variant, setVariant] = useState('all-type');
  const [variants, setVariants] = useState([]);
  const [specifications, setSpecifications] = useState({});
  const [transmission, setTransmission] = useState('all');
  const { carId } = useParams();
  const [cars, setCars] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { state } = useLocation();
  const { title, minPrice, maxPrice, image } = state || {};
  const { id } = useParams();
  const carcolor = [
    {
      name: 'Pearl Arctic White',
      image:
        'https://stimg.cardekho.com/images/car-images/360x240/Maruti/Brezza/8679/Maruti-Brezza-Lxi/1656651893738/225_pearl-arctic-grey_4a4c4b-copy.jpg?imwidth=480&impolicy=resize',
    },
    {
      name: 'Exuberant Blue',
      image:
        'https://stimg.cardekho.com/images/car-images/360x240/Maruti/Brezza/8679/Maruti-Brezza-Lxi/1656651893738/223_esxuberant-blue_21479a.jpg?imwidth=480&impolicy=resize',
    },
    {
      name: 'Pearl Midnight Black',
      image:
        'https://stimg.cardekho.com/images/car-images/360x240/Maruti/Brezza/9182/1679896941719/221_pearl-midnight-black_000000.jpg?imwidth=480&impolicy=resize',
    },
    {
      name: 'Brave Khaki',
      image:
        'https://stimg.cardekho.com/images/car-images/360x240/Maruti/Brezza/8679/Maruti-Brezza-Lxi/1656651893738/222_brave-khaki_897c5d.jpg?imwidth=480&impolicy=resize',
    },
    {
      name: 'Brave Khaki With Pearl Arctic White',
      image:
        'https://stimg.cardekho.com/images/car-images/360x240/Maruti/Brezza/8679/Maruti-Brezza-Lxi/1656651893738/226_brave-khaki-with-pearl-arctic-white_cbb893.jpg?imwidth=480&impolicy=resize',
    },
    {
      name: 'Magma Gray',
      image:
        'https://stimg.cardekho.com/images/car-images/360x240/Maruti/Brezza/8679/Maruti-Brezza-Lxi/1656651893738/224_magma-gray_717372.jpg?imwidth=480&impolicy=resize',
    },
    {
      name: 'Sizzling Red/Midnight Black',
      image:
        'https://stimg.cardekho.com/images/car-images/360x240/Maruti/Brezza/10387/1718007664943/221_sizzling-red-with-midnight-black-roof_ff8a91.jpg?imwidth=480&impolicy=resize',
    },
  ];

  const carimages = [
    {
      image:
        'https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Brezza/10388/1694424068944/front-left-side-47.jpg',
    },
    {
      image:
        'https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Brezza/10388/1694424068944/rear-left-view-121.jpg',
    },
    {
      image:
        'https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Brezza/10388/1694424068944/grille-97.jpg',
    },
    {
      image:
        'https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Brezza/10388/1694424068944/headlight-43.jpg',
    },
    {
      image:
        'https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Brezza/10388/1694424068944/taillight-44.jpg',
    },
    {
      image:
        'https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Brezza/10388/1694424068944/side-mirror-(body)-93.jpg',
    },
  ];

  useEffect(() => {
    axios
      .get(`http://localhost:5008/api/variants/car/${carId}`)
      .then((data) => {
        console.log('Fetched brands:', data.data.variants);

        setCars(data.data.variants);
      })
      .catch((error) => {
        console.error('Error fetching car data:', error);
      });
  }, [carId]);

  // const handleVariantChange = (fuelType, transtype) => {
  //   setVariant(fuelType);
  //   setVariant(transtype); // Update the selected fuel type
  // };
  const handleVariantChange = (fuelType) => {
    setVariant(fuelType); // Update the selected fuel type
  };

  const handleTransmissionChange = (transmissionType) => {
    setTransmission(transmissionType); // Update the selected transmission type
  };

  const handleComparison = () => {
    if (selectedVariants.length >= 2) {
      setShowModal(true);
    } else {
      alert('Please select at least two variants for comparison.');
    }
  };
  const formatPrice = (price) => {
    const priceInLakhs = price / 100000; // Convert to Lakhs
    return priceInLakhs % 1 === 0
      ? priceInLakhs.toFixed(0)
      : priceInLakhs.toFixed(2); // Round to 2 decimal places
  };

  const filteredVariants = cars.filter((car) => {
    // Ensure car.fuelType and car.transmission are defined before applying the filters
    const fuelTypeMatch =
      variant === 'all-type' ||
      (car.fuelType && car.fuelType.toLowerCase() === variant.toLowerCase());
    const transmissionMatch =
      transmission === 'all' ||
      (car.transmission &&
        car.transmission.toLowerCase() === transmission.toLowerCase());

    return fuelTypeMatch && transmissionMatch; // Filter by both fuel type and transmission
  });

  const navigate = useNavigate();
  const handleNavigation = (
    id,
    variantName,
    fuelType,
    exshowroom,
    rto,
    insurance,
    engine,
    transmission,
    mileage,
    safe,
    power,
    groundc,
    imageurl,
  ) => {
    // const variant = variants[id];
    navigate(`/variant/${id}`, {
      state: {
        variantName,
        fuelType,
        exshowroom,
        rto,
        insurance,
        engine,
        transmission,
        mileage,
        safe,
        power,
        groundc,
        imageurl,
      },
    });
  };

  return (
    <>
      <Nav />
      <div>
        <div className="container my-5">
          <div className="row">
            <div className="col-md-6">
              <div
                className="card"
                style={{
                  borderRadius: '15px',
                  border: '1px solid #ddd',
                  objectFit: 'cover',
                  boxSizing: 'border-box',
                  boxShadow: '0px 2px 7px',
                }}
              >
                <Carousel>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={image}
                      alt={variant.variantName || 'Car image'}
                    />
                  </Carousel.Item>
                </Carousel>
              </div>
            </div>

            <div className="col-md-6">
              <div
                className="card"
                style={{
                  borderRadius: '15px',
                  border: '1px solid #ddd',
                  margin: '10px',
                }}
              >
                <div className="card-body" style={{ margin: '10px' }}>
                  <div className="d-flex justify-content-between">
                    <h3 className="card-title">{title || 'Loading'}</h3>{' '}
                    {/* Accessing the first car in the cars array */}
                    <div className="d-flex ">
                      <FaRegThumbsUp
                        className="mr-2"
                        style={{ cursor: 'pointer' }}
                      />
                      <FaShareAlt style={{ cursor: 'pointer' }} />
                    </div>
                  </div>

                  <div className="star-rating">
                    <span className="text-warning">⭐⭐⭐⭐</span>
                  </div>
                  <br></br>
                  <div>
                    <h5 className="card-subtitle text-bold mb-3">
                      {`₹${formatPrice(minPrice)} - ₹${formatPrice(maxPrice)} *Lakh`}
                    </h5>

                    <button className="btn btn-primary mt-3">
                      Get On Road Price
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12 mt-4" style={{ margin: '15px' }}>
              {/* <div
                className="card"
                style={{ borderRadius: '15px', border: '1px solid #ddd' }}
              >
                <div className="card-body">
                  <h4 className="card-title">{title} specs & features</h4>
                  <div className="mt-4">
                    <div className="tabs">
                      <button
                        onClick={() => setActiveTab('key-specification')}
                        className={`tab-btn ${activeTab === 'key-specification' ? 'active' : ''}`}
                      >
                        Key Specification
                      </button>
                      <button
                        onClick={() => setActiveTab('top-features')}
                        className={`tab-btn ${activeTab === 'top-features' ? 'active' : ''}`}
                      >
                        Top Features
                      </button>
                    </div>

                    <div className="specifications mt-4">
                      <div className="row">
                        <div className="col">
                          {Array.isArray(
                            cars[selectedCar]?.keySpecifications,
                          ) &&
                            cars[selectedCar]?.keySpecifications.map(
                              (item, index) => (
                                <p key={index}>
                                  <strong>{item.label}:</strong> {item.value}
                                </p>
                              ),
                            )}
                        </div>
                        <div className="col">
                          {Array.isArray(variants[selectedCar]?.topFeatures) &&
                            variants[selectedCar]?.topFeatures.map(
                              (item, index) => (
                                <p key={index}>
                                  <strong>{item.label}:</strong> {item.value}
                                </p>
                              ),
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              <br></br>

              <div
                className="card"
                style={{ borderRadius: '15px', border: '1px solid #ddd' }}
              >
                <div className="card-body">
                  <h4 className="card-title">{title} Variants & Prices</h4>

                  <div
                    className="tabs"
                    style={{
                      borderBottom: '1px solid #ddd',
                      paddingBottom: '10px',
                    }}
                  >
                    <button
                      onClick={() => handleVariantChange('all-type')}
                      className={`tab-btn ${variant === 'all-type' ? 'active' : ''}`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => handleVariantChange('petrol')}
                      className={`tab-btn ${variant === 'petrol' ? 'active' : ''}`}
                    >
                      Petrol
                    </button>
                    <button
                      onClick={() => handleVariantChange('cng')}
                      className={`tab-btn ${variant === 'cng' ? 'active' : ''}`}
                    >
                      CNG
                    </button>
                  </div>

                  <div className="transmission-filter mt-3">
                    <label>
                      <input
                        type="radio"
                        value="all"
                        checked={transmission === 'all'}
                        onChange={() => setTransmission('all')}
                      />
                      All
                    </label>
                    <label className="ml-3">
                      <input
                        type="radio"
                        value="Automatic"
                        checked={transmission === 'Automatic'}
                        onChange={() => setTransmission('Automatic')}
                      />
                      Automatic
                    </label>
                    <label className="ml-3">
                      <input
                        type="radio"
                        value="Manual"
                        checked={transmission === 'Manual'}
                        onChange={() => setTransmission('Manual')}
                      />
                      Manual
                    </label>
                  </div>

                  <div className="mt-4">
                    <div className="row">
                      {filteredVariants.map((variant) => (
                        <div className="row mb-3" key={variant.id}>
                          <div className="col">
                            <strong
                              style={{ cursor: 'pointer' }}
                              onClick={() =>
                                handleNavigation(
                                  variant._id,
                                  variant.variantName,
                                  variant.fuelType,
                                  variant.exshowroom,
                                  variant.rto,
                                  variant.insurance,
                                  variant.engine,
                                  variant.transmission,
                                  variant.mileage,
                                  variant.safe,
                                  variant.power,
                                  variant.groundc,
                                  variant.imageurl,
                                )
                              }
                            >
                              {variant.variantName}
                            </strong>
                            <div>
                              <p>Engine: {variant.engine}</p>
                              <p>Fuel: {variant.fuelType}</p>
                              <p>Transmission: {variant.transmission}</p>
                              <p>Mileage: {variant.mileage}</p>
                            </div>
                          </div>
                          <div className="col text-center">
                            <h4>{`₹ ${formatPrice(variant.price)}`} Lakh*</h4>
                            <button className="btn btn-primary mt-3">
                              Get On Road Price
                            </button>
                          </div>
                          <div className="col text-right">
                            <input type="checkbox" />
                            <label>Compare</label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    onClick={handleComparison}
                    className="btn btn-success"
                  >
                    Compare Selected
                  </button>
                </div>
              </div>
            </div>
            <br></br>
            <br />
            <div
              className="card"
              style={{ borderRadius: '15px', border: '1px solid #ddd' }}
            >
              <div className="card-body">
                <h4>{title} Colors</h4>
                <small>
                  {title} is available in the following colours in India. View
                  all car images with different colour options on CarDekho.
                </small>

                <Carousel interval={null}>
                  {[...Array(Math.ceil(carcolor.length / 3))].map((_, idx) => (
                    <Carousel.Item key={idx}>
                      <div className="d-flex justify-content-around">
                        {carcolor
                          .slice(idx * 3, idx * 3 + 3)
                          .map((color, index) => (
                            <Card
                              key={index}
                              style={{
                                width: '30%',
                                margin: '10px',
                                borderRadius: '15px',
                              }}
                            >
                              <Card.Img variant="top" src={color.image} />
                              <Card.Body>
                                <Card.Title>{color.name}</Card.Title>
                              </Card.Body>
                            </Card>
                          ))}
                      </div>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            </div>
            <br />

            <div
              className="card"
              style={{ borderRadius: '15px', border: '1px solid #ddd' }}
            >
              <div className="card-body">
                <h4>{title} Images</h4>
                <small>
                  We have 35 images of {title}, view picture gallery of Brezza
                  which includes exterier, interior & 360° view of SUV car.
                </small>

                {/* Bootstrap Carousel for Image Slider */}
                <Carousel interval={null}>
                  {/* Dividing car colors into groups of 3 for each Carousel item */}
                  {[...Array(Math.ceil(carimages.length / 3))].map((_, idx) => (
                    <Carousel.Item key={idx}>
                      <div className="d-flex justify-content-around">
                        {carimages
                          .slice(idx * 3, idx * 3 + 3)
                          .map((color, index) => (
                            <Card
                              key={index}
                              style={{
                                width: '30%',
                                margin: '10px',
                                borderRadius: '15px',
                              }}
                            >
                              <Card.Img variant="top" src={color.image} />
                            </Card>
                          ))}
                      </div>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Fronx;
