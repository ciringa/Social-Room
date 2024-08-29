import fastify from "fastify";
import { router } from "../http/router";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import { JWT_SUPERSECRET } from "./dotenv";
import fastifyCookie from "@fastify/cookie";
export const app = fastify()


app.register(fastifyJwt,{
    secret:JWT_SUPERSECRET
})
app.register(fastifyCookie,{})
app.register(cors,{
    origin: true, // Permite todas as origens. Para restringir, você pode especificar uma URL, como 'http://localhost:3000'
    methods: ['GET', 'POST', 'PUT', 'DELETE', "PATCH"], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
    credentials: true // Permite o envio de cookies e headers de autorização entre o frontend e o backend
})
app.register(router)
