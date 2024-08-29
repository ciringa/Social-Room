import "dotenv/config"
import { env } from "process"
import { z } from "zod"

export const {HOST,NODE_ENV,PORT,JWT_SUPERSECRET} = z.object({
    PORT:z.string(),
    HOST:z.string(),
    NODE_ENV:z.enum(["DEV","TEST","DEPLOY"]),
    JWT_SUPERSECRET:z.string()
}).parse(env)