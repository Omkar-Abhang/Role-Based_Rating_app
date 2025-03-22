
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  // loginType is either "normal" or "admin"
  const [loginType, setLoginType] = useState("normal");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Only used when loginType === "admin"
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const loginPayload = {
      email,
      password,
      // For normal login, we default role to "normal"
      role: loginType === "admin" ? role : "normal",
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        loginPayload
      );
      if (response.data.user && response.data.token) {
      
          localStorage.setItem("token", response.data.token); 
        alert("Login successful!");

        if (loginType === "admin") {
          if (role === "admin") {
            navigate("/admin");
          } else if (role === "storeOwner") {
            navigate("/store-owner");
          }
        } else {
          // For "normal" user ,redirect to the main platform page.
          navigate("/landingpage");
        }
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred while logging in.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* Toggle between login types */}
        <div className="flex justify-center mb-4">
          <button
            type="button"
            className={`px-4 py-2 rounded-l ${
              loginType === "normal" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => {
              setLoginType("normal");
              setRole(""); // clear role
            }}
          >
            Normal User
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-r ${
              loginType === "admin" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setLoginType("admin")}
          >
            Admin/Store Owner
          </button>
        </div>

        <form onSubmit={handleLogin}>
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

          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Password
            </label>
            <div className="flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full p-2 border rounded"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 mt-4 ml-4 transform -translate-y-1/2 text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Only show the Role field when the admin mode is active */}
          {loginType === "admin" && (
            <div className="mb-4">
              <label htmlFor="role" className="block text-gray-700 mb-1">
                Role
              </label>
              <select
                id="role"
                className="w-full p-2 border rounded"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="storeOwner">Store Owner</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
