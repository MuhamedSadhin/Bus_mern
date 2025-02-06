import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import HomePage from './components/student/HomePage.jsx';
import BusSeatPicker from './components/student/BusSeatPicker.jsx';
import BusRegistrationForm from './components/admin/BusRegistrationForm.jsx';
import ViewBus from './components/admin/ViewBus.jsx';
import BusDetails from './components/admin/BusDetails.jsx';
import SeatRegForm from './components/student/SeatRegForm.jsx';
import ProfilePage from './components/student/Profile.jsx';
import BookedBusesPage from './components/student/BookedBusesPage.jsx';

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/seat/:busId" element={<SeatRegForm />} />
      <Route path="/addBus" element={<BusRegistrationForm />} />
      <Route path="/viewbus" element={<ViewBus />} />
      <Route path="/booked" element={<BookedBusesPage />} />
      <Route path="/bus/:busId" element={<BusDetails />} />
    </Routes>
  </BrowserRouter>
);
