import {Resource} from "./utils/resource"

interface Props {
    resource : Resource;
}

export const ResourceCard = ({resource}:Props) => {
    return    <div
    className="bg-gray-800 shadow-lg rounded-lg overflow-hidden transition transform hover:scale-105 hover:shadow-xl"
  >
    <div className="p-4">
      <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
        {resource.title}
      </h2>
      <p className="text-gray-300 mt-2">{resource.description}</p>
      <a
        href={resource.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-yellow-400 mt-4 inline-block hover:underline"
      >
        View Resource
      </a>
      <span className="ml-3 inline-block bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full mt-3">
        {resource.topicSub}
      </span>
    </div>
  </div>
}