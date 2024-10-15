import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../src/config";
import { Navbar } from "./Navbar";
import { Footer } from "../components/Footer";
import {topics} from "./utils/topics"
import {Resource} from "./utils/resource"
import {ResourceCard} from "./ResourceCard"

export const Resources = () => {
  const [resources, setResources] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/custom/getAllResources`); 
        setResources(response.data.Resources);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };
    fetchResources();
  }, []);

  const filteredResources = resources.filter((resource: Resource) => {
    const matchesTopic =
      selectedTopic === "All" || resource.topicSub === selectedTopic;
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTopic && matchesSearch;
  });

  return (
    <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-gray-800 text-gray-100 transition-colors duration-500 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto mt-6 p-4">
          <input
            type="text"
            placeholder="Search for resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-black p-2 border border-gray-300 rounded-lg shadow-sm"
          />
        </div>

        {/* Topic Filter Dropdown */}
        <div className="max-w-7xl text-gray-900 mx-auto mt-4 p-4">
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
          >
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
        
        <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource: Resource, index: number) => (
             <ResourceCard resource={resource} key={index}/>
            ))
          ) : (
            <div className="flex text-center justify-center items-center w-full h-full">
              <h2 className="text-2xl font-bold text-white">Coming Soon</h2>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
