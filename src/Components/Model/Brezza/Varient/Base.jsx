import { useState, React } from 'react';
import Nav from '../../../Nav';
import { Carousel, Card } from 'react-bootstrap';
import { FaRegThumbsUp, FaShareAlt } from 'react-icons/fa';
import '../../../../CSS/model.css';
import Footer from '../../../Footer';
import { useLocation, useParams } from 'react-router-dom';

const Base = (props) => {
  const [activeTab, setActiveTab] = useState('keySpecification');
  const [transmission, setTransmission] = useState('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [downPayment, setDownPayment] = useState(100000);
  const [loanAmount, setLoanAmount] = useState(0);
  const [tenure, setTenure] = useState(60);
  const [interestRate, setInterestRate] = useState(8);
  const [emi, setEmi] = useState(null);
  const { state } = useLocation();
  const location = useLocation();
  console.log(location.state);
  const {
    variantName,
    exshowroom,
    rto,
    insurance,
    title,
    fuelType,
    engine,
    mileage,
    safe,
    power,
    groundc,
    imageurl,
  } = location.state || {};
  console.log(state);

  // const { id } = useParams();

  const variant = useParams();

  // const carPrice =
  //   (parseFloat(exshowroom) || 0) +
  //   (parseFloat(rto) || 0) +
  //   (parseFloat(insurance) || 0);

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

  const specifications = {
    'key-specification': {
      firstColumn: [
        { label: 'Engine', value: '1462cc' },
        { label: 'Torque', value: '121.5 Nm - 136.8 Nm' },
        { label: 'Transmission', value: 'Manual/Automatic' },
      ],
      secondColumn: [
        { label: 'Power', value: '86.63 - 101.64 bhp' },
        { label: 'Seating Capacity', value: '5' },
        { label: 'Fuel', value: 'Petrol/CNG' },
      ],
    },
    'top-features': {
      firstColumn: [
        { label: 'Engine', value: '100cc' },
        { label: 'Torque', value: '12 Nm - 136.8 Nm' },
        { label: 'Transmission', value: 'Manual/Automatic' },
      ],
      features: [
        'Rear AC Vents',
        'Advanced Internet Features',
        'Cruise Control',
        'Height Adjustable Driver Seat',
      ],
    },
    'stand-out-features': {
      firstColumn: [
        { label: 'Engine', value: '1462cc' },
        { label: 'Torque', value: '121.5 Nm - 136.8 Nm' },
        { label: 'Transmission', value: 'Manual/Automatic' },
      ],
      secondColumn: [
        { label: 'Power', value: '86.63-101.64bhp' },
        { label: 'Seating Capacity', value: '7' },
        { label: 'Fuel', value: 'Petrol/CNG' },
      ],
    },
  };

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

  const calculateEMI = () => {
    let principal = loanAmount || carPrice - downPayment;
    let rate = interestRate / 12 / 100;
    let time = tenure;
    let emiValue =
      (principal * rate * Math.pow(1 + rate, time)) /
      (Math.pow(1 + rate, time) - 1);
    setEmi(emiValue.toFixed(2));
  };

  const formattedPrice = (price) => {
    const priceInLakhs = price / 100000;
    return `₹ ${priceInLakhs.toFixed(2)} Lakh*`; // Display price in lakhs with 2 decimal places
  };

  const carPrice =
    (parseFloat(exshowroom) || 0) +
    (parseFloat(rto) || 0) +
    (parseFloat(insurance) || 0);

  // On Road Price calculation
  const onRoadPrice =
    (parseFloat(exshowroom) || 0) +
    (parseFloat(rto) || 0) +
    (parseFloat(insurance) || 0);

  return (
    <>
      <Nav />
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
                    src={imageurl}
                    alt="First slide"
                  />
                </Carousel.Item>
              </Carousel>
            </div>
          </div>

          <div className="col-md-6">
            <div
              className="card"
              style={{ borderRadius: '15px', border: '1px solid #ddd' }}
            >
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h3 className="card-title">{variantName}</h3>
                  <div className="d-flex ">
                    <FaRegThumbsUp
                      className="mr-2"
                      style={{ cursor: 'pointer' }}
                    />
                    <FaShareAlt style={{ cursor: 'pointer' }} />
                  </div>
                </div>
                <br></br>
                <div className="star-rating">
                  <span className="text-warning">⭐⭐⭐⭐⭐</span>
                </div>
                <br></br>
                <div>
                  <h5 className="card-subtitle text-bold mb-3">
                    {formattedPrice(exshowroom)}
                  </h5>

                  <button
                    className="btn btn-secondary mt-3 ml-3"
                    onClick={() => setIsModalOpen(true)}
                  >
                    EMI Calculator
                  </button>
                </div>
              </div>

              {isModalOpen && (
                <div
                  className=""
                  style={{
                    display: 'flex',
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',

                    zIndex: '1',
                  }}
                  onClick={() => setIsModalOpen(false)}
                >
                  <div
                    className="modal-content"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      backgroundColor: 'white',
                      padding: '20px',
                      borderRadius: '15px',
                      border: '1px solid #ddd',
                      width: '400px',
                      zIndex: '',
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h4>Choose your EMI options</h4>

                    {/* Down Payment Input */}
                    <div>
                      <label>Down Payment</label>
                      <input
                        type="number"
                        value={downPayment}
                        onChange={(e) => setDownPayment(Number(e.target.value))}
                        className="form-control"
                      />
                    </div>

                    {/* Loan Amount Calculation */}
                    <div>
                      <label>Loan Amount</label>
                      <input
                        type="number"
                        value={loanAmount || carPrice - downPayment}
                        disabled
                        className="form-control"
                      />
                    </div>

                    {/* Tenure Input */}
                    <div>
                      <label>Tenure (Months)</label>
                      <input
                        type="number"
                        value={tenure}
                        onChange={(e) => setTenure(Number(e.target.value))}
                        className="form-control"
                      />
                    </div>

                    {/* Interest Rate Input */}
                    <div>
                      <label>Interest Rate (%)</label>
                      <input
                        type="number"
                        value={interestRate}
                        onChange={(e) =>
                          setInterestRate(Number(e.target.value))
                        }
                        className="form-control"
                      />
                    </div>

                    {/* EMI Calculation and Result */}
                    <button
                      className="btn btn-primary mt-3"
                      onClick={calculateEMI}
                    >
                      Calculate EMI
                    </button>

                    {emi && (
                      <div className="mt-3">
                        <h5>
                          EMI per month : ₹
                          {parseFloat(emi).toLocaleString('en-IN')}
                        </h5>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <br></br>
          <div className="col-md-12 mt-4">
            <div
              className="card"
              style={{ borderRadius: '15px', border: '1px solid #ddd' }}
            >
              <div className="card-body">
                <h4 className="card-title">{variantName} specs & features</h4>
                <div className="mt-4">
                  <div className="tabs">
                    <button
                      onClick={() => setActiveTab('keySpecification')}
                      className={`tab-btn ${activeTab === 'keySpecification' ? 'active' : ''}`}
                    >
                      Key Specification
                    </button>
                    <button
                      onClick={() => setActiveTab('topFeatures')}
                      className={`tab-btn ${activeTab === 'topFeatures' ? 'active' : ''}`}
                    >
                      Top Features
                    </button>
                  </div>

                  <div className="specifications mt-4">
                    <div className="row">
                      {activeTab === 'keySpecification' && (
                        <>
                          <div className="col">
                            <div className="spec-item">
                              <strong>Engine:</strong>
                              <span>{engine || 'Not available'} cc</span>
                            </div>
                            <div className="spec-item">
                              <strong>Bhp:</strong>
                              <span>{power || 'Not available'}</span>
                            </div>
                            <div className="spec-item">
                              <strong>Fuel:</strong>
                              <span>{fuelType || 'Not available'}</span>
                            </div>
                            <div className="spec-item">
                              <strong>Safety:</strong>
                              <span>{safe || 'Not available'} Star</span>
                            </div>
                          </div>
                          <div className="col">
                            <div className="spec-item">
                              <strong>Ground Clearance:</strong>
                              <span>{groundc || 'Not available'} mm</span>
                            </div>
                            <div className="spec-item">
                              <strong>Transmission:</strong>
                              <span>
                                {transmission && transmission !== 'all'
                                  ? transmission
                                  : 'Not available'}
                              </span>
                            </div>

                            <div className="spec-item">
                              <strong>Mileage:</strong>
                              <span>{mileage || 'Not available'} Km/L</span>
                            </div>
                          </div>
                        </>
                      )}
                      {activeTab === 'topFeatures' && (
                        <div className="col">
                          <ul>
                            {variant.features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br></br>
            <div
              className="card"
              style={{ borderRadius: '15px', border: '1px solid #ddd' }}
            >
              <div className="card-body">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <h4 className="card-title">
                    {variantName || 'Not Available'}
                  </h4>
                  <h6>{fuelType || 'Not Available'}</h6>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '60px',
                  }}
                >
                  <h6>Ex Showroom Price:</h6>
                  <h6>
                    ₹ {(parseFloat(exshowroom) || 0).toLocaleString('en-IN')}
                  </h6>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '20px',
                  }}
                >
                  <h6>RTO:</h6>
                  <h6>₹ {(parseFloat(rto) || 0).toLocaleString('en-IN')}</h6>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '20px',
                  }}
                >
                  <h6>Insurance:</h6>
                  <h6>
                    ₹ {(parseFloat(insurance) || 0).toLocaleString('en-IN')}
                  </h6>
                </div>
                <hr></hr>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '20px',
                  }}
                >
                  <h6>On Road Price :</h6>
                  <h6>
                    ₹ {(parseFloat(onRoadPrice) || 0).toLocaleString('en-IN')}
                  </h6>
                </div>
              </div>
            </div>
            <br></br>

            <div
              className="card"
              style={{ borderRadius: '15px', border: '1px solid #ddd' }}
            >
              <div className="card-body">
                <h4>Maruti Brezza Images</h4>
                <small>
                  We have 35 images of Maruti Brezza, view picture gallery of
                  Brezza which includes exterier, interior & 360° view of SUV
                  car.
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

export default Base;
