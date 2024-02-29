import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const { username, email, password } = formData;
      await axios.post("http://localhost:3333/register", {
        username,
        email,
        password,
      });
      toast.success(`${email} registered successfully`);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  const validateForm = () => {
    const { username, email, password } = formData;
    if (!username.trim() || !email.trim() || !password.trim()) {
      toast.error("All fields are required");
      return false;
    }
    if (!isValidEmail(email.trim())) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (password.trim().length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const isValidEmail = (email) => {
    // Basic email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div>
      <ToastContainer />
      <div className="h-screen bg-indigo-100 flex justify-center items-center">
        <div className="lg:w-2/5 md:w-1/2 w-2/3">
          <form
            className="bg-white p-10 rounded-lg shadow-lg min-w-full"
            onSubmit={handleSubmit}
          >
            <h1 className="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">
              Become a Writer
            </h1>

            <div>
              <label
                className="text-gray-800 font-semibold block my-3 text-md"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                type="text"
                name="username"
                id="username"
                placeholder="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
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
                placeholder="email@example.com"
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
              Register
            </button>
            <Link
              to="/login"
              className="w-full mt-6 mb-3 rounded-lg px-4 py-2 text-gray-600 font-semibold flex justify-center items-center hover:bg-gray-100 hover:text-gray-800 transition-colors duration-300"
            >
              Already have an account? Click here to log in!
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
