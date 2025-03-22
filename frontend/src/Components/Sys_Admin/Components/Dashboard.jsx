// src/pages/AdminDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    normalUsersCount: 0,
    storeOwnersCount: 0,
    submittedRatingsCount: 0,
    recentNormalUsers: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace the URL below with your actual API endpoint.
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/admin/dashboard"
        );
        setDashboardData(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Dashboard
            </h1>
          </div>
      
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className=" bg-gray-300 p-6 rounded-xl shadow">
            <h2 className="text-lg font-medium text-black-700">Users</h2>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {dashboardData.normalUsersCount}
            </p>
          </div>
          <div className=" bg-gray-300 p-6 rounded-xl shadow">
            <h2 className="text-lg font-medium text-black-700">Stores</h2>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {dashboardData.storeOwnersCount}
            </p>
          </div>
          <div className=" bg-gray-300 p-6 rounded-xl shadow">
            <h2 className="text-lg font-medium text-black-700">
              Submitted Ratings
            </h2>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {dashboardData.submittedRatingsCount}
            </p>
          </div>
          <div className=" bg-gray-300 p-6 rounded-xl shadow">
            <h2 className="text-lg font-medium text-black-700">
              Average Ratings
            </h2>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {dashboardData.submittedRatingsCount}
            </p>
          </div>
        </div>

        {/* Recent Normal Users List */}
        <div className="bg-white rounded shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-900">New Users</h3>
         
          </div>
          <div className="divide-y">
            {dashboardData.recentNormalUsers.map((user) => (
              <div key={user.id} className="flex items-center py-4">
                <img
                  src={user.profilePicture || "https://via.placeholder.com/50"}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="text-gray-900 font-bold">{user.name}</p>
                  <p className="text-sm text-gray-600">Last seen {user.lastSeen}</p>
                </div>
              </div>
            ))}
            {dashboardData.recentNormalUsers.length === 0 && (
              <p className="text-gray-600 text-center py-4">No recent users found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
