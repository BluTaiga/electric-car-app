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
    }
  }
};