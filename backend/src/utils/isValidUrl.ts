
import axios from 'axios';

export const isValidURL = (url: string) => {
    const regex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=%]*)?$/;
    return regex.test(url);
  };

  export async function isValidYoutubeURL(url: string) {
    try {
        const { hostname } = new URL(url);
        if (!['youtube.com', 'www.youtube.com','youtu.be'].includes(hostname)) {
            console.log("Invalid hostname:", hostname); // Log invalid hostname
            return false;
        }

        // Check for video ID or playlist ID in the URL
        const videoIdPattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|watch|watch\?.*v=)|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const playlistIdPattern = /(?:list=)([a-zA-Z0-9_-]+)/; // Playlist ID pattern

        if (!videoIdPattern.test(url) && !playlistIdPattern.test(url)) {
            console.log("Invalid YouTube URL format:", url); // Log invalid URL format
            return false;
        }

        const oembedURL = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
        const response = await axios.get(oembedURL);
        
        return response.status === 200;
    } catch (error) {
        console.error("Error validating YouTube URL:", error); // Log the error
        return false; // Handle any error or 404 case
    }
}


  
  export function isValidYouTubeEmbed(url:string) {
    const embedPattern = /^https:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]{11})(\?.*)?$/;
    return embedPattern.test(url);
  }
  
  const url = "https://www.youtube.com/watch?v=bFW2vP4mAt0";

isValidYoutubeURL(url).then(isValid => {
    if (isValid) {
        console.log("Valid YouTube URL.");
    } else {
        console.log("Invalid YouTube URL.");
    }
});
