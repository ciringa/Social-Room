import { User } from "@prisma/client";
import { UsersRepositorie } from "../../repositories/UserRepositories";

export class getUserServices {
    constructor(private UserRepositorie:UsersRepositorie){}
    /**
     * Retrieves a user by their unique identifier.
     * @param userId - The unique identifier of the user to be retrieved.
     * @returns A Promise that resolves to the User object if found, or null if not found.
     * @throws Throws an error if the database query fails.
     */
    async ById(userId:string):Promise<User | null> {
        const doesTheUserExists = await this.UserRepositorie.findById(userId);
        if(!doesTheUserExists){
            return null
        }
        return doesTheUserExists
    }
    /**
     * Retrieves a user by their email address.
     * @param Email - The email address of the user to be retrieved.
     * @returns A Promise that resolves to the User object if found, or null if not found.
     * @throws Throws an error if there is an issue with the database query.
     */
    async ByEmail(Email:string):Promise<User | null> {
        const doesTheUserExists = await this.UserRepositorie.findByEmail(Email);
        if(!doesTheUserExists){
            return null
        }
        return doesTheUserExists
    }
}