import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import {prisma} from "../../../lib/prisma"

export async function CreateUserControler(req:FastifyRequest, res:FastifyReply) {
    const {Email,Name,Password,Description} = z.object({
        Name: z.string(),
        Email: z.string().email(),
        Password: z.string(),
        Description:z.string().optional()
    }).parse(req.body)

    try{
        const response = await prisma.user.create({
            data:{
                Email,Name,Password,Description
            }
        })
        res.status(201).send(response)
    }catch(err){
        res.send(err)       
    }
}