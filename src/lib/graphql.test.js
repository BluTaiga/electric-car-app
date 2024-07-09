import { describe, it, expect, vi, beforeEach } from 'vitest';
import { resolvers } from './graphql'; // Adjust this import path if needed

// Mock the entire db.js module
vi.mock('./db', () => ({
  Car: {
    find: vi.fn(),
  },
  User: {}, // Add this if your resolvers use the User model
  connectDB: vi.fn(), // Add this if your resolvers use the connectDB function
}));

describe('GraphQL Resolvers', () => {
  describe('Query', () => {
    describe('getVehicles', () => {
      beforeEach(() => {
        vi.resetAllMocks();
      })
      it('should return all vehicles', async () => {
        // Arrange
        const mockVehicles = [
          { id: '1', name: 'Test Car 1', price: 30000, batterySize: 60, chargingSpeed: 150, summary: "Foo Bar" },
          { id: '2', name: 'Test Car 2', price: 40000, batterySize: 75, chargingSpeed: 200, summary: "Bar Foo" },
        ];
        const { Car } = await import('./db');
        Car.find.mockResolvedValue(mockVehicles);

        // Act
        const result = await resolvers.Query.getVehicles();

        // Assert
        expect(result).toEqual(mockVehicles);
        expect(Car.find).toHaveBeenCalledTimes(1);
        expect(Car.find).toHaveBeenCalledWith();
      });

      it('should handle errors when fetching vehicles fails', async () => {
        // Arrange
        const errorMessage = 'Database error';
        const { Car } = await import('./db');
        Car.find.mockRejectedValue(new Error(errorMessage));

        // Act & Assert
        await expect(resolvers.Query.getVehicles()).rejects.toThrow(errorMessage);
        expect(Car.find).toHaveBeenCalledTimes(1);
      });
    });
  });
});