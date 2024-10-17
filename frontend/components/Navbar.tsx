import { Link } from "react-router-dom";
import { Mobilenav } from "../components/Mobilenav";
import Cookies from "universal-cookie";
import { useCallback, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Navbar = () => {
  const [loggedIn, setLoggedin] = useState(false);

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    console.log("Token:", token);
    setLoggedin(!!token);
  }, []);

  const logout = useCallback(async () => {
    try {
      const cookies = new Cookies();
      toast.success("Logged out Successfully!");
      cookies.remove("token");

      setTimeout(() => {
        window.location.reload();
      }, 3200);
    } catch (error) {
      toast.error("Logout Failed", {
        autoClose: 2000,
      });
      console.error(error);
    }
  }, []);

  return (
    <header className="backdrop-blur-md bg-white/30 dark:bg-gray-900/30 border-b border-gray-200 dark:border-gray-700 w-full sticky top-0 z-50 transition-all duration-300 p-6 shadow-md">
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

        {!loggedIn && (
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
        )}

        {loggedIn && (
          <div className="flex items-center space-x-4">
            <button
              className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-150"
              onClick={logout}
            >
              Log Out
            </button>
          </div>
        )}

        <Mobilenav loggedIn={loggedIn} />
      </nav>
    </header>
  );
};
