import mongoose from 'mongoose';

const planetSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  orderFromSun: { type: Number, required: true },
  hasRings: { type: Boolean, required: true },
  mainAtmosphere: { type: [String], default: [] },
  surfaceTemperatureC: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    mean: { type: Number, required: true }
  }
});

const Planet = mongoose.model('Planet', planetSchema, 'planets'); // 'planets' its the name of the collection in MongoDB

export default Planet;