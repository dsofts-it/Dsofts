import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    contactName: { type: String, required: true },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String },
    projectType: { type: String, enum: ['website', 'android', 'mlm', 'local-shop', 'other'], required: true },
    selections: { type: Object, default: {} },
    notes: { type: String },
    estimatedPrice: { type: Number, default: 0 },
    status: { type: String, enum: ['new', 'contacted', 'quoted', 'won', 'lost'], default: 'new' }
  },
  { timestamps: true }
);

export default mongoose.model('ProjectInquiry', schema);

