import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    key: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    description: { type: String },
    active: { type: Boolean, default: true },
    priceFrom: { type: Number, default: 0 },
    icon: { type: String },
    category: { type: String, default: 'general' }
  },
  { timestamps: true }
);

export default mongoose.model('Service', schema);

