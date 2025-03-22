import React, { useState, useEffect } from "react";
import axios from "axios";

const LandingPage = () => {
  const [stores, setStores] = useState([]); // Stores fetched from the database
  const [selectedRatings, setSelectedRatings] = useState({}); // Track selected ratings for each store
  const [userId, setUserId] = useState(null); // Logged-in user ID

  useEffect(() => {

    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from storage
        if (!token) throw new Error("No token found");
    
        const response = await axios.get("http://localhost:5000/auth/me", {
          headers: { Authorization: `Bearer ${token}` }, // ✅ Add "Bearer" prefix
        });
    
        console.log("User ID Fetched:", response.data.uid);
        setUserId(response.data.uid);
      } catch (error) {
        console.error("Error fetching user ID:", error);
        alert("Failed to fetch user information. Please log in.");
      }
    };
    
  
  
    const fetchStores = async () => {
      try {
        const response = await axios.get("http://localhost:5000/stores/");
        console.log("Fetched Stores:", response.data.stores);
        setStores(response.data.stores);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };
  
    fetchUserId();
    fetchStores();
  }, []);
  

  const handleRatingSubmit = async (storeId) => {
    const rating = selectedRatings[storeId]; // Selected rating for the store

    if (!rating) {
      alert("Please select a rating before submitting!");
      return;
    }

    if (!userId) {
      alert("User not logged in!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/ratings", {
        userid: userId,
        storeid: storeId,
        rating,
      });
      alert("Rating submitted successfully!");
      
      // Re-fetch stores to reflect updated ratings
      const response = await axios.get("http://localhost:5000/stores/all");
      setStores(response.data.stores);
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("Failed to submit rating. Please try again.");
    }
  };

  const calculatePercentage = (store, rating) => {
    if (!store.ratings || Object.keys(store.ratings).length === 0) {
      return 0; // Handle case where no ratings data is available
    }

    const totalRatings = Object.values(store.ratings).reduce(
      (sum, count) => sum + count,
      0
    );
    if (totalRatings === 0) return 0; // Prevent division by zero
    return ((store.ratings[rating] || 0) / totalRatings) * 100;
  };

  return (
    <div className="p-4 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-8">Rate Our Stores</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stores.map((store) => (
          <div
            key={store.sid}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col"
          >
            <h2 className="text-xl font-semibold mb-2">{store.sname}</h2>
            <p className="text-gray-600">{store.saddress}</p>
            <p className="mt-2 text-gray-800">
              Average Rating: {store.srating || "Not Rated Yet"}
            </p>
            <div className="mt-4">
              <div className="flex items-center space-x-1 mb-2">
                {[5, 4, 3, 2, 1].map((star) => (
                  <button
                    key={star}
                    className={`p-1 rounded-full ${
                      selectedRatings[store.sid] === star
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                    onClick={() =>
                      setSelectedRatings({
                        ...selectedRatings,
                        [store.sid]: star,
                      })
                    }
                  >
                    {star}★
                  </button>
                ))}
              </div>
              <button
                className="bg-blue-500 text-white py-1 px-3 rounded mt-2"
                onClick={() => handleRatingSubmit(store.sid)}
              >
                Submit Rating
              </button>
            </div>
            <div className="mt-4">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center mt-1">
                  <div className="w-16 text-sm">{star}★</div>
                  <div className="flex-1 bg-gray-200 rounded h-4 relative">
                    <div
                      className="bg-blue-500 h-4 rounded"
                      style={{
                        width: `${calculatePercentage(store, star)}%`,
                      }}
                    ></div>
                  </div>
                  <div className="ml-2 text-sm text-gray-600">
                    {calculatePercentage(store, star).toFixed(1)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
