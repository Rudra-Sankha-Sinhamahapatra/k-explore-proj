import { Resource, Topic } from "../../db/db";
import { getResources } from "../../zod"

export const fetchByTopic = async(req:any,res:any) => {
    const {success,error} = getResources.safeParse(req.body);

    if(!success) {
        return res.status(411).json({
            message:"Invalid Input"
        })
    }

    try {
     const {topic} = req.body;

     if(!topic) {
        return res.status(404).json({
            message:"Please write a topic"
        })
     }

     const topicExists = await Topic.findOne({name:topic});

     if(!topicExists) {
        return res.status(404).json({
            message:"Topic doesn't exists"
        })
     }

     const getByTopic = await Resource.find({topicSub:topic});

     if(!getByTopic) {
        return res.status(204).json({
            message:"Empty Resources"
        })
     }

     return res.status(200).json({
        message:"Resources fetched by topic",
        Resources: getByTopic
     })
    }
    catch (error:any) {
        return res.status(500).json({
            message:"Server Error"
        })
    }
}