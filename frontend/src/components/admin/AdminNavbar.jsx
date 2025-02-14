import React from 'react'
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a
            className="btn btn-ghost text-xl"
            onClick={() => navigate("/viewbus")}
          >
            Admin
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a onClick={() => navigate("/addBus")}>Add Bus</a>
            </li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li>
                    <a>Link 1</a>
                  </li>
                  <li>
                    <a>Link 2</a>
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

export default AdminNavbar
