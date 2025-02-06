



import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BusSeatPicker.css";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

const BusSeatPicker = () => {
  const [selectedSeats, setSelectedSeats] = useState({});
  const [reservedSeats, setReservedSeats] = useState([]);
  const { busId } = useParams(); // Example bus ID

  // Fetch reserved seats from the API when the component mounts
  useEffect(() => {
    const fetchReservedSeats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/bus/${busId}`,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          // Extract only seat numbers from the response
          const seatNumbers = response.data.map((seat) => seat.seatNumber);
          setReservedSeats(seatNumbers); // Update reservedSeats state with the array of seat numbers
          console.log(response.data);
          console.log(seatNumbers);
        } else {
          console.error("Failed to fetch reserved seats.");
        }
      } catch (error) {
        console.error("Error fetching reserved seats:", error);
      }
    };

    fetchReservedSeats();
  }, [busId]);

  const handleSeatClick = async (seatNumber) => {
    if (reservedSeats.includes(seatNumber)) {
      alert("This seat is reserved.");
      return;
    }
    const place = prompt(`Enter the place for seat ${seatNumber}:`);
    if (place) {
      try {
        // Axios POST request to register the seat
        const response = await axios.post(
          `http://localhost:5000/api/bus/${busId}/register`,
          {
            seatNumber,
            placeToReach: place,
          },
          {
            withCredentials: true,
          }
        );

        if (response.status === 201) {
          alert("Seat registered successfully!");
          setSelectedSeats((prevSeats) => ({
            ...prevSeats,
            [seatNumber]: place,
          }));
        } else {
          alert("Failed to register seat. Try again.");
        }
      } catch (error) {
        console.error("Error registering seat:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  const renderSeats = () => {
    let seatNumbers = [];
    for (let i = 1; i <= 50; i++) {
      seatNumbers.push(i);
    }
    return seatNumbers.map((seatNumber) => (
      <div
        key={seatNumber}
        className={`seat 
          ${selectedSeats[seatNumber] ? "selected" : ""} 
          ${reservedSeats.includes(seatNumber) ? "reserved" : ""}`}
        onClick={() => handleSeatClick(seatNumber)}
      >
        {selectedSeats[seatNumber] ? (
          <>
            <span>{seatNumber}</span>
            <small>{selectedSeats[seatNumber]}</small>
          </>
        ) : (
          <span>{seatNumber}</span>
        )}
      </div>
    ));
  };

  return (
    <div>
      <Navbar/>
      <div className="bus-seat-picker">
        <h2>Pick Your Seat</h2>
        <div className="seats-container">{renderSeats()}</div>
        <div className="selected-seats">
          <h3>Selected Seats:</h3>
          {reservedSeats.length > 0
            ? reservedSeats.join(", ") // Display reserved seats as a comma-separated list
            : "None"}
        </div>
      </div>
    </div>
  );
};

export default BusSeatPicker;
