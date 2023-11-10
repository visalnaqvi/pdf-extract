import express from "express"
import bodyParser from "body-parser";
import cors from "cors"
import userRouter from "./features/users/users.routes.js";
import connection from './config/mongoose.js';
import uploadRouter from "./features/upload/upload.route.js";
const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.get("/ping",(req,res)=>res.send("Hi"));

app.use("/files",express.static("files"))


app.use("/users",userRouter)

app.use("/upload",uploadRouter)


app.listen(process.env.PORT || 3500,()=>{
    console.log("listning")
})