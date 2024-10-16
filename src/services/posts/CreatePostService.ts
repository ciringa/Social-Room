import { Posts, Prisma } from "@prisma/client";
import { postsRepositorie } from "../../repositories/PostsRepositorie";
import { UsersRepositorie } from "../../repositories/UserRepositories";
import { EntityErrors } from "../Errors/Entity.Errors";
import { prisma } from "../../lib/prisma";

interface CreatePostServiceResponse{
    createdObject:Posts
}
interface CreatePostServiceRequest{
    data:Prisma.PostsUncheckedCreateInput,
}

/**
 * Creates a new post in the database after validating the owner's existence.
 * @param {CreatePostServiceRequest} data - The request object containing post data and ownerId.
 * @returns {Promise<CreatePostServiceResponse>} A promise that resolves to the created post object.
 * @throws {EntityErrors} If the owner user does not exist.
 */
export class CreatePostService{
    constructor(private _postRepositorie:postsRepositorie,private _userRepositorie:UsersRepositorie){}
    async execute({data}:CreatePostServiceRequest):Promise<CreatePostServiceResponse>{
        const doesTheUserExists = await this._userRepositorie.findById(data.ownerId);
        if(!doesTheUserExists){
            throw new EntityErrors("Posts", "create", "owner user does not exists")
        }
        const createdObject = await prisma.posts.create({
            data
        })
        return{
            createdObject
        }
    }
}