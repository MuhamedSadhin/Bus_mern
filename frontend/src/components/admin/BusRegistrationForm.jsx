import React, { useState } from "react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";

const BusRegistrationForm = () => {
  const [busNumber, setBusNumber] = useState("");
  const [totalSeats, setTotalSeats] = useState(50);
  const [driverName, setDriverName] = useState("");
  const [driverPhone, setDriverPhone] = useState("");
  const [mainRoute, setMainRoute] = useState("");
  const [route, setRoute] = useState([{ name: "", price: 0 }]);

  const handleRouteChange = (index, field, value) => {
    const updatedRoute = [...route];
    updatedRoute[index][field] = value;
    setRoute(updatedRoute);
  };

  const addSubStop = () => {
    setRoute([...route, { name: "", price: 0 }]);
  };

  const removeSubStop = (index) => {
    const updatedRoute = route.filter((_, i) => i !== index);
    setRoute(updatedRoute);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/bus/create",
        {
          busNumber,
          totalSeats,
          driverName,
          driverPhone,
          mainRoute,
          route,
        }
      );
      alert("Bus registered successfully!");
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert("Failed to register bus");
      }
      console.error(error);
    }
  };

  return (
    <div>
      <AdminNavbar/>
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Register a Bus</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Bus Number</label>
            <input
              type="text"
              value={busNumber}
              onChange={(e) => setBusNumber(e.target.value)}
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
              value={totalSeats}
              onChange={(e) => setTotalSeats(e.target.value)}
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
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Driver Phone Number
            </label>
            <input
              type="tel"
              value={driverPhone}
              onChange={(e) => setDriverPhone(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Main Route (Final Destination)
            </label>
            <input
              type="text"
              value={mainRoute}
              onChange={(e) => setMainRoute(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Route</label>
            {route.map((subStop, index) => (
              <div key={index} className="mb-2 flex justify-evenly">
                <input
                  type="text"
                  placeholder="Sub-stop Name"
                  value={subStop.name}
                  onChange={(e) =>
                    handleRouteChange(index, "name", e.target.value)
                  }
                  className="w-full p-2 border rounded mb-1 m-2"
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={subStop.price}
                  onChange={(e) =>
                    handleRouteChange(index, "price", e.target.value)
                  }
                  className="w-full p-2 border rounded mb-1 m-2"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeSubStop(index)}
                  className="mt-1 text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSubStop}
              className="mt-2 text-blue-500 text-sm"
            >
              + Add Sub-stop
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Register Bus
          </button>
        </form>
      </div>
    </div>
  );
};

export default BusRegistrationForm;
