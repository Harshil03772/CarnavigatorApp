// // In routes/variant.js (create this file for handling variants)
// const express = require('express');
// const Variant = require('../models/Variant');
// const Car = require('../models/Car');
// const router = express.Router();

// // POST API to add a variant
// router.post('/add-variant', async (req, res) => {
//   const { variantName, keySpecifications, topFeatures, imageUrl, carId } =
//     req.body;

//   if (!variantName || !keySpecifications || !topFeatures || !carId) {
//     return res.status(400).json({ message: 'All fields are required.' });
//   }

//   try {
//     // Check if car exists
//     const car = await Car.findById(carId);
//     if (!car) {
//       return res.status(404).json({ message: 'Car not found.' });
//     }

//     // Create a new variant document
//     const newVariant = new Variant({
//       variantName,
//       keySpecifications,
//       topFeatures,
//       imageUrl,
//       carId, // Attach the carId to associate the variant with the car
//     });

//     // Save the new variant
//     await newVariant.save();

//     // Optionally, add the variant to the car's variants array (if you want to store this on the car as well)
//     car.variants.push(newVariant._id);
//     await car.save();

//     res.json({ message: 'Variant added successfully!' });
//   } catch (err) {
//     console.error('Error adding variant:', err);
//     res
//       .status(500)
//       .json({ message: 'Failed to add variant', error: err.message });
//   }
// });

// module.exports = router;
