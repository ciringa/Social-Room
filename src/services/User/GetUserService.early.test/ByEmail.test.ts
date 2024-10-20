
// Unit tests for: ByEmail


import { User } from "@prisma/client";
import { getUserServices } from '../GetUserService';



// Mock interface for UsersRepositorie
class MockUsersRepositorie {
  public findByEmail = jest.fn();
}

describe('getUserServices.ByEmail() ByEmail method', () => {
  let mockUsersRepositorie: MockUsersRepositorie;
  let userService: getUserServices;

  beforeEach(() => {
    mockUsersRepositorie = new MockUsersRepositorie();
    userService = new getUserServices(mockUsersRepositorie as any);
  });

  describe('Happy Path', () => {
    it('should return a user when a valid email is provided', async () => {
      // Arrange
      const mockUser: User = { id: '1', email: 'test@example.com', name: 'Test User' } as any;
      mockUsersRepositorie.findByEmail.mockResolvedValue(mockUser as any as never);

      // Act
      const result = await userService.ByEmail('test@example.com');

      // Assert
      expect(result).toEqual(mockUser);
      expect(mockUsersRepositorie.findByEmail).toHaveBeenCalledWith('test@example.com');
    });
  });

  describe('Edge Cases', () => {
    it('should return null when no user is found for the given email', async () => {
      // Arrange
      mockUsersRepositorie.findByEmail.mockResolvedValue(null as any as never);

      // Act
      const result = await userService.ByEmail('nonexistent@example.com');

      // Assert
      expect(result).toBeNull();
      expect(mockUsersRepositorie.findByEmail).toHaveBeenCalledWith('nonexistent@example.com');
    });

    it('should handle an empty email string gracefully', async () => {
      // Arrange
      mockUsersRepositorie.findByEmail.mockResolvedValue(null as any as never);

      // Act
      const result = await userService.ByEmail('');

      // Assert
      expect(result).toBeNull();
      expect(mockUsersRepositorie.findByEmail).toHaveBeenCalledWith('');
    });

    it('should handle a malformed email string gracefully', async () => {
      // Arrange
      mockUsersRepositorie.findByEmail.mockResolvedValue(null as any as never);

      // Act
      const result = await userService.ByEmail('invalid-email');

      // Assert
      expect(result).toBeNull();
      expect(mockUsersRepositorie.findByEmail).toHaveBeenCalledWith('invalid-email');
    });
  });
});

// End of unit tests for: ByEmail
