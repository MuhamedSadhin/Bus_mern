import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const BookedBusesPage = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  // Fetch Booked Buses for the User and User Details
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/bus/getBookedSeat", {
        withCredentials: true,
      })
      .then((response) => {
        setBuses(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching booked buses:", error);
        setError("Failed to fetch bus details.");
        setLoading(false);
      });

    axios
      .get("http://localhost:5000/api/auth/me", { withCredentials: true })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setError("Failed to fetch user details.");
      });
  }, []);

  // Handle Deletion of a Bus Booking
  const handleDeleteBooking = (busId) => {
    axios
      .delete(`http://localhost:5000/api/bus/cancelBooking/${busId}`, {
        withCredentials: true,
      })
      .then(() => {
        setBuses(buses.filter((bus) => bus._id !== busId)); // Remove the bus from the state
        alert("Booking successfully cancelled!");
      })
      .catch((error) => {
        console.error("Error cancelling booking:", error);
        alert("Failed to cancel booking.");
      });
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  // Filter out only active buses
  const activeBuses = buses.filter((bus) => bus.status === "active");

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Your Booked Buses
          </h2>

          {activeBuses.length > 0 ? (
            <div className="space-y-4">
              {activeBuses.map((bus) => {
                const student = bus.students.find(
                  (s) => s.user._id === user._id
                );
                return (
                  <div
                    key={bus._id}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm border"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-lg font-bold">{bus.busNumber}</h4>
                        <p className="text-gray-600">Route: {bus.mainRoute}</p>
                        <p className="text-gray-600">
                          Your Stop: {student ? student.placeToReach : "N/A"}
                        </p>
                        <p className="text-gray-600">
                          Driver: {bus.driverName} ({bus.driverPhone})
                        </p>
                      </div>
                      <div>
                        <button
                          className="btn btn-error btn-sm"
                          onClick={() => handleDeleteBooking(bus._id)}
                        >
                          Cancel Booking
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500">
              You have not registered for any active buses yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookedBusesPage;
