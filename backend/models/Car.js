const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Car Schema
const carSchema = new Schema({
  title: { type: String, required: true },
  minPrice: { type: Number, required: true },
  maxPrice: { type: Number, required: true },
  image: { type: String, required: true },
  type: { type: String, required: true },
  mileage: { type: String, required: true },
  trans: { type: String, required: true },
  engine: { type: String, required: true },
  bhp: { type: String, required: true },
  safety: { type: String, required: true },
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
    required: true,
  },
  variants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Variant' }], // Adding variants reference
});

const Car = mongoose.model('Car', carSchema);

// Brand Schema
const brandSchema = new Schema({
  name: { type: String, required: true },
  brandimage: { type: String, required: true },
  link: { type: String, required: true },
  cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }], // Associating cars with brands
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = { Brand, Car };
