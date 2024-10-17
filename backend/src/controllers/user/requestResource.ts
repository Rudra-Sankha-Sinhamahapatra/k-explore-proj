import { PendingResource, Topic } from "../../db/db";
import { isValidYoutubeURL } from "../../utils/isValidUrl";

export const requestResource =  async (req: any, res: any) => {
    const { title, type, link,  description, topicName } = req.body;

    if (!title || !type || !link || !topicName) {
        return res.status(400).json({ message: "Please provide all required fields (title, type, link, topicName)." });
    }

    if(type==='youtube'){
    const isValidLink = await isValidYoutubeURL(link);
    if (!isValidLink) {
        return res.status(400).json({ message: "Please provide a valid YouTube link." });
    }
}

    try {
        const topic = await Topic.findOne({ name: topicName });
        if (!topic) {
            return res.status(404).json({ message: `Topic with name "${topicName}" not found.` });
        }

        const newResource = new PendingResource({
            title,
            type,
            link,
            description,
            topic: topic._id,
            submittedBy: req.userId,
            topicSub:topic.name,
            createdAt:Date.now()
        });

        const savedResource = await newResource.save();

        return res.status(201).json({
            message: "Resource Sent to admins for verification successfully",
            resource: savedResource
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error || "Something went wrong."
        });
    }
}