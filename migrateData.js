import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Configure dotenv to read environment variables
dotenv.config();

// Convert ES module __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uri = process.env.MONGODB_URI;

// Define the Car schema
const CarSchema = new mongoose.Schema({
  name: String,
  price: Number,
  batterySize: Number,
  chargingSpeed: Number,
  imageName: String,
  summary: String
});

const Car = mongoose.model('Car', CarSchema);

// Function to connect to MongoDB and insert data
const migrateData = async () => {
  try {
    await mongoose.connect(uri); // Removed deprecated options
    console.log('MongoDB connected');

    // Read cars.json file
    const filePath = path.join(__dirname, 'src', 'lib', 'data', 'cars.json');
    const carsData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Insert data into MongoDB
    await Car.insertMany(carsData);
    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
};

migrateData();
