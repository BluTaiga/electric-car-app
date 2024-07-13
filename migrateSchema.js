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
  maxRange: Number,
  batterySize: Number,
  chargingSpeed: Number,
  imageName: String,
  summary: String
});

const Car = mongoose.model('Car', CarSchema);

// Function to connect to MongoDB and insert data
const migrateSchema = async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB Connected');
    // Update the existing documents with the new maxRange field
    await Car.updateMany(
      { maxRange: { $exists: false } }, // Find documents where maxRange field doesn't exist
      { $set: { maxRange: 0 } } // Set maxRange to 0 for those documents
    );
    console.log('Documents updated successfully');
  } catch (error) {
      console.error('Error:', error);
  } finally {
      mongoose.connection.close();
  }
}

migrateSchema();
