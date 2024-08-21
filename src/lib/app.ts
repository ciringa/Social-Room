import fastify from "fastify";
import { router } from "../http/router";

export const app = fastify()

app.register(router)