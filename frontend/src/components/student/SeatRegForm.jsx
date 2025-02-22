// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Navbar from "./Navbar.jsx";

// const SeatRegForm = () => {
//   const [subStops, setSubStops] = useState([]);
//   const [selectedStop, setSelectedStop] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null);
//   const { busId } = useParams();

//   useEffect(() => {
//     if (!busId) return;

//     axios
//       .get(`http://localhost:5000/api/bus/${busId}`)
//       .then((response) => {
//         setSubStops(response.data || []); // Ensure we get only the route data
//       })
//       .catch((error) => {
//         console.error("Error fetching sub-stops:", error);
//       });
//   }, [busId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage(null);

//     if (!phoneNumber || !selectedStop) {
//       setMessage("Please enter your phone number and select a stop.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `http://localhost:5000/api/bus/${busId}/register`,
//         { phoneNumber, placeToReach: selectedStop },
//         { withCredentials: true } // ✅ Send credentials for authentication
//       );

//       setMessage(response.data.message || "Registration successful!");
//     } catch (error) {
//         setMessage(error.response?.data?.message || "Registration failed.");
//         console.error("Error registering seat:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//     return (
//         <div>
//             <Navbar/>
//         <div className="flex justify-center items-center min-h-screen bg-gray-100">
//           <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//             <h2 className="text-2xl font-bold mb-6 text-center">
//               Registration Form
//             </h2>

//             {message && (
//               <div
//                 className={`text-center mb-4 p-2 rounded ${
//                   message.includes("failed")
//                     ? "bg-red-100 text-red-700"
//                     : "bg-green-100 text-green-700"
//                 }`}
//               >
//                 {message}
//               </div>
//             )}

//             <form onSubmit={handleSubmit}>
//               {/* Phone Number Field */}
//               <label className="input input-bordered flex items-center gap-2 mb-4">
//                 Phone Number
//                 <input
//                   type="text"
//                   className="grow"
//                   placeholder="Phone Number"
//                   value={phoneNumber}
//                   onChange={(e) => setPhoneNumber(e.target.value)}
//                   required
//                 />
//               </label>

//               {/* Stop Selection Field */}
//               <label className="input input-bordered flex items-center gap-2 mb-4">
//                 Where do you want to stop?
//                 <select
//                   className="grow bg-transparent outline-none"
//                   value={selectedStop}
//                   onChange={(e) => setSelectedStop(e.target.value)}
//                   required
//                 >
//                   <option value="" disabled>
//                     Select a stop
//                   </option>
//                   {subStops.length > 0 ? (
//                     subStops.map((stop, index) => (
//                       <option key={index} value={stop.name}>
//                         {stop.name} - ₹{stop.price}
//                       </option>
//                     ))
//                   ) : (
//                     <option disabled>No stops available</option>
//                   )}
//                 </select>
//               </label>

//               {/* Submit Button */}
//               <div className="flex justify-center">
//                 <button
//                   type="submit"
//                   className="btn btn-primary w-full"
//                   disabled={loading}
//                 >
//                   {loading ? "Registering..." : "Submit"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
// };

// export default SeatRegForm;



import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar.jsx";

const SeatRegForm = () => {
  const [subStops, setSubStops] = useState([]);
  const [selectedStop, setSelectedStop] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { busId } = useParams();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!busId) return;
    axios
      .get(`http://localhost:5000/api/bus/${busId}`)
      .then((response) => {
        setSubStops(response.data || []); // Ensure we get only the route data
      })
      .catch((error) => {
        console.error("Error fetching sub-stops:", error);
      });
  }, [busId]);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!phoneNumber || !selectedStop) {
      setMessage("Please enter your phone number and select a stop.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/bus/${busId}/register`,
        { phoneNumber, placeToReach: selectedStop.name },
        { withCredentials: true }
      );

      setMessage(response.data.message || "Registration successful!");
          setTimeout(() => {
            navigate("/homepage");
          }, 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed.");
      console.error("Error registering seat:", error);
    } finally {
      setLoading(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Registration Form
          </h2>

          {message && (
            <div
              className={`text-center mb-4 p-2 rounded ${
                message.includes("failed")
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Phone Number Field */}
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Phone Number
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>

            {/* Custom Dropdown */}
            <div className="mb-4 relative" ref={dropdownRef}>
              <label className="block text-gray-700 font-medium mb-1">
                Where do you want to stop?
              </label>
              <div
                className="w-full p-3 border border-gray-300 rounded-lg bg-white cursor-pointer flex justify-between items-center"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {selectedStop ? (
                  <>
                    <span>
                      {selectedStop.name} - ₹{selectedStop.price}
                    </span>
                    <span className="text-gray-500">
                      {selectedStop.time ? selectedStop.time : "No Time"}
                    </span>
                  </>
                ) : (
                  <span className="text-gray-400">Select a stop</span>
                )}
              </div>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <ul className="absolute left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                  {subStops.length > 0 ? (
                    subStops.map((stop, index) => (
                      <li
                        key={index}
                        className="p-3 flex justify-between items-center hover:bg-gray-200 cursor-pointer"
                        onClick={() => {
                          setSelectedStop(stop);
                          setDropdownOpen(false);
                        }}
                      >
                        <span>
                          {stop.name} - ₹{stop.price}
                        </span>
                        <span className="text-gray-500">
                          {stop.time ? stop.time : "No Time"}
                        </span>
                      </li>
                    ))
                  ) : (
                    <li className="p-3 text-gray-500">No stops available</li>
                  )}
                </ul>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
                disabled={loading}
              >
                {loading ? "Registering..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SeatRegForm;

