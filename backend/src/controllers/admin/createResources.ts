import { Resource, Topic } from "../../db/db";
import { isValidYouTubeEmbed, isValidYoutubeURL } from "../../utils/isValidUrl";

export const createResources =  async (req: any, res: any) => {
    const { title, type, link, embedLink, description, topicName } = req.body;

    // Validate required fields
    if (!title || !type || !link || !topicName) {
        return res.status(400).json({ message: "Please provide all required fields (title, type, link, topicName)." });
    }

    // Log the link being validated
    console.log("Validating YouTube URL:", link);

    // Validate the YouTube link
    const isValidLink = await isValidYoutubeURL(link);
    if (!isValidLink) {
        return res.status(400).json({ message: "Please provide a valid YouTube link." });
    }

    // Check if embedLink is provided and type is not 'youtube'
    if (embedLink && type !== 'youtube') {
        return res.status(400).json({
            message: "Embed link is only available for resource type 'youtube'."
        });
    }

    // Validate the YouTube embed link if the type is 'youtube'
    if (type === 'youtube' && embedLink) {
        const isEmbeddable = isValidYouTubeEmbed(embedLink);
        console.log(`Embed Link: ${embedLink}, Is Embeddable: ${isEmbeddable}`);

        if (!isEmbeddable) {
            return res.status(400).json({ message: "Please provide a valid YouTube embed link." });
        }
    }

    try {
        // Find the topic by name
        const topic = await Topic.findOne({ name: topicName });
        if (!topic) {
            return res.status(404).json({ message: `Topic with name "${topicName}" not found.` });
        }

        // Create a new resource
        const newResource = new Resource({
            title,
            type,
            link,
            description,
            youtubeEmbedLink: embedLink,
            topic: topic._id,
            postedBy: req.userId
        });

        // Save the resource
        const savedResource = await newResource.save();

        // Add the resource to the topic's resources array
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