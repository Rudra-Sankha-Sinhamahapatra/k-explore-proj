import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import Cookies from "universal-cookie";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    if (token) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, []);

  return (
    <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-gray-800">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        {logged && (
          <div className="w-full max-w-md p-8  text-white font-bold">
            You have Signed In please Logout
          </div>
        )}
        {!logged && (
          <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
