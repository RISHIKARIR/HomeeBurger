import express from "express"
import pool from "./db.js";
import Authroutes from './routes/auth.route.js'
import cookieParser  from "cookie-parser";
import cors from "cors";
import { router } from "./routes/videos.route.js";



const app = express();

app.use(express.static("public"));

const port = 3000;


app.use(
    cors({
        origin : "http://localhost:5173",
        credentials : true
    })

)

app.use(express.json());
app.use(cookieParser());

app.use("/api",router)

app.use('/auth/api',Authroutes);





pool.connect().then(()=>{
    console.log("Postgres is connected");
}).catch((err)=>{
    console.log(err,"Error occurred");
})

app.listen(port,()=>{
    console.log(`${port} is listening`);
})