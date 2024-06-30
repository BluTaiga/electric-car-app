import mongoose from 'mongoose';
import dontenv from 'dotenv';

dontenv.config();

const uri = process.env.MONGODB_URI;

const connectDB = async () => {
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in the environment variables');
  }

  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(uri);
      console.log('MongoDB Atlas connected');
    } catch (err) {
      console.error('MongoDB Atlas connection error:', err);
      process.exit(1);
    }
  }
};

const CarSchema = new mongoose.Schema({
  name: String,
  price: Number,
  batterySize: Number,
  chargingSpeed: Number,
  imageName: String,
  summary: String
});

export const Car = mongoose.models.Car || mongoose.model('Car', CarSchema);

export { connectDB };