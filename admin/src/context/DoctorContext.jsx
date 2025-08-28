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
  const [dashData, setDashData] = useState(false)
  const[profileData,setProfileData]=useState(false)

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
  }

  const completeAppointment = async (appointmentId) => {
    try {

      const { data } = await axios.post(backendURL + '/api/doctor/complete-appointment', { appointmentId }, { headers: { Authorization: `Bearer ${dToken}` } });
      if (data.success) {
        toast.success(data.message)
        getAppointments()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }


  const cancelAppointment = async (appointmentId) => {
    try {

      const { data } = await axios.post(backendURL + '/api/doctor/cancel-appointment', { appointmentId }, { headers: { Authorization: `Bearer ${dToken}` } })
      if (data.success) {
        toast.success(data.message)
        getAppointments()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendURL + '/api/doctor/dashboard', { headers: { Authorization: `Bearer ${dToken}` } })
      if (data.success) {
        setDashData(data.dashData)
        console.log(data.dashData)
      } else {
        toast.error(error.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  const getProfileData=async()=>{
    try {
      const{data}=await axios.get(backendURL+'/api/doctor/profile',{headers:{ Authorization: `Bearer ${dToken}` } })
      setProfileData(data.profileData)
      console.log(data.profileData)
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const value = {
    dToken,
    setDToken: saveToken, // always use saveToken
    backendURL,
    appointments,
    setAppointments,
    getAppointments, completeAppointment, cancelAppointment,dashData,
    setDashData,getDashData,profileData,getProfileData,setProfileData
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
