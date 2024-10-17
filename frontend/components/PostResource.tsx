import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "./Navbar";
import { Footer } from "../components/Footer";
import { topics } from "./utils/topics";
import { BACKEND_URL } from "../src/config";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

export const PostResource = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [topicName, settopicName] = useState(topics[1]);
  const [type, setType] = useState("");
  const [logged, setLogged] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    if (token) {
      setLogged(true);
    } else {
      setLogged(false);
      navigate("/signin");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();


    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/reqResource`,
        {
          title,
          description,
          link,
          topicName,
          type,
        },
        {
          withCredentials:true
        }
      );
      if (response.status === 201) {
        toast.success("Resource submitted successfully for approval!");
        setTimeout(() => {
          navigate("/");
        }, 3200);

        setTitle("");
        setDescription("");
        setLink("");
        settopicName(topics[0]);
        setType("");
      }
    } catch (error) {
      console.error("Error submitting resource:", error);
    }
  };

  const filteredTopics = topics.filter((topic) => topic !== "All");

  return (
    <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-gray-800 transition-colors duration-500 min-h-screen flex flex-col">
      <Navbar />
      {logged && (
        <div className="flex-grow max-w-3xl mx-auto mt-6 p-4 mb-2">
        <ToastContainer
        position="top-center"
        autoClose={4000}
        closeOnClick
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
          <h2 className="text-2xl font-bold mb-4 text-white">
            Submit a Resource for Approval
          </h2>
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg"
          >
            <div className="mb-4">
              <label
                className="block text-gray-800 mb-1 font-semibold"
                htmlFor="title"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-800 mb-1 font-semibold"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={4}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-800 mb-1 font-semibold"
                htmlFor="link"
              >
                Resource Link
              </label>
              <input
                type="url"
                id="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-800 mb-1 font-semibold"
                htmlFor="type"
              >
                Type of Resource
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="" disabled>
                  Select type of resource
                </option>
                <option value="pdf">PDF</option>
                <option value="blog">Blog</option>
                <option value="youtube">YouTube</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-800 mb-1 font-semibold"
                htmlFor="topicName"
              >
                Topic
              </label>
              <select
                id="topicName"
                value={topicName}
                onChange={(e) => settopicName(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {filteredTopics.map((topic, index) => (
                  <option key={index} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-purple-500 text-white w-full p-3 rounded-lg hover:bg-purple-600 transition duration-300"
            >
              Submit Resource
            </button>
          </form>
        </div>
      )}
      {!logged && (
        <div className="flex justify-center items-center">
          Please login to use this feature
        </div>
      )}
      <Footer />
    </div>
  );
};
