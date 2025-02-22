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
import HomeMain from './components/student/HomeMain.jsx';
import SemesterCourseForm from './components/admin/SemesterCourseForm.jsx';
import AdminHome from './components/admin/adminHome.jsx';
import BusEditForm from './components/admin/EditForm.jsx';

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<HomeMain />} />
      <Route path="/homepage" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/booked" element={<BookedBusesPage />} />
      <Route path="/seat/:busId" element={<SeatRegForm />} />
      <Route path="/addBus" element={<BusRegistrationForm />} />
      <Route path="/addCourse" element={<SemesterCourseForm />} />
      <Route path="/viewbus" element={<ViewBus />} />
      <Route path="/adminHome" element={<AdminHome />} />
      <Route path="/bus/:busId" element={<BusDetails />} />
      <Route path="/editBus/:busId" element={<BusEditForm />} />
    </Routes>
  </BrowserRouter>
);
