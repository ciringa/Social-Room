import { Posts, Prisma } from "@prisma/client";
import { postsRepositorie } from "../PostsRepositorie";
import { randomUUID } from "crypto";

export class InMemoryPostsRepositorie implements postsRepositorie{
    public items:Posts[] = [];
    async create(data: Prisma.PostsUncheckedCreateInput){
        const _data:Posts = {
            Content:String(data.Content),
            Id:randomUUID(),
            Likes:0,
            Title:String(data.Title),
            ImageUrl:data.ImageUrl?null:String(data.ImageUrl),
            ownerId:String(data.ownerId),
            Slug:String(data.Title+data.Content),
        }
        this.items.push(_data)
        return _data

    }
    async deletePosts(PostId: string){
        const index = this.items.findIndex(item => item.Id == PostId);
        const deleted = this.items[index]
        this.items.slice(index)
        return deleted
    }
    async findById(Id: string){
        const _item = this.items.find(item => item.Id == Id);
        return _item?_item:null;
    }
    async findByUser(UserId: string){
        const _item = this.items.filter(item => item.Id == UserId);
        return _item[0]?_item:null;  
    }
    async updatePost(PostId: string, data: Partial<Posts>){
        const Pid = this.items.findIndex(item => item.Id == PostId);
        const oldBoy = this.items[Pid];
        this.items[Pid] = {
            Content:data.Content?data.Content:oldBoy.Content,
            Id:oldBoy.Id,ImageUrl:oldBoy.ImageUrl,Likes:oldBoy.Likes,
            ownerId:oldBoy.ownerId,
            Title:data.Title?data.Title:oldBoy.Title,
            Slug:oldBoy.Slug // regenerates the slud addess
        }
        return this.items[Pid];
    }

}