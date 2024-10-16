
// Unit tests for: execute
import { Prisma } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { EntityErrors } from "../Errors/Entity.Errors";
import { CreatePostService } from "./CreatePostService";


// Mock interfaces
interface MockCreatePostServiceRequest {
  data: Prisma.PostsUncheckedCreateInput;
}

interface MockpostsRepositorie {
  findById: jest.Mock;
}

interface MockUsersRepositorie {
  findById: jest.Mock;
}

describe('CreatePostService.execute() execute method', () => {
  let mockPostRepositorie: MockpostsRepositorie;
  let mockUserRepositorie: MockUsersRepositorie;
  let createPostService: CreatePostService;

  beforeEach(() => {
    mockPostRepositorie = {
      findById: jest.fn(),
    };

    mockUserRepositorie = {
      findById: jest.fn(),
    };

    createPostService = new CreatePostService(
      mockPostRepositorie as any,
      mockUserRepositorie as any
    );
  });

  describe("Happy Path", () => {
    it("should create a post successfully when the user exists", async () => {
      // Arrange
      const mockRequest: MockCreatePostServiceRequest = {
        data: {
          ownerId: "valid-user-id",
          Title: "Test Post",
          Content: "This is a test post",
          Slug:""
        },
      };

      mockUserRepositorie.findById.mockResolvedValue(true as any);
      jest.spyOn(prisma.posts, "create").mockResolvedValue({
        id: "post-id",
        ownerId: "valid-user-id",
        title: "Test Post",
        content: "This is a test post",
      } as any);

      // Act
      const response = await createPostService.execute(mockRequest as any);

      // Assert
      expect(response.createdObject).toEqual({
        id: "post-id",
        ownerId: "valid-user-id",
        title: "Test Post",
        content: "This is a test post",
      });
      expect(mockUserRepositorie.findById).toHaveBeenCalledWith("valid-user-id");
      expect(prisma.posts.create).toHaveBeenCalledWith({ data: mockRequest.data });
    });
  });

  describe("Edge Cases", () => {
    it("should throw an error when the user does not exist", async () => {
      // Arrange
      const mockRequest: MockCreatePostServiceRequest = {
        data: {
          ownerId: "invalid-user-id",
          Title: "Test Post",
          Content: "This is a test post",
          Slug:""
        },
      };

      mockUserRepositorie.findById.mockResolvedValue(false as any);

      // Act & Assert
      await expect(createPostService.execute(mockRequest as any)).rejects.toThrow(
        new EntityErrors("Posts", "create", "owner user does not exists")
      );
      expect(mockUserRepositorie.findById).toHaveBeenCalledWith("invalid-user-id");
    });

    it("should handle prisma create errors gracefully", async () => {
      // Arrange
      const mockRequest: MockCreatePostServiceRequest = {
        data: {
          ownerId: "valid-user-id",
          Title: "Test Post",
          Content: "This is a test post",
          Slug:""
        },
      };

      mockUserRepositorie.findById.mockResolvedValue(true as any);
      jest.spyOn(prisma.posts, "create").mockRejectedValue(new Error("Prisma error") as never);

      // Act & Assert
      await expect(createPostService.execute(mockRequest as any)).rejects.toThrow("Prisma error");
      expect(mockUserRepositorie.findById).toHaveBeenCalledWith("valid-user-id");
      expect(prisma.posts.create).toHaveBeenCalledWith({ data: mockRequest.data });
    });
  });
});

// End of unit tests for: execute
