// const express = require('express');
// const mongoose = require('mongoose');
// const Car = require('./models/Car'); // Your Car model

// const app = express();
// app.use(express.json()); // To parse JSON request body

// // Route to add a new car
// app.post('/api/cars', async (req, res) => {
//   const { title, price, image, type, mileage, trans, engine, bhp, safety } =
//     req.body;

//   if (
//     !title ||
//     !price ||
//     !image ||
//     !type ||
//     !mileage ||
//     !trans ||
//     !engine ||
//     !bhp ||
//     !safety
//   ) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//     const newCar = new Car({
//       title,
//       price,
//       image,
//       type,
//       mileage,
//       trans,
//       engine,
//       bhp,
//       safety,
//     });

//     await newCar.save();
//     return res.status(201).json({ message: 'Car added successfully!' });
//   } catch (error) {
//     console.error('Error adding car:', error);
//     return res.status(500).json({ message: 'Failed to add car' });
//   }
// });

// // Connect to MongoDB and start server
// mongoose
//   .connect('mongodb://localhost:27017/carDekho', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log('MongoDB connected');
//     app.listen(5008, () => {
//       console.log('Server running on port 5008');
//     });
//   })
//   .catch((err) => {
//     console.error('MongoDB connection error:', err);
//   });
