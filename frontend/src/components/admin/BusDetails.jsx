import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

const BusDetails = () => {
  const [bus, setBus] = useState(null);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { busId } = useParams();

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/bus/reserved/${busId}`
        );
          console.log(response.data);
        setBus(response.data);
      } catch (err) {
        setError("Failed to fetch bus details.");
      } finally {
        setLoading(false);
      }
    };
    fetchBusDetails();
  }, [busId]);

  if (loading) return <p>Loading bus details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!bus) return <p>No bus found.</p>;

  return (
    <div>
      <AdminNavbar/>
      <div className="p-6 bg-white rounded-xl shadow-md max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Bus Details</h2>
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
