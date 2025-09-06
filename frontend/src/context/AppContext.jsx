// src/context/AppContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = '$';
  const backendURL = "https://prescriptobackend-production.up.railway.app"

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: { line1: '', line2: '' },
    gender: 'Not Selected',
    dob: '',
    image: ''
  });

  // Load doctor list
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/doctor/list`);
      if (data.success) setDoctors(data.doctors);
      else toast.error(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Load user profile
  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/user/get-profile`, {
        headers: { token }
      });
      if (data.success) setUserData(data.userData);
      else toast.error("Failed to load profile");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) loadUserProfileData();
    else setUserData({
      name: '',
      email: '',
      phone: '',
      address: { line1: '', line2: '' },
      gender: 'Not Selected',
      dob: '',
      image: ''
    });
  }, [token]);

  return (
    <AppContext.Provider
      value={{
        doctors,getDoctorsData,
        currencySymbol,
        token,
        setToken,
        backendURL,
        userData,
        setUserData,
        loadUserProfileData
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
