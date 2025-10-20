import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    website: { type: String },
    logoUrl: { type: String },
    testimonial: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model('Client', schema);

