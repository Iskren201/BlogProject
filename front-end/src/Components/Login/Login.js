import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      // Send login credentials to the backend
      const response = await axios.post("http://localhost:3333/login", {
        email,
        password,
      });
      // If login successful, display success toast
      toast.success("Login successful");
      // Handle the response data as needed (e.g., redirect user)
    } catch (error) {
      // Handle login error (e.g., display error message)
      toast.error("Login failed. Please check your credentials.");
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div>
        <div className="h-screen bg-indigo-100 flex justify-center items-center">
          <div className="lg:w-2/5 md:w-1/2 w-2/3">
            <form
              className="bg-white p-10 rounded-lg shadow-lg min-w-full"
              onSubmit={handleSubmit}
            >
              <h1 className="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">
                Login
              </h1>
              <div>
                <label
                  className="text-gray-800 font-semibold block my-3 text-md"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="@email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  className="text-gray-800 font-semibold block my-3 text-md"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="w-full mt-6 bg-indigo-600 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
              >
                Login
              </button>
              <Link
                to="/register"
                className="w-full mt-6 mb-3 rounded-lg px-4 py-2 text-gray-600 font-semibold flex justify-center items-center hover:bg-gray-100 hover:text-gray-800 transition-colors duration-300"
              >
                Don't have an account? Click here to sign up!
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
