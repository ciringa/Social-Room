import "dotenv/config"
import { env } from "process"
import { z } from "zod"

export const {HOST,NODE_ENV,PORT} = z.object({
    PORT:z.string(),
    HOST:z.string(),
    NODE_ENV:z.enum(["DEV","TEST","DEPLOY"])
}).parse(env)