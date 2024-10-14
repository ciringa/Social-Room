import { Prisma, User } from "@prisma/client";
import { UsersRepositorie } from "../PrismaUserRepositories";
import { prisma } from "../../lib/prisma";
import { create } from "domain";

export class PrismaUserRepositorie implements UsersRepositorie{
     /**
     * Creates a new user in the database using the provided data.
     * @param data - The user data to be created, adhering to Prisma.UserCreateInput structure.
     * @returns A promise that resolves to the created user object.
     * @throws Throws an error if the user creation fails due to validation or database issues.
     */
    async create(data: Prisma.UserCreateInput){
        const ps = await prisma.user.create({
            data
        });
        return ps
    }
    /**
     * Retrieves a user from the database by their email address.
     * 
     * @param Email - The email address of the user to find.
     * @returns A promise that resolves to the user object if found, or null if not.
     * @throws Throws an error if the database query fails.
     */
    async findByEmail(Email: string){
        const ps = await prisma.user.findUnique({
            where:{
                Email
            }
        });
        return ps;
    }
     /**
     * Retrieves a user by their unique identifier.
     * @param Id - The unique identifier of the user to be retrieved.
     * @returns A promise that resolves to the user object or null if not found.
     * @throws Throws an error if the database query fails.
     */
    async findById(Id: string){
        const ps = await prisma.user.findUnique({
            where:{
                Id
            }
        });
        return ps;
    }
}