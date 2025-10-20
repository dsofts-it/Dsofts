import mongoose from 'mongoose';

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/dsofts';

mongoose
  .connect(uri, {
    autoIndex: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err.message));

export default mongoose;

