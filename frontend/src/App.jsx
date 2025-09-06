import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';       // ✅ Make sure this path is correct
import Home from './pages/Home.jsx';
import Doctors from './pages/Doctors.jsx';          // ✅ Correct path
import Login from './pages/Login.jsx';
import MyProfile from './pages/MyProfile.jsx';
import MyAppointments from './pages/MyAppointments.jsx';
import Appointment from './pages/Appointment.jsx';
import About from './pages/About.jsx';              // ✅ Must exist
import Contact from './pages/Contact.jsx';          // ✅ (You probably meant "Contact")
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';


const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contect' element={<Contact />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />

      </Routes>
      <Footer />
    </div>
  );
};

export default App;
