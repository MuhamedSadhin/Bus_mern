import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="navbar bg-base-100 m-2">
        <div className="flex-1">
          <a
            className="btn btn-ghost text-xl"
            onClick={() => navigate("/home")}
          >
            daisyUI
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a></a>
            </li>
            <li>
              <details>
                <summary>Menu</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li>
                    <a onClick={() => navigate("/profile")}>Profile</a>
                  </li>
                  <li>
                    <a onClick={() => navigate("/booked")}>Bookings</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar
