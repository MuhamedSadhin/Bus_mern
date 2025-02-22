import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const HomePage = () => {
  const [buses, setBuses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch bus data when the component mounts
    axios
      .get("http://localhost:5000/api/bus/getAllBus", {
        withCredentials: true,
      })
      .then((response) => {
        setBuses(response.data.buses); // Assuming the response is an array of buses
      })
      .catch((error) => {
        console.error("There was an error fetching the buses!", error);
      });
  }, []); // Run this effect once when the component mounts

  return (
    <div>
      <Navbar />
      <div className="flex justify-center gap-4 flex-wrap m-16">
        {buses
          .filter((bus) => bus.status === "active") // Only display active buses
          .map((bus, index) => (
            <div
              key={index}
              className="card card-compact bg-base-100 w-96 shadow-xl"
            >
              <figure>
                <img
                  className="w-full h-48 object-cover"
                  src="data:image/png;base64,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"
                  alt={`Bus ${bus.busNumber}`}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">Bus No: {bus.busNumber}</h2>
                <p>Occupied Seats: {bus.occupiedSeats} / 50</p>
                <p>Route: {bus.mainRoute}</p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/seat/${bus._id}`)}
                  >
                    Register this Bus ?
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HomePage;
