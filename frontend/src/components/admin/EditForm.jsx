import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

const BusEditForm = () => {
  const { busId } = useParams();
  const navigate = useNavigate();
  const [busData, setBusData] = useState({
    busNumber: "",
    totalSeats: 50,
    driverName: "",
    driverPhone: "",
    mainRoute: "",
    route: [{ name: "", price: 0, time: "" }],
    isActive: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/bus/reserved/${busId}`
        );
        setBusData(response.data);
      } catch (err) {
        setError("Failed to fetch bus details.");
      } finally {
        setLoading(false);
      }
    };
    fetchBusDetails();
  }, [busId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRouteChange = (index, field, value) => {
    const updatedRoute = [...busData.route];
    updatedRoute[index][field] = value;
    setBusData((prev) => ({ ...prev, route: updatedRoute }));
  };

  const addSubStop = () => {
    setBusData((prev) => ({
      ...prev,
      route: [...prev.route, { name: "", price: 0, time: "" }],
    }));
  };

  const removeSubStop = (index) => {
    setBusData((prev) => ({
      ...prev,
      route: prev.route.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Omit the "students" field to preserve existing student data
      const { students, ...updatedData } = busData;
      await axios.put(
        `http://localhost:5000/api/bus/update/${busId}`,
        updatedData
      );
      alert("Bus details updated successfully!");
      navigate(`/bus/${busId}`);
    } catch (error) {
      alert("Failed to update bus details");
    }
  };

  if (loading) return <p>Loading bus details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <AdminNavbar />
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Edit Bus Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Bus Number</label>
            <input
              type="text"
              name="busNumber"
              value={busData.busNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Total Seats
            </label>
            <input
              type="number"
              name="totalSeats"
              value={busData.totalSeats}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Driver Name
            </label>
            <input
              type="text"
              name="driverName"
              value={busData.driverName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Driver Phone
            </label>
            <input
              type="tel"
              name="driverPhone"
              value={busData.driverPhone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Main Route</label>
            <input
              type="text"
              name="mainRoute"
              value={busData.mainRoute}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Route</label>
            {busData.route.map((subStop, index) => (
              <div key={index} className="mb-2 flex gap-2">
                <input
                  type="text"
                  placeholder="Sub-stop Name"
                  value={subStop.name}
                  onChange={(e) =>
                    handleRouteChange(index, "name", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={subStop.price}
                  onChange={(e) =>
                    handleRouteChange(index, "price", e.target.value)
                  }
                  className="w-1/3 p-2 border rounded"
                  required
                />
                <input
                  type="time"
                  value={subStop.time}
                  onChange={(e) =>
                    handleRouteChange(index, "time", e.target.value)
                  }
                  className="w-1/3 p-2 border rounded"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeSubStop(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSubStop}
              className="mt-2 text-blue-500"
            >
              + Add Sub-stop
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Update Bus
          </button>
        </form>
      </div>
    </div>
  );
};

export default BusEditForm;
