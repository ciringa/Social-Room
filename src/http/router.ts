import { FastifyInstance } from "fastify";
import { CreateUserControler } from "./controlers/User/createUser";
import { ReturnPostListControler } from "./controlers/Post/PostLists";
import { CreateAPostControler } from "./controlers/Post/createPost";
import { FindUserbyIdControler } from "./controlers/User/finUserById";
import { LoginControler } from "./controlers/User/loginControler";


export async function router(app:FastifyInstance) {
    app.post("/user/create",CreateUserControler)
    app.get("/posts/all/:page",ReturnPostListControler)
    app.post("/posts/create",CreateAPostControler)
    app.get("/users/:UId",FindUserbyIdControler)
    app.patch("/user/login",LoginControler)
}