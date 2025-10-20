import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    orderId: { type: String },
    paymentId: { type: String },
    signature: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    status: { type: String, enum: ['created', 'paid', 'failed'], default: 'created' },
    payload: { type: Object }
  },
  { timestamps: true }
);

export default mongoose.model('Payment', schema);

