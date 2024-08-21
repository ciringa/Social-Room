import { number } from "zod";
import { app } from "./lib/app";
import { HOST, PORT } from "./lib/dotenv";

const port = Number(PORT) 
const host = HOST

app.listen({
    port,
    host,
},(err,path)=>{
    console.log(err||path)
})
