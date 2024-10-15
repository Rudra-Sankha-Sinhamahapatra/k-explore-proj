
import { useState } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "../components/Footer";

export const PostResource = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [topicSub, setTopicSub] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     const resourceData = {
//       title,
//       description,
//       link,
//       topicSub,
//     };

//     try {
//       const response = await axios.post(`${BACKEND_URL}/api/v1/custom/submitResource`, resourceData);
//       setMessage("Resource submitted for approval!");
//       // Reset the form fields
//       setTitle("");
//       setDescription("");
//       setLink("");
//       setTopicSub("");
//     } catch (error) {
//       console.error("Error submitting resource:", error);
//       setMessage("Failed to submit resource. Please try again.");
//     }
//   };

  return (
    <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-gray-800 text-gray-100 transition-colors duration-500 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow max-w-7xl mx-auto mt-6 p-4">
        <h2 className="text-2xl font-bold mb-4">Submit a Resource for Approval</h2>
        <form className="bg-gray-700 p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-300 mb-1" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg text-black"
              rows={4}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1" htmlFor="link">
              Resource Link
            </label>
            <input
              type="url"
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1" htmlFor="topicSub">
              Topic
            </label>
            <input
              type="text"
              id="topicSub"
              value={topicSub}
              onChange={(e) => setTopicSub(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-lg text-black"
            />
          </div>
          <button
            type="submit"
            className="bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-600 transition duration-300"
          >
            Submit Resource
          </button>
          {/* {message && (
            <div className="mt-4 text-green-400">{message}</div>
          )} */}
        </form>
      </div>
      <Footer />
    </div>
  );
};
