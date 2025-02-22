import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

const BusDetails = () => {
  const [bus, setBus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { busId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/bus/reserved/${busId}`
        );
        setBus(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Failed to fetch bus details.");
      } finally {
        setLoading(false);
      }
    };
    fetchBusDetails();
  }, [busId]);

  const handleEdit = () => {
    navigate(`/editBus/${busId}`);
  };

  const toggleBusStatus = async () => {
    try {
      // Toggle the status value based on bus.status
      const updatedStatus = bus.status === "active" ? "inactive" : "active";

      await axios.put(`http://localhost:5000/api/bus/status/${busId}`, {
        status: updatedStatus,
      });

      // Update the local state to reflect the new status
      setBus((prevBus) => ({ ...prevBus, status: updatedStatus }));
    } catch (err) {
      alert("Failed to update bus status.");
    }
  };

  if (loading) return <p>Loading bus details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!bus) return <p>No bus found.</p>;

  return (
    <div>
      <AdminNavbar />

      <div className="p-6 bg-white rounded-xl shadow-md max-w-3xl mx-auto relative">
        <div>
          <div className="absolute mt-7 right-4 flex gap-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                bus.status === "active"
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              } text-white`}
              onClick={toggleBusStatus}
            >
              {bus.status === "active" ? "Deactivate" : "Activate"}
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 mt-12">Bus Details</h2>
            <p className="text-lg">
              Bus Number: <strong>{bus.busNumber}</strong>
            </p>
            <p className="text-lg">
              Main Route: <strong>{bus.mainRoute}</strong>
            </p>
            <p className="text-lg">
              Driver:{" "}
              <strong>
                {bus.driverName} ({bus.driverPhone})
              </strong>
            </p>
            <p className="text-lg">
              Total Seats: <strong>{bus.totalSeats}</strong>
            </p>
            <p className="text-lg">
              Occupied Seats: <strong>{bus.occupiedSeats}</strong>
            </p>
            <p className="text-lg">
              Status:{" "}
              <strong
                className={
                  bus.status === "active" ? "text-green-600" : "text-red-600"
                }
              >
                {bus.status === "active" ? "Active" : "Inactive"}
              </strong>
            </p>
          </div>
        </div>
        <h3 className="text-xl font-semibold mt-4">Registered Students</h3>
        {bus.students.length === 0 ? (
          <p className="text-gray-500 mt-2">
            No students have reserved seats yet.
          </p>
        ) : (
          <div className="overflow-x-auto mt-4">
            <table className="table w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Seat Number</th>
                  <th>Pickup Location</th>
                </tr>
              </thead>
              <tbody>
                {bus.students.map((student, index) => (
                  <tr key={student._id} className="hover">
                    <th>{index + 1}</th>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.seatNumber}</td>
                    <td>{student.placeToReach}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusDetails;
