import mongoose from 'mongoose';
import dontenv from 'dotenv';
import bcrypt from 'bcrypt';

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
  maxRange: Number,
  batterySize: Number,
  chargingSpeed: Number,
  imageName: String,
  summary: String
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }
});

UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const Car = mongoose.models.Car || mongoose.model('Car', CarSchema);
export const User = mongoose.models.User || mongoose.model('User', UserSchema);
export { connectDB };