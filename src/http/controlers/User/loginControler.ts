import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../../lib/prisma";


export async function LoginControler(req:FastifyRequest,res:FastifyReply) {
    const {Email,Password} = z.object({
        Email:z.string().email(),
        Password:z.string()
    }).parse(req.body)
    try{
        const fp = await prisma.user.findUnique({
            where:{Email,}
        })
        if(fp){
            const Token = await res.jwtSign({},{
                sign:{
                    sub:fp?.Id
                }
            })
            if(fp?.Password==Password){
                res.setCookie("UserAuthorization",Token,{
                    maxAge:1000*60*60*24//um dia
                })
                res.status(200).send({
                    Description:"successfully loggedIn",
                    Token 
                })
            }else{
                res.redirect("https://http.cat/401")
                res.status(401).send({Description:"Wrong Password"})
            }
        }else{
            res.status(400).send({
                Description:"user not found"
            })
            res.redirect("https://http.cat/401")
        }
    }catch(err){
        console.log(err)
    }
}