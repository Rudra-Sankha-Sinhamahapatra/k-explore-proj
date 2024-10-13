import { Topic } from "../../db/db";
import { isValidURL } from "../../utils/isValidUrl";

export const createTopic = async (req:any, res:any) => {
    const { name, description,imageUrl } = req.body;
  
    const topicExist = await Topic.findOne({
     name: name
    })
  
    const valid = isValidURL(imageUrl);
    if(!valid){
      return res.status(400).json({
          message:"Please provide a valid image url"
      })
    }
  
    if(topicExist) {
      return res.status(411).json({
          message:"Topic already exists"
      })
    }
    // Validate input data
    if (!name || !description || !imageUrl) {
      return res.status(400).json({
        message: "Please provide both name,description,imageUrl for the topic."
      });
    }
  
    try {
      // Create a new topic
      const newTopic = new Topic({
        name,
        description,
        imageUrl
      });
  
      // Save the topic to the database
      const savedTopic = await newTopic.save();
  
      return res.status(201).json({
        message: "Topic created successfully",
        topic: savedTopic
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal server error",
        error: error
      });
    }
  }