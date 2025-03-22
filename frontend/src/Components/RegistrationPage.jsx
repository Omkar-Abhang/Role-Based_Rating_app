// src/pages/RegistrationPage.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  // The role for normal users is preset.
  const role = "normal";
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    const registrationData = { name, email, password, role, address };

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        registrationData
      );
      if (response.data.user) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("An error occurred during registration.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleRegistration}>
          {/* <div className="mb-4">
            <label htmlFor="id" className="block text-gray-700 mb-1">
              ID
            </label>
            <input
              type="text"
              id="id"
              className="w-full p-2 border rounded"
              placeholder="Enter your ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div> */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border rounded"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded"
              placeholder="Choose a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              id="address"
              className="w-full p-2 border rounded"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          {/* Hidden role field */}
          <input type="hidden" value={role} />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
