// Dashboard.jsx
import React, { useState } from 'react';

const StoreDashBoard = () => {
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    console.log('Logging out...');
  };


  const handlePasswordUpdate = () => {
    setShowModal(true);
  };
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in");
      return;
    }

    const decoded = jwt_decode(token);
    fetchStore(decoded.storeId);
    fetchUsers();
  }, []);

  const fetchStore = async (storeId) => {
    try {
      const response = await axios.get("http://localhost:5000/stores/admin", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setStore(response.data.store);
    } catch (error) {
      console.error("Error fetching store:", error);
    }
  };
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold mb-4">Store Owner</h2>
        <ul>
          <li className="hover:bg-gray-700 p-2 rounded">Dashboard</li>
          <li
            className="hover:bg-gray-700 p-2 rounded cursor-pointer"
            onClick={handlePasswordUpdate}
          >
            Update Password
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between mb-4">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">
            {store ? store.sname : "Loading..."}
          </h1>
          <button
            onClick={() => localStorage.removeItem("token")}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        {/* User Ratings */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">User Ratings</h2>
          <ul className="border rounded p-4">
            <li>John Doe | 5 stars | Jan 5, 2025</li>
            <li>Jane Smith | 4 stars | Jan 6, 2025</li>
            {/* Map through your ratings here */}
          </ul>
        </div>

        {/* Average Rating */}
        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded shadow">
          <p>Average Store Rating: ★★★★☆ (4.3)</p>
        </div>
      </div>

      {/* Password Update Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Update Password</h2>
            <form>
              <input
                type="password"
                placeholder="Current Password"
                className="block w-full p-2 mb-2 border"
              />
              <input
                type="password"
                placeholder="New Password"
                className="block w-full p-2 mb-2 border"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="block w-full p-2 mb-4 border"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Submit
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreDashBoard;
