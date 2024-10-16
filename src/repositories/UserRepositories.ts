import { Prisma, User } from "@prisma/client";

export interface UsersRepositorie{
    create(data:Prisma.UserCreateInput):Promise<User>
    findById(Id:string):Promise<User | null>;
    findByEmail(Email:string):Promise<User | null>
}