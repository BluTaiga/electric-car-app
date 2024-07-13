import { gql } from 'graphql-tag';
import { Car } from './db';

export const typeDefs = gql`
  type Vehicle {
    id: ID!
    name: String!
    price: Float!
    maxRange: Float!
    batterySize: Float!
    chargingSpeed: Float!
    imageName: String
    summary: String
  }
  type Query {
    getVehicles: [Vehicle]
  }
  type Query {
    getVehicle(id: ID!): Vehicle
  }
  type Mutation {
    createVehicle(
      name: String!,
      price: Float!,
      maxRange: Float!,
      batterySize: Float!,
      chargingSpeed: Float!,
      imageName: String,
      summary: String
    ): Vehicle
  }
  type Mutation {
    updateVehicle(
      id: ID!
      name: String,
      price: Float,
      maxRange: Float
      batterySize: Float,
      chargingSpeed: Float,
      imageName: String,
      summary: String
    ): Vehicle
  }
  type Mutation {
    deleteVehicle(id: ID!): Vehicle
  }
`;

export const resolvers = {
  Query: {
    getVehicles: async () => {
      return await Car.find();
    },
    getVehicle: async (_, { id }, context  ) => {
      const vehicle = await Car.findById(id);
      if (!vehicle) {
        throw new Error('Vehicle not found');
      }
      return vehicle;
    }
  },
  Mutation: {
    createVehicle: async (_, { name, price, maxRange, batterySize, chargingSpeed, imageName, summary }, context) => {
      console.log('Resolver context:', context); // Debug log
      if (!context.authenticated || !context.user || context.user.role !== 'admin') {
        console.log('Not authorized - Auth:', context.authenticated, 'User:', context.user); // Debug log
        throw new Error('Not authorized');
      }
      const newCar = new Car({ name, price, maxRange, batterySize, chargingSpeed, imageName, summary });
      return await newCar.save();
    },
    updateVehicle: async (_, { id, name, price, maxRange, batterySize, chargingSpeed, imageName, summary }, context) => {
      console.log('Resolver context:', context); //Debug log
      if (!context.authenticated || !context.user || context.user.role !== 'admin') {
        console.log('Not authorized - Auth:', context.authenticated, 'User:', context.user); // Debug log
        throw new Error('Not authorized');
      }

      try {
        const updatedCar = await Car.findByIdAndUpdate(
          id,
          { name, price, maxRange, batterySize, chargingSpeed, imageName, summary },
          { new: true, runValidators: true }
        );

        if (!updatedCar) {
          throw new Error('Vehicle not found');
        }

        return updatedCar;
      } catch (error) {
        console.error('Error updating vehicle:', error);
        throw new Error('Failed to update vehicle')
      }
    },
    deleteVehicle: async (_, { id }, context) => {
      // Check authentication and authorization
      if (!context.authenticated || !context.user || context.user.role !== 'admin') {
        throw new Error('Not authorized to delete vehicles');
      }
    
      try {
        const deletedVehicle = await Car.findByIdAndDelete(id);
        if (!deletedVehicle) {
          throw new Error('Vehicle not found');
        }
        console.log('Vehicle with ID:', id, 'deleted successfully');
        return deletedVehicle; // Return the deleted vehicle
      } catch (error) {
        console.error('Error deleting vehicle:', error);
        throw new Error('Failed to delete vehicle: ' + error.message);
      }
    }
  }
};