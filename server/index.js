import express from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import postRoute from "./routes/post/post.routes.js";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
const app = express();
dotenv.config();


//vì ta dùng type:"module" nên nodejs không có __dirname hay __filename
//nên ta phải trải qua một số bước để tự tạo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors({
    origin: '*',
}));

app.use(express.static(__dirname+"/public/"));

app.use(express.json())
app.use(express.urlencoded({extended:false}));

const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT;

app.use((req,res,next)=>{
    req["__dirname"] = __dirname;
    next();
})

app.use("/posts",postRoute);





mongoose.connect(MONGODB_URL,{useNewUrlParser:true,useUnifiedTopology:true},(error)=>{
    if(!error){
        app.listen(PORT,()=>{
            console.log("Connected "+PORT);
        })
    }
    else{
        console.log("Try to connect again")
    }
});





