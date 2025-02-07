import React, { useEffect, useState } from "react";
import supabase from "../config/supabase"; // Import the Supabase client

const Market = () => {
  const [stocks, setStocks] = useState([]);

  // Function to fetch initial stock data
  const fetchStocks = async () => {
    const { data, error } = await supabase.from("stocks").select("*"); // Change 'stocks' to your table name
    if (error) console.error(error);
    else setStocks(data);
  };

  useEffect(() => {
    fetchStocks(); // Fetch initial data

    // Set up real-time subscription
    const subscription = supabase
      .channel("stocks-updates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "stocks" }, // Listen for all changes in 'stocks' table
        (payload) => {
          console.log("Change received!", payload);

          if (payload.eventType === "INSERT") {
            setStocks((prevStocks) => [...prevStocks, payload.new]); // Add new stock data
          } else if (payload.eventType === "UPDATE") {
            setStocks((prevStocks) =>
              prevStocks.map((stock) =>
                stock.id === payload.new.id ? payload.new : stock
              )
            );
          } else if (payload.eventType === "DELETE") {
            setStocks((prevStocks) =>
              prevStocks.filter((stock) => stock.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    // Cleanup function to remove subscription on component unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <div>
      <h2>Real-Time Market Data</h2>
      <ul>
        {stocks.map((stock) => (
          <li key={stock.id}>
            {stock.name} - ${stock.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Market;
