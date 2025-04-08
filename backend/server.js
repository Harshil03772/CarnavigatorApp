const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { Brand, Car } = require('./models/Car');
const { Variant } = require('./models/Variant');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect('mongodb://localhost:27017/carDekho')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.get('/api/brands', async (req, res) => {
  try {
    const brands = await Brand.find();

    res.json(brands);
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Error fetching brands', error });
  }
});

app.post('/api/add-brand', async (req, res) => {
  const { name, brandimage } = req.body;

  if (!name || !brandimage) {
    return res
      .status(400)
      .json({ success: false, message: 'All fields are required' });
  }

  try {
    // Check if the brand already exists
    const existingBrand = await Brand.findOne({ name: name });

    if (existingBrand) {
      return res
        .status(400)
        .json({ success: false, message: 'Brand already exists' });
    }

    const newBrand = new Brand({
      name,
      brandimage,
      link: `/cars/${name.replace(/\s+/g, '')}`,
    });

    await newBrand.save();
    res.json({ success: true, brand: newBrand });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Error adding brand', error });
  }
});

// POST API to add car details
app.post('/api/add-cars', async (req, res) => {
  const {
    title,
    minPrice,
    maxPrice,
    image,
    type,
    mileage,
    trans,
    engine,
    bhp,
    safety,
    brandId,
  } = req.body;

  if (!minPrice || !maxPrice) {
    return res.status(400).json({ message: 'Price fields are required.' });
  }

  try {
    // Check if brand exists
    const brand = await Brand.findById(brandId);
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found.' });
    }

    // Create a new car document
    const newCar = new Car({
      title,
      minPrice,
      maxPrice,
      image,
      type,
      mileage,
      trans,
      engine,
      bhp,
      safety,
      brandId, // Attach the brandId
    });

    // Save the new car
    await newCar.save();

    // Optionally, add the car to the brand's cars array
    // Here we assume the Brand model has a cars field to store associated cars
    brand.cars.push(newCar._id);
    await brand.save();

    res.json({ message: 'Car added successfully!' });
  } catch (err) {
    console.error('Error adding car:', err);
    res.status(500).json({ message: 'Failed to add car', error: err.message });
  }
});

// POST API to add a variant
app.post('/api/add-variant', async (req, res) => {
  const {
    variantName,
    engine,
    fuelType,
    transmission,
    mileage,
    price,

    carId,

    exshowroom,
    rto,
    insurance,
    safe,
    groundc,
    power,
    imageurl,
  } = req.body;

  try {
    // Fetch the car from the database using carId
    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Create the new variant
    const newVariant = new Variant({
      variantName,
      engine,
      fuelType,
      transmission,
      mileage,
      price,

      imageurl,
      carId, // Associate the variant with carId

      exshowroom,
      rto,
      insurance,
      safe,
      groundc,
      power,
    });

    await newVariant.save();

    // Optionally, you can add the variant to the car's variant list if needed
    car.variants.push(newVariant._id);
    await car.save();

    res.status(200).json({ message: 'Variant added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding variant' });
  }
});

// In your Express server:
app.get('/api/variants/car/:carId', async (req, res) => {
  try {
    const carId = req.params.carId;

    // Check if carId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(carId)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid carId provided.' });
    }

    const variants = await Variant.find({
      carId: new mongoose.Types.ObjectId(carId),
    });

    if (variants.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: 'No variants found for this car.' });
    }

    res.json({ success: true, variants });
  } catch (error) {
    console.error('Error fetching variants:', error);
    res
      .status(500)
      .json({ success: false, message: 'Error fetching variants' });
  }
});

app.get('/api/cars/brand/:brandId', async (req, res) => {
  try {
    const brandId = req.params.brandId;
    const cars = await Car.find({
      brandId: new mongoose.Types.ObjectId(brandId),
    });

    res.json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching cars' });
  }
});

const PORT = 5008;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
