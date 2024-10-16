import { FastifyInstance } from "fastify";
import { CreateUserControler } from "./controlers/User/createUser";
import { ReturnPostListControler } from "./controlers/Post/PostLists";
import { CreateAPostControler } from "./controlers/Post/createPost";
import { FindUserbyIdControler } from "./controlers/User/finUserById";
import { LoginControler } from "./controlers/User/loginControler";
import { VerifyJWT } from "./midlewares/VerifyJwt";

export async function router(app:FastifyInstance) {
    app.post("/user/create",CreateUserControler)
    app.get("/posts/all/:page",ReturnPostListControler)
    app.post("/posts/create",{
        preHandler:[VerifyJWT]
    },CreateAPostControler)
    app.get("/user/:UId",FindUserbyIdControler)
    app.patch("/user/login",LoginControler)
}