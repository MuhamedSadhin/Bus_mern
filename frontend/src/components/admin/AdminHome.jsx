import React from 'react'
import'../student/Homemain.css'
import Navbar from '../student/Navbar';
import AdminNavbar from './AdminNavbar';
const AdminHome = () => {
  return (
    <div>
      <div>
        <AdminNavbar />
        <div className="homepage-background h-screen flex flex-col items-center justify-center text-center">
          <div className="container">
            <h1 className="text-5xl font-extrabold text-white">
              Welcome to Our Website
            </h1>
            <p className="mt-4 text-3xl font-medium text-gray-200">
              This is the homepage with a beautiful background image.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome
