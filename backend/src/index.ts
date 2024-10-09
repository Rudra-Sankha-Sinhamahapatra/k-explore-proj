import express from "express"
import cors from "cors"
import { router as Rootrouter } from "./routes";
import mongoose from "mongoose";
import { MONGODB_URL } from "./config/config";


const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;

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