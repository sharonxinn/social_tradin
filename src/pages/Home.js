import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [tweets, setTweets] = useState([]);
  const [influencerSearch, setInfluencerSearch] = useState("");
  const [influencers, setInfluencers] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get("https://your-backend-url.com/twitter-feed")
      .then(response => setTweets(response.data))
      .catch(error => console.error("Error fetching tweets:", error));
  }, []);

  useEffect(() => {
    axios.get("https://your-backend-url.com/recent-activities")
      .then(response => setActivities(response.data))
      .catch(error => console.error("Error fetching activities:", error));
  }, []);

  const handleSearch = () => {
    axios.get(`https://your-backend-url.com/influencers?search=${influencerSearch}`)
      .then(response => setInfluencers(response.data))
      .catch(error => console.error("Error fetching influencers:", error));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Latest Trading Tweets</h1>
      {tweets.length === 0 ? <p>Loading...</p> : (
        tweets.map((tweet, index) => (
          <div key={index} className="p-4 my-2 border border-gray-300 rounded-lg">
            <p>{tweet.text}</p>
            <span className="text-gray-500">@{tweet.user}</span>
          </div>
        ))
      )}

      {/* Trending Section */}
      <div className="mt-6">
        <h2 className="text-xl font-bold">Trending</h2>
        <Link to="https://dexscreener.com" className="text-blue-500 hover:underline">View Trending Details on Dexscreener</Link>
      </div>

      {/* Influencer Search */}
      <div className="mt-6">
        <h2 className="text-xl font-bold">Influencer Search</h2>
        <input 
          type="text" 
          className="border p-2 rounded w-full" 
          placeholder="Search Influencers..." 
          value={influencerSearch} 
          onChange={(e) => setInfluencerSearch(e.target.value)}
        />
        <button onClick={handleSearch} className="mt-2 p-2 bg-blue-500 text-white rounded">Search</button>
        <div className="mt-2">
          {influencers.map((influencer, index) => (
            <div key={index} className="p-4 border border-gray-300 rounded-lg mt-2">
              <p className="font-bold">{influencer.name}</p>
              <p>Score: {influencer.score}</p>
              <p>On-Chain Activities: {influencer.activities}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6">
        <h2 className="text-xl font-bold">Recent Activities</h2>
        {activities.length === 0 ? <p>No recent activities</p> : (
          activities.map((activity, index) => (
            <div key={index} className="p-4 border border-gray-300 rounded-lg mt-2">
              <p>{activity.description}</p>
              <span className="text-gray-500">{activity.date}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
