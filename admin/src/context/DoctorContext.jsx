import axios from "axios";
import React, { createContext, useState } from "react";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );
  const [appointments, setAppointments] = useState([]);

  // Save token to localStorage whenever it's updated
  const saveToken = (token) => {
    setDToken(token);
    localStorage.setItem("dToken", token);
  };

  const getAppointments = async () => {
    try {
      if (!dToken) return; // don't call API if no token
      const { data } = await axios.get(
        backendURL + "/api/doctor/appointments",
        { headers: { Authorization: `Bearer ${dToken}` } } // FIX: proper header
      );
      if (data.success) {
        const reversed = [...data.appointments].reverse();
        setAppointments(reversed);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch appointments");
    }
  };

  const value = {
    dToken,
    setDToken: saveToken, // always use saveToken
    backendURL,
    appointments,
    setAppointments,
    getAppointments,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
