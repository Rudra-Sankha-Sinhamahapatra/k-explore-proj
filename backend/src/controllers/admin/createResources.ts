import { Resource, Topic } from "../../db/db";
import { isValidYouTubeEmbed, isValidYoutubeURL } from "../../utils/isValidUrl";

export const createResources =  async (req: any, res: any) => {
    const { title, type, link, embedLink, description, topicName } = req.body;

    if (!title || !type || !link || !topicName) {
        return res.status(400).json({ message: "Please provide all required fields (title, type, link, topicName)." });
    }

    if(type === 'youtube'){
    console.log("Validating YouTube URL:", link);
    }

    if(type==='youtube'){
    const isValidLink = await isValidYoutubeURL(link);
    if (!isValidLink) {
        return res.status(400).json({ message: "Please provide a valid YouTube link." });
    }
}
    if (embedLink && type !== 'youtube') {
        return res.status(400).json({
            message: "Embed link is only available for resource type 'youtube'."
        });
    }

    if (type === 'youtube' && embedLink) {
        const isEmbeddable = isValidYouTubeEmbed(embedLink);
        console.log(`Embed Link: ${embedLink}, Is Embeddable: ${isEmbeddable}`);

        if (!isEmbeddable) {
            return res.status(400).json({ message: "Please provide a valid YouTube embed link." });
        }
    }

    try {
        const topic = await Topic.findOne({ name: topicName });
        if (!topic) {
            return res.status(404).json({ message: `Topic with name "${topicName}" not found.` });
        }

        const newResource = new Resource({
            title,
            type,
            link,
            description,
            youtubeEmbedLink: embedLink,
            topic: topic._id,
            postedBy: req.userId,
            topicSub:topic.name
        });

        const savedResource = await newResource.save();

        topic.resources.push(savedResource._id);
        await topic.save();

        return res.status(201).json({
            message: "Resource posted successfully",
            resource: savedResource
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error || "Something went wrong."
        });
    }
}