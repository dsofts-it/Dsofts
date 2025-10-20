import mongoose from 'mongoose';

const schema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    token: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },
    used: { type: Boolean, default: false }
  },
  { timestamps: true }
);

schema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model('PasswordResetToken', schema);

