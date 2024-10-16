import { Prisma, Posts } from "@prisma/client";
import { postsRepositorie } from "../PostsRepositorie";
import { prisma } from "../../lib/prisma";

export class PrismaPostsRepositorie implements postsRepositorie{
    
    /**
     * Creates a new post in the database using the provided data.
     * @param data - The input data for creating a post, adhering to Prisma.PostsCreateInput structure.
     * @returns A promise that resolves to the created post object.
     * @throws Throws an error if the post creation fails due to validation or database issues.
     */
    async create(data: Prisma.PostsUncheckedCreateInput){
        return await prisma.posts.create({
            data
        })
    }
    /**
     * Retrieves a unique post from the database by its ID.
     * @param Id - The unique identifier of the post to be retrieved.
     * @returns A promise that resolves to the post object or null if not found.
     * @throws Throws an error if the database query fails.
     */
    async findById(Id: string){
        return await prisma.posts.findUnique({
            where:{
                Id
            }
        })
    }
    /**
     * Retrieves all posts associated with a specific user by their UserId.
     * 
     * @param UserId - The unique identifier of the user whose posts are to be retrieved.
     * @returns A promise that resolves to an array of posts owned by the user.
     * @throws Throws an error if the database query fails.
     */
    async findByUser(UserId: string){
        return await prisma.posts.findMany({
            where:{
                ownerId:UserId
            }
        })
    }
    /**
     * Deletes a post from the database by its ID.
     * @param PostId - The unique identifier of the post to be deleted.
     * @returns A promise that resolves to the deleted post object.
     * @throws Throws an error if the post with the specified ID does not exist.
     */
    async deletePosts(PostId: string){
        return await prisma.posts.delete({
            where:{
                Id:PostId
            }
        })
    }

    /**
     * Updates a post in the database with the given data.
     * @param PostId - The unique identifier of the post to be updated.
     * @param data - An object containing the fields to update in the post.
     * @returns A promise that resolves to the updated post.
     * @throws Throws an error if the post with the specified PostId does not exist or if the update fails.
     */
    async updatePost(PostId: string, data: Partial<Posts>){
        return await prisma.posts.update({
            where:{
                Id:PostId
            },
            data
        })
    }
}