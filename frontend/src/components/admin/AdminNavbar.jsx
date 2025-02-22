import React from "react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a
            className="btn btn-ghost text-2xl text-blue-700 font-bold cursor-pointer"
            onClick={() => navigate("/adminHome")}
          >
            Admin
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 text-lg font-medium text-gray-800">
            <li>
              <a
                className="cursor-pointer hover:text-blue-600"
                onClick={() => navigate("/adminHome")}
              >
                Home
              </a>
            </li>
            <li>
              <a
                className="cursor-pointer hover:text-blue-600"
                onClick={() => navigate("/viewbus")}
              >
                View Bus
              </a>
            </li>
            <li>
              <a
                className="cursor-pointer hover:text-blue-600"
                onClick={() => navigate("/addBus")}
              >
                Add Bus
              </a>
            </li>
            <li>
              <details>
                <summary className="hover:text-blue-600">Profile</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li>
                    <a className="hover:text-blue-600" onClick={()=>navigate('/')}>logout</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
