import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";

export async function CreateAPostControler(req:FastifyRequest, res:FastifyReply) {
    const {Content,Slug,ownerId,Title} = z.object({
        Content:z.string(),
        Title:z.string().optional(),
        Slug:z.string(),
        ownerId:z.string().uuid()
    }).parse(req.body)

    try{
        const response = await prisma.posts.create({
            data:{
                Content,Slug,ownerId,Title
            }
        })
        res.status(201).send(response)
    }catch(err){
        res.send(err)       
    }
}