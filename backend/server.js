import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js"
import connectDB from "./db/config.js"
import cors from "cors"
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

app.use(cors())
app.use(express.json());

app.use("/api/users",userRoutes)

app.use("/",(req,res)=>{
    res.send("Hello World")
})

app.listen(port,()=>{
    connectDB()
    console.log(`Server is connected to PORT: ${port}`)
})