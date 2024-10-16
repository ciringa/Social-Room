import { Posts, Prisma } from "@prisma/client";

export interface postsRepositorie{
    create(data:Prisma.PostsUncheckedCreateInput):Promise<Posts>
    
    findById(Id:string):Promise<Posts | null>;
    findByUser(UserId:string):Promise<Posts[] | null>
    
    updatePost(PostId:string, data:Partial<Posts>):Promise<Posts>
    deletePosts(PostId:string):Promise<Posts>

}