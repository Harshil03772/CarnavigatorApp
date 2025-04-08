const mongoose = require('mongoose');
const { SiTransmission } = require('react-icons/si');
const Schema = mongoose.Schema;

const variantSchema = new Schema({
  carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand', // Optionally link to the Brand model
  },
  variantName: { type: String, required: true },
  engine: { type: String, requried: true },
  bhp: { type: String, requried: true },
  fuelType: { type: String, requried: true },
  groundc: { type: String, requried: true },
  trans: { type: String, requried: true },
  mileage: { type: String, requried: true },
  price: { type: String, required: true },
  // keySpecifications: { type: String, required: true },
  // topFeatures: { type: String, required: true },
  imageurl: { type: String, required: true },
  // carouselImages: [String],
  exshowroom: { type: String, required: true },
  rto: { type: String, required: true },
  insurance: { type: String, required: true },
  safe: { type: String, required: true },
  power: { type: String, required: true },
  imageurl: { type: String, required: true },
  transmission: { type: String, required: true },
});

const Variant = mongoose.model('Variant', variantSchema);

module.exports = { Variant };
