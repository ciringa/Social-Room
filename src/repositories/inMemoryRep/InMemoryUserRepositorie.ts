import { Prisma, User } from "@prisma/client";
import { UsersRepositorie } from "../UserRepositories";
import { randomUUID } from "crypto";
import { string } from "zod";

/**
 * In Memory User repositorie, implements UsersRepositorie
 * creates a local memory variable called itemList and pops values inside it
 * @method create
 * @method findByEmail
 * @method findById
 */
export class inMemoryUserRepositorie implements UsersRepositorie{
    public itemList:User[] = [];
    
    /**
     * Creates a new user object and adds it to the item list.
     * @param data - The user data to create, adhering to Prisma.UserCreateInput structure.
     * @returns A promise that resolves to the created User object.
     * @throws Throws an error if the data is invalid or if the item list cannot be modified.
    */
    async create(data: Prisma.UserCreateInput){
        const _data:User = {
            Email:String(data.Email),
            Name:String(data.Name),
            Password:String(data.Password),
            Description:data.Description?String(data.Description):null,
            Id:randomUUID(),
            BannerUrl:data.BannerUrl?String(data.BannerUrl):null,
            ProfileUrl:data.ProfileUrl?String(data.ProfileUrl):null,
        }
        this.itemList.push(_data)

        return _data
    }

    /**
     * Asynchronously finds an item in the itemList by its email address.
     * @param Email - The email address to search for in the itemList.
     * @returns The found item if it exists, otherwise null.
     * @throws No exceptions are thrown by this function.
    */
    async findByEmail(Email: string) {
        const item = this.itemList.find(item => item.Email == Email);
        return item?item:null
    }
    /**
     * Asynchronously retrieves an item from the itemList by its unique identifier.
     * @param Id - The unique identifier of the item to be retrieved.
     * @returns The item if found; otherwise, null.
     * @throws No exceptions are thrown by this function.
     */
    async findById(Id: string) {
        const item = this.itemList.find(item => item.Id == Id);
        return item?item:null
    }

}