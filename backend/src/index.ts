import express from "express"
import cors from "cors"
import { router as Rootrouter } from "./routes";
import mongoose from "mongoose";
import { FRONTEND_URL, MONGODB_URL } from "./config/config";
import cookieParser from "cookie-parser"

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials:true,
  origin: FRONTEND_URL || "http://localhost:5173"
}));

const PORT = 3000;

app.get('/',(req:any,res:any)=>{
  return res.status(200).json({
      msg:"Hello World"
  })
})

app.use("/api/v1",Rootrouter);

async function main() {
    if(!MONGODB_URL || MONGODB_URL==null){
      return console.log("No mongo db url");
    }
    await mongoose.connect(MONGODB_URL);
    app.listen(PORT,()=>{
        console.log(`Server running on Port ${PORT}`);
    })
}

main();