import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Admin/main.css';

const AdminPanel = () => {
  const [brands, setBrands] = useState([]);
  const [name, setName] = useState('');
  const [brandimage, setBrandimage] = useState('');

  const [imageurl, setImageurl] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCar, setSelectedCar] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [variantName, setVariantName] = useState('');
  const [engine, setEngine] = useState('');
  const [type, setType] = useState('');
  const [transmission, setTransmission] = useState('');
  const [trans, setTrans] = useState('');
  const [mileage, setMileage] = useState('');
  const [groundc, setGroundc] = useState('');
  const [price, setPrice] = useState('');
  const [power, setPower] = useState('');
  const [safe, setSafe] = useState('');
  const [keySpecifications, setKeySpecifications] = useState('');
  const [topFeatures, setTopFeatures] = useState('');
  const [carouselImages, setCarouselImages] = useState([]);
  const [exshowroom, setExshowroom] = useState('');
  const [rto, setRto] = useState('');
  const [insurance, setInsurance] = useState('');
  const [cars, setCars] = useState([]);
  const [variant, setVariant] = useState('all-type');
  const [variantImage, setVariantImage] = useState(null);
  const [fuelType, setFuelType] = useState('');

  const [car, setCar] = useState({
    title: '',
    minPrice: '',
    maxPrice: '',
    image: '',
    type: '',
    mileage: '',

    engine: '',
    bhp: '',
    safety: '',

    carColors: [],
  });
  const [loading, setLoading] = useState(false);

  // Fetch Brands from Backend
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get('http://localhost:5008/api/brands');
        setBrands(response.data);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };
    fetchBrands();
  }, []);

  const fetchCars = (brandId) => {
    axios
      .get(`http://localhost:5008/api/cars/brand/${brandId}`)
      .then((response) => {
        setCars(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cars:', error);
      });
  };

  // const handleBrandSubmit = (e) => {
  //   e.preventDefault();
  //   if (!name || !brandimage) {
  //     setErrorMessage('Please fill in all fields.');
  //     return;
  //   }

  //   setLoading(true);
  //   axios
  //     .post('http://localhost:5008/api/add-brand', { name, brandimage })
  //     .then((response) => {
  //       setSuccessMessage('Brand added successfully!');
  //       setName('');
  //       setBrandimage('');
  //       // fetchBrands();
  //       // Instead of calling fetchBrands() here, update the state manually
  //       setBrands((prevBrands) => [...prevBrands, response.data.brand]);
  //     })
  //     .catch((error) => {
  //       console.error(
  //         'Error adding brand:',
  //         error.response?.data || error.message,
  //       );
  //       setErrorMessage('Error adding brand');
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };
  const handleBrandSubmit = (e) => {
    e.preventDefault();
    if (!name || !brandimage) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    setLoading(true);
    axios
      .post('http://localhost:5008/api/add-brand', { name, brandimage })
      .then((response) => {
        setSuccessMessage('Brand added successfully!');
        setName('');
        setBrandimage('');

        setBrands((prevBrands) => [...prevBrands, response.data.brand]);
      })
      .catch((error) => {
        console.error(
          'Error adding brand:',
          error.response?.data || error.message,
        );
        setErrorMessage('Error adding brand');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCarChange = (e) => {
    const { name, value } = e.target;
    setCar({ ...car, [name]: value });
  };

  const handleCarouselImageChange = (e) => {
    const files = e.target.files;
    const fileUrls = Array.from(files).map((file) => URL.createObjectURL(file));
    setCar({ ...car, carouselImages: fileUrls });
  };

  const handleCarColorChange = (e) => {
    const files = e.target.files;
    const fileUrls = Array.from(files).map((file) => URL.createObjectURL(file));
    setCar({ ...car, carColors: fileUrls });
  };

  const handleCarSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBrand) {
      setErrorMessage('Please select a brand for the car.');
      return;
    }
    if (!car.minPrice || !car.maxPrice) {
      setErrorMessage('Please enter valid minPrice and maxPrice.');
      return;
    }

    try {
      setLoading(true);
      const carData = { ...car, brandId: selectedBrand }; // Adding brandId to the car data
      const response = await axios.post(
        'http://localhost:5008/api/add-cars',
        carData,
      );
      setSuccessMessage('Car added successfully!');
      setCar({
        title: '',
        minPrice: '',
        maxPrice: '',
        image: '',
        type: '',
        mileage: '',
        trans: '',
        engine: '',
        bhp: '',
        safety: '',

        carColors: [],
      });
    } catch (error) {
      setErrorMessage('Failed to add car.');
    } finally {
      setLoading(false);
    }
  };

  const handleVariantSubmit = async (e) => {
    e.preventDefault();

    // Log the form values to the console for debugging
    console.log('Variant Data Before Submission:', {
      variantName,
      engine,

      transmission,

      mileage,
      price,

      imageurl,
      carId: selectedCar, // selectedCar is used as carId

      exshowroom,
      rto,
      insurance,
      power,
      groundc,
      safe,
      fuelType,
    });

    // Validate the fields
    if (!selectedCar) {
      setErrorMessage('Please select a car for the variant.');
      return;
    }
    if (
      !variantName ||
      !engine ||
      !transmission ||
      !mileage ||
      !price ||
      !imageurl ||
      !exshowroom ||
      !rto ||
      !insurance ||
      !power ||
      !groundc ||
      !safe ||
      !fuelType
    ) {
      setErrorMessage('Please fill in all fields for the variant.');
      return;
    }

    // Create variant data object with carId
    const variantData = {
      variantName,
      engine,

      transmission,

      mileage,
      price,

      imageurl,
      carId: selectedCar, // Use selectedCar as carId

      exshowroom,
      rto,
      insurance,
      power,
      groundc,
      safe,
      fuelType,
    };

    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:5008/api/add-variant',
        variantData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      setSuccessMessage('Variant added successfully!');
      // Reset form fields after successful submission
      setVariantName('');
      setEngine('');
      setType('');
      setTransmission('');

      setMileage('');
      setPrice('');

      setImageurl('');
      setExshowroom('');
      setRto('');
      setInsurance('');
      setPower('');
      setGroundc('');
      setSafe('');
      setFuelType('');
    } catch (error) {
      setErrorMessage('Failed to add variant.');
    } finally {
      setLoading(false);
    }
  };

  const handleBrandSelect = (e) => {
    const selectedBrand = e.target.value;
    setSelectedCar('');
    fetchCars(selectedBrand);
  };

  return (
    <div className="admin-panel">
      <div className="sidebar">
        <h2>Admin</h2>
        <ul>
          <li>
            <a href="#">Dashboard</a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h2>Add a New Car Brand</h2>

        {successMessage && <p className="success">{successMessage}</p>}
        {errorMessage && <p className="error">{errorMessage}</p>}

        <form onSubmit={handleBrandSubmit}>
          <input
            type="text"
            placeholder="Brand Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            value={brandimage} // Bind the value of the input to the state
            onChange={(e) => setBrandimage(e.target.value)} // Update the state on change
            placeholder="Brand Image URL"
          />

          <button type="submit" disabled={loading}>
            Add Brand
          </button>
        </form>

        <h2>Existing Brands</h2>
        <div className="brand-list">
          {brands.length > 0 ? (
            brands.map((brand) => (
              <div key={brand._id} className="brand-item">
                <img src={brand.brandimage} alt={brand.name} />
                <p>{brand.name}</p>
              </div>
            ))
          ) : (
            <p>No brands found.</p>
          )}
        </div>

        <br />

        {/* Add Car Model for Specific Brand */}
        <div>
          <h2>Add Car Model for Specific Brand</h2>
          <form onSubmit={handleCarSubmit}>
            <select
              name="brand"
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              required
            >
              <option value="">Select a Brand</option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="title"
              value={car.title}
              onChange={handleCarChange}
              placeholder="Car Title"
            />
            <input
              type="text"
              name="minPrice"
              value={car.minPrice}
              onChange={handleCarChange}
              placeholder="Min Price"
            />
            <input
              type="text"
              name="maxPrice"
              value={car.maxPrice}
              onChange={handleCarChange}
              placeholder="Max Price"
            />
            <input
              type="text"
              name="image"
              value={car.image}
              onChange={handleCarChange}
              placeholder="Image URL"
            />
            <input
              type="text"
              name="type"
              value={car.type}
              onChange={handleCarChange}
              placeholder="Fuel Type"
            />
            <input
              type="text"
              name="mileage"
              value={car.mileage}
              onChange={handleCarChange}
              placeholder="Mileage"
            />
            <input
              type="text"
              name="trans"
              value={car.transmission}
              onChange={handleCarChange}
              placeholder="Transmission"
            />
            <input
              type="text"
              name="engine"
              value={car.engine}
              onChange={handleCarChange}
              placeholder="Engine"
            />
            <input
              type="text"
              name="bhp"
              value={car.bhp}
              onChange={handleCarChange}
              placeholder="BHP"
            />
            <input
              type="text"
              name="safety"
              value={car.safety}
              onChange={handleCarChange}
              placeholder="Safety Rating"
            />
            <button type="submit" disabled={loading}>
              Add Car
            </button>
          </form>

          <div className="main-content">
            <h2>Add a New Variant</h2>
            <form onSubmit={handleVariantSubmit}>
              <select name="brand" onChange={handleBrandSelect} required>
                <option value="">Select a Brand</option>
                {brands.map((brand) => (
                  <option key={brand._id} value={brand._id}>
                    {brand.name}
                  </option>
                ))}
              </select>
              <select
                name="car"
                value={selectedCar}
                onChange={(e) => setSelectedCar(e.target.value)}
                required
              >
                <option value="">Select a Car</option>
                {cars.map((car) => (
                  <option key={car._id} value={car._id}>
                    {car.title}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Variant Image URL"
                value={imageurl}
                onChange={(e) => setImageurl(e.target.value)}
              />
              <input
                type="text"
                value={variantName}
                onChange={(e) => setVariantName(e.target.value)}
                placeholder="Variant Name"
              />
              <input
                type="text"
                value={engine}
                onChange={(e) => setEngine(e.target.value)}
                placeholder="Engine Detail"
              />
              <input
                type="text"
                value={power}
                onChange={(e) => setPower(e.target.value)}
                placeholder="Bhp Power"
              />
              <h5>Transmission Type</h5>
              <div className="transmission-type-radio">
                <label>
                  <input
                    type="radio"
                    name="transmission"
                    value="Manual"
                    checked={transmission === 'Manual'}
                    onChange={() => setTransmission('Manual')}
                  />
                  Manual
                </label>
                <label>
                  <input
                    type="radio"
                    name="transmission"
                    value="Automatic"
                    checked={transmission === 'Automatic'}
                    onChange={() => setTransmission('Automatic')}
                  />
                  Automatic
                </label>
              </div>
              <h5>Fuel Type</h5>
              <div className="fuel-type-radio">
                <label>
                  <input
                    type="radio"
                    name="fuelType"
                    value="Petrol"
                    checked={fuelType === 'Petrol'}
                    onChange={() => setFuelType('Petrol')}
                  />
                  Petrol
                </label>
                <label>
                  <input
                    type="radio"
                    name="fuelType"
                    value="Diesel"
                    checked={fuelType === 'Diesel'}
                    onChange={() => setFuelType('Diesel')}
                  />
                  Diesel
                </label>
                <label>
                  <input
                    type="radio"
                    name="fuelType"
                    value="CNG"
                    checked={fuelType === 'CNG'}
                    onChange={() => setFuelType('CNG')}
                  />
                  CNG
                </label>
                <label>
                  <input
                    type="radio"
                    name="fuelType"
                    value="Hybrid"
                    checked={fuelType === 'Hybrid'}
                    onChange={() => setFuelType('Hybrid')}
                  />
                  Hybrid
                </label>
                <label>
                  <input
                    type="radio"
                    name="fuelType"
                    value="Electric"
                    checked={fuelType === 'Electric'}
                    onChange={() => setFuelType('Electric')}
                  />
                  Electric
                </label>
              </div>
              <input
                type="text"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                placeholder="Mileage of car"
              />
              <input
                type="text"
                value={groundc}
                onChange={(e) => setGroundc(e.target.value)}
                placeholder="Ground Clearance of car"
              />
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
              />

              <input
                type="text"
                value={exshowroom}
                onChange={(e) => setExshowroom(e.target.value)}
                placeholder="Exshowroom Price of car"
              />
              <input
                type="text"
                value={rto}
                onChange={(e) => setRto(e.target.value)}
                placeholder="Rto price"
              />
              <input
                type="text"
                value={insurance}
                onChange={(e) => setInsurance(e.target.value)}
                placeholder="Insurance price"
              />
              <input
                type="text"
                value={safe} // Ensure 'safety' is part of your state
                onChange={(e) => setSafe(e.target.value)}
                placeholder="Safety Rating"
              />
              <button type="submit" disabled={loading}>
                Add Variant
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
