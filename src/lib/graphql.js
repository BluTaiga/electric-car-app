import { gql } from 'graphql-tag';
import { Car } from './db';

export const typeDefs = gql`
  type Vehicle {
    id: ID!
    name: String!
    price: Float!
    batterySize: Float!
    chargingSpeed: Float!
    imageName: String
    summary: String
  }
  type Query {
    vehicles: [Vehicle]
  }
  type Mutation {
    createVehicle(
      name: String!,
      price: Float!,
      batterySize: Float!,
      chargingSpeed: Float!,
      imageName: String,
      summary: String
    ): Vehicle
  }
  type Mutation{
    updateVehicle(
      name: String!,
      price: Float!,
      batterySize: Float!,
      chargingSpeed: Float!,
      imageName: String,
      summary: String
    ): Vehicle
  }
`;

export const resolvers = {
  Query: {
    vehicles: async () => {
      return await Car.find();
    },
  },
  Mutation: {
    createVehicle: async (_, { name, price, batterySize, chargingSpeed, imageName, summary }, context) => {
      console.log('Resolver context:', context); // Debug log
      if (!context.authenticated || !context.user || context.user.role !== 'admin') {
        console.log('Not authorized - Auth:', context.authenticated, 'User:', context.user); // Debug log
        throw new Error('Not authorized');
      }
      const newCar = new Car({ name, price, batterySize, chargingSpeed, imageName, summary });
      return await newCar.save();
    },
    updateVehicle: async (_, { _id, name, price, batterySize, chargingSpeed, imageName, summary }, context) => {
      console.log('Resolver context:', context); //Debug log
      if (!context.authenticated || !context.user || context.user.role !== 'admin') {
        console.log('Not authorized - Auth:', context.authenticated, 'User:', context.user); // Debug log
        throw new Error('Not authorized');
      }

      try {
        const updateCar = await Car.findByIdAndUpdate(
          _id,
          { name, price, batterySize, chargingSpeed, imageName, summary },
          { new: true }
        );

        if (!updatedCar) {
          throw new Error('Vehicle not found');
        }

        return updatedCard;
      } catch (error) {
        console.error('Error updating vehicle:', error);
        throw new Error('Failed to update vehicle')
      }
    }
  }
};