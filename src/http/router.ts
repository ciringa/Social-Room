import { FastifyInstance } from "fastify";
import { CreateUserControler } from "./controlers/createUser";
import { CreateAPostControler } from "./controlers/createPost";

export async function router(app:FastifyInstance) {
    app.post("/user/create",CreateUserControler)

    app.post("/posts/create",CreateAPostControler)
}