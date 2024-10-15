import { Link } from 'react-router-dom';
import {Mobilenav} from "../components/Mobilenav"

export const Navbar = () => {
  return (
    <header className="backdrop-blur-md bg-white/30 dark:bg-gray-900/30 border-b border-gray-200 dark:border-gray-700 w-full sticky top-0 z-50 transition-all duration-300 p-6 shadow-md">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-white text-2xl font-semibold">Resourcify</h1>
          <div className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="text-white font-medium hover:text-yellow-300 transition duration-150"
            >
              Home
            </Link>
            <Link
              to="/post"
              className="text-white font-medium hover:text-yellow-300 transition duration-150"
            >
              Post
            </Link>
            <Link
              to="/resources"
              className="text-white font-medium hover:text-yellow-300 transition duration-150"
            >
              Resources
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            to="/signin"
            className="text-white font-medium hover:text-yellow-300 transition duration-150"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-150"
          >
            Sign Up
          </Link>
        </div>
        <Mobilenav/>
      </nav>
    </header>
  );
};

