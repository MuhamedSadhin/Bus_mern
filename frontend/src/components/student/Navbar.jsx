// import React from 'react'
// import { useNavigate } from 'react-router-dom';

// const Navbar = () => {
//   const navigate = useNavigate();
//   return (
//     <div>
//       <div className="navbar bg-base-100 m-2">
//         <div className="flex-1">
//           <a
//             className="btn btn-ghost text-xl"
//             onClick={() => navigate("/home")}
//           >
//             College Bus
//           </a>
//         </div>
//         <div className="flex-none">
//           <ul className="menu menu-horizontal px-1 flex justify-between">
//             <li>
//               <a><h1>Home</h1></a>
//             </li>
//             <li>
//               <a>Bus</a>
//             </li>
//             <li>
//               <a>Bookings</a>
//             </li>
//             <li>
//               <details>
//                 <summary>Profile</summary>
//                 <ul className="bg-base-100 rounded-t-none p-2">
//                   <li>
//                     <a onClick={() => navigate("/profile")}>Profile</a>
//                   </li>
//                   <li>
//                     <a onClick={() => navigate("/booked")}>Bookings</a>
//                   </li>
//                 </ul>
//               </details>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar



import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar bg-base-100 shadow-lg px-4">
      {/* Logo */}
      <div className="flex-1">
        <a
          className="btn btn-ghost text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/home")}
        >
          College Bus
        </a>
      </div>

      {/* Navigation Links */}
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 text-lg font-semibold">
          <li>
            <a
              className="hover:text-blue-600 cursor-pointer"
              onClick={() => navigate("/home")}
            >
              Home
            </a>
          </li>
          <li>
            <a
              className="hover:text-blue-600 cursor-pointer"
              onClick={() => navigate("/homepage")}
            >
              Bus
            </a>
          </li>
          <li>
            <a
              className="hover:text-blue-600 cursor-pointer"
              onClick={() => navigate("/booked")}
            >
              Bookings
            </a>
          </li>
          <li>
            <details className="dropdown">
              <summary className="hover:text-blue-600 cursor-pointer">
                Profile
              </summary>
              <ul className="bg-base-100 rounded-md shadow-md p-2 text-base">
                <li>
                  <a
                    className="hover:text-blue-600 cursor-pointer"
                    onClick={() => navigate("/profile")}
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-blue-600 cursor-pointer"
                    onClick={() => navigate("/")}
                  >
                    logout
                  </a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
