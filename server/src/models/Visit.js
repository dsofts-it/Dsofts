import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    vid: { type: String },
    path: { type: String },
    ua: { type: String },
    ip: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Visit', schema);

