import { connectDB, Car } from '$lib/db.js';

export async function load() {
  try {
    await connectDB();
    const cars = await Car.find().lean();
    return { cars: JSON.parse(JSON.stringify(cars)) };
  } catch (error) {
    console.error('Error loading cars:', error);
    return { cars: [] };
  }
}