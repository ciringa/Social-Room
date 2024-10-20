
// Unit tests for: ById


import { User } from "@prisma/client";
import { getUserServices } from '../GetUserService';



// Mock interface for UsersRepositorie
class MockUsersRepositorie {
  public findById = jest.fn();
}

describe('getUserServices.ById() ById method', () => {
  let mockUsersRepositorie: MockUsersRepositorie;
  let userService: getUserServices;

  beforeEach(() => {
    mockUsersRepositorie = new MockUsersRepositorie();
    userService = new getUserServices(mockUsersRepositorie as any);
  });

  describe('Happy Path', () => {
    it('should return a user when the user exists', async () => {
      // Arrange: Set up the mock to return a user
      const mockUser: User = { id: '1', email: 'test@example.com', name: 'Test User' } as any;
      mockUsersRepositorie.findById.mockResolvedValue(mockUser as any as never);

      // Act: Call the ById method
      const result = await userService.ById('1');

      // Assert: Verify the result is the expected user
      expect(result).toEqual(mockUser);
      expect(mockUsersRepositorie.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('Edge Cases', () => {
    it('should return null when the user does not exist', async () => {
      // Arrange: Set up the mock to return null
      mockUsersRepositorie.findById.mockResolvedValue(null as any as never);

      // Act: Call the ById method
      const result = await userService.ById('non-existent-id');

      // Assert: Verify the result is null
      expect(result).toBeNull();
      expect(mockUsersRepositorie.findById).toHaveBeenCalledWith('non-existent-id');
    });

    it('should handle an empty userId gracefully', async () => {
      // Arrange: Set up the mock to return null
      mockUsersRepositorie.findById.mockResolvedValue(null as any as never);

      // Act: Call the ById method with an empty string
      const result = await userService.ById('');

      // Assert: Verify the result is null
      expect(result).toBeNull();
      expect(mockUsersRepositorie.findById).toHaveBeenCalledWith('');
    });

    it('should handle a null userId gracefully', async () => {
      // Arrange: Set up the mock to return null
      mockUsersRepositorie.findById.mockResolvedValue(null as any as never);

      // Act: Call the ById method with null
      const result = await userService.ById(null as any);

      // Assert: Verify the result is null
      expect(result).toBeNull();
      expect(mockUsersRepositorie.findById).toHaveBeenCalledWith(null);
    });
  });
});

// End of unit tests for: ById
