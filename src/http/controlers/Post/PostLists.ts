import { FastifyReply, FastifyRequest } from "fastify";
import {prisma} from "../../../lib/prisma"
import { number, z } from "zod";

export async function ReturnPostListControler(req:FastifyRequest, res:FastifyReply) {
    var {page} = z.object({
        page:z.string()
    }).parse(req.params)
    var Page = Number(page)
    try{
        const postList = await prisma.posts.findMany({
            take:Page*20,
            skip:(Page-1)*20
        })
        res.status(200).send(postList)
    }catch(err){
        console.log(err)
    }
}