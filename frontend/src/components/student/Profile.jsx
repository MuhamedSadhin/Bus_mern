import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch User Details
  useEffect(() => {
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

  // Fetch Booked Buses
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/bus/getBookedSeat", {
        withCredentials: true,
      })
      .then((response) => {
        setBuses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching booked buses:", error);
        setError("Failed to fetch bus details.");
        setLoading(false);
      });
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-500">Loading user details...</p>
      </div>
    );
  }

  return (
      <div>
          <Navbar/>
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
          {/* User Info */}
          <div className="flex items-center space-x-4 border-b pb-4">
            <div className="avatar">
              <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={
                    user.avatar ||
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACUCAMAAABGFyDbAAAAMFBMVEXk5ueutLepsLPZ3N7n6erIzM7P0tTq7O2yuLvBxsje4eLV2NrR1da2u767wMPEycvljgLtAAADY0lEQVR4nO2byXLbMAxAuYDiou3//7akXLfxIosABciZ4bskMz3kDQiBC1ClOp1Op9PpdDqdTqfT6XR+DQDPv1wOeGUHF5dMjG6yX2EGaopaa6Nv5J8hWnWxGaR1vhv9x4ThWrGoX6VuXCcGbleqRGy8xAvSsut0I15hZQ+kcsDmJG41HVoVkuxCwrSfVQ9YSS8Y6qRKvAStxspYZYKcVwrVVlrPUsvoZ4SVNk7GC4b6JdwYRbSOC9YTQSJc/qi4v2AGfi+wyCXUMl8jOlgiWY/OrA1uLYj4Nczh4j7kAMVK64XZCrHt/IQ56YGQ8AUzsWop1L7zg8iaXLTvsOA5tYiplVeR0wocWctyakWiVc55xuTCnbQe4Nx/POZY+gjnp+ipqZXrfNfqWh+1vjTlv7NA0A6BBdZy+qWbT8NWzXuwIec868GGch3bgsV7DKQeIQzvOwTlTl3gvlcT6zxnjS/QSgT79ZV4yeD9DhUt6c3AbaVU+s6HJI/eF1n3w38kdLBE3nTRT7pCL/OwYLykHsAV7oFkYS8OdzBbkGBzRcFYrSXaG65+FRRt3NXGK4j30SF96J/fMItw8/XG0e4oVxkegOnjwIFwWv3wgjW8FzNBZB/cFUvuVcyYebp8ygZsnENW+Wukw+wuyfQXQNlxWMukVHTD+B2DUgXY8N5vP6+2UUXIg0o5WIPbGHK0bMqG132F+boxuvh6+y+TZcs62iQ+kQc+jW6ZjdmtW/mfstuQxMzyH7Ku/sC1jkqgWOR6sM77QXoXtxCZq1jO7oH2ksQ4xQh+3B8FPIzZwjMsCGp8MzOJIbjTxcBPqOvO+4jNZ4tZ4ivgM+HE1whIa3Ok7pjltGNY/TWnSuyUlQRFbhHsec3tAQO7c/5sovWUXz3IicO0DfDSezxHhBYtNqvsRU4waCzrnzHUE397Xf8MKV5Ab2nWQokXY17dwb99wXn7zScvZLioU21IsP081DB1ixdqUrahg4/1wiwh9uW9AcSMpdQSblQPM+K7Ok1Uv9uLWtVmPX3SjsZcFyvRzNK1TVDJz/DGXJNdDcNQREzN1kho+rayHic9OHGrqqQ/6f6MoeKAI/0dFiomcOgz3g1ax/dGmYPWE4eNY/qYXQuHlQsWcwWHBdVegcx/fut0Op1O5xfyBzfiKaWdaPkVAAAAAElFTkSuQmCC"
                  }
                  alt="User Avatar"
                />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
              <p className="text-gray-500">Phone: {user.phoneNumber}</p>
            </div>
          </div>

          {/* Registered Buses */}
          <h3 className="text-xl font-semibold mt-6 mb-3">Registered Buses</h3>

          {loading ? (
            <p className="text-gray-500">Loading buses...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : buses.length > 0 ? (
            <div className="space-y-4">
              {buses.map((bus) => {
                // Find the logged-in user's details in the students array
                const student = bus.students.find(
                  (s) => s.user._id === user._id
                );
                return (
                  <div
                    key={bus._id}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm border"
                  >
                    <h4 className="text-lg font-bold">{bus.busNumber}</h4>
                    <p className="text-gray-600">Route: {bus.mainRoute}</p>
                    <p className="text-gray-600">
                      Your Stop: {student ? student.placeToReach : "N/A"}
                    </p>
                    <p className="text-gray-600">
                      Driver: {bus.driverName} ({bus.driverPhone})
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500">
              You have not registered for any buses yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
