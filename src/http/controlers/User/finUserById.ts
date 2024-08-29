import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import {prisma} from "../../../lib/prisma"


export async function FindUserbyIdControler(req:FastifyRequest,res:FastifyReply) {
    const {UId} = z.object({
        UId:z.string().uuid()
    }).parse(req.params)
    try{
        const loadres = await prisma.user.findUnique({
            where:{
                Id:UId
            }
        })
        res.status(200).send(loadres)
    }catch(err){
        res.send(err)
    }
}