import { Prisma, User } from "@prisma/client";
import { UsersRepositorie } from "../../repositories/PrismaUserRepositories";
    /**
     * Creates a new user after validating that the provided email address is not already in use.
     * 
     * @method execute runs the service
     */
export class CreateUserUseCase {
    constructor(private userRepositorie:UsersRepositorie){}
    /**
     * Creates a new user after validating that the provided email address is not already in use.
     * 
     * @param data - The user data required for creation, adhering to Prisma.UserCreateInput structure.
     * @returns A Promise that resolves to the created User object.
     * @throws Error if the email address is already in use.
     */
    async execute(data:Prisma.UserCreateInput):Promise<User>{
        const doesTheEmailAdressIsAlreadyInUse = await this.userRepositorie.findByEmail(data.Email)
        if(doesTheEmailAdressIsAlreadyInUse){
            throw new Error("Email Adress is already in use");
        }

        return await this.userRepositorie.create(data);
    }
}