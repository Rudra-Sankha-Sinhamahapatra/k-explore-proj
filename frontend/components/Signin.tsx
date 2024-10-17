import React, { useCallback, useState } from "react";
import AuthLayout from "../components/AuthLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";
import { BACKEND_URL } from "../src/config";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignin = useCallback(async () => {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        const cookies = new Cookies();
        toast.success("Signed In Successfully!");

        cookies.set("token", res.data.token, {
          path: "/",
          httpOnly: false,
          maxAge: 30 * 24 * 60 * 60,
        });
        console.log(cookies.get("token"));
        setTimeout(() => {
          navigate("/");
        }, 3200);
      } else {
        toast.error("Sign in failed");
        setError(res.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || "Signin failed");
      } else {
        setError("Signin failed");
      }

      console.error(error);
    }
  }, [email, password, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSignin();
  };

  return (
    <AuthLayout>
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
      <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
        >
          Sign In
        </button>
        <p>
          Don't Have an Account?{" "}
          <span
            className="text-purple-500 cursor-pointer"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Signup
          </span>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Signin;
