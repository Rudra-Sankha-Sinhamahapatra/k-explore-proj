import express from 'express'
import cors from 'cors'

const app = express();
app.use(express.json());

app.use(cors());

app.get("/test",async(req:any,res:any)=>{
    return res.status(200).json({
        message:"Hello World"
    })
})

app.listen(3000);