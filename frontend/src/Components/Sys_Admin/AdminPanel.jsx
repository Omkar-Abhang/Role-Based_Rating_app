import { useState, useEffect } from "react";
import axios from "axios";

import Dashboard from "./Components/Dashboard";

export default function AdminPanel() {

  const [selectedMenu, setSelectedMenu] = useState("Dashboard");

  // useEffect(() => {
  //   if (selectedMenu === "Dashboard") {
    
  //   }
  // }, [selectedMenu]);


  return (
    <>
    <h2 className="text-4xl font-bold bg-blue-400 flex justify-center p-4">ADMIN PANEL</h2>
    <div className="flex h-screen  border-2 border-blue-600">
      {/* Sidebar */}
      <div className="w-1/5 bg-blue-400 p-6">
       
        <nav className="space-y-4">
          {["DashBoard", "Register/View Stores","Register/View User Details"].map((menu) => (
            <button
              key={menu}
              className={`w-full text-left text-gray-100 font-bold p-2 rounded border-2 border-black shadow-sm ${
                selectedMenu === menu ? "bg-blue-300" : ""
              }`}
              onClick={() => setSelectedMenu(menu)}
            >
              {menu}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-3">
        {selectedMenu === "DashBoard" && <Dashboard/>}
       
      </div>
    </div>
    </>
  );
}
