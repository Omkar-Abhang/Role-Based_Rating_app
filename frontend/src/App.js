// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; 
import Login from "./Components/Login";
import RegistrationPage from "./Components/RegistrationPage";
import LandingPage from './Components/normalUser/LandingPage'
import StoreDashBoard from "./Components/StoreOwner/StoreDashBoard";
import AdminPanel from "./Components/Sys_Admin/AdminPanel";


const App = () => {
  return (
    <Router> {/* Changed to BrowserRouter */}
      <div className="min-h-screen bg-gray-100">
        {/* Simple nav */}
        <nav className="bg-blue-400 p-4 text-white flex justify-between">
          <div className="text-xl font-extrabold">Rating System</div>
          <div className="space-x-4">
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Sign Up
            </Link>
          </div>
        </nav>
<hr/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route
          path="/landingPage"
          element={
         
              <LandingPage />
            
          }
        />
          <Route path='/admin' element={<AdminPanel/>}/>
          <Route path='/store-owner' element={<StoreDashBoard/>}/>
          <Route path="*" element={<Login/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
