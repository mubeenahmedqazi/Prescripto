import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { LogOut } from "lucide-react";

// ✅ Export AppContext properly
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: { line1: "", line2: "" },
    gender: "Not Selected",
    dob: "",
    image: "",
  });

  // ✅ Use null when not logged in
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // 🌐 Backend URL
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // 🟢 Load all doctors
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        console.error("Failed to fetch doctors:", data.message);
        toast.error(data.message || "Failed to load doctors");
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error("Error fetching doctors");
    }
  };

  // 🟢 Load user profile if logged in
  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
        headers: { token },
      });
      if (data.success) {
        setUserData(data.userData);
      }
    } catch (error) {
      console.error("Error loading profile:", error);
      toast.error("Error loading profile");
    }
  };

  // 🔄 Effect: load doctors + user profile (if logged in)
  useEffect(() => {
    getDoctorsData();

    if (token && token !== "false") {
      loadUserProfileData();
    } else {
      // Reset user data on logout
      setUserData({
        name: "",
        email: "",
        phone: "",
        address: { line1: "", line2: "" },
        gender: "Not Selected",
        dob: "",
        image: "",
      });
    }
  }, [token]);

  const value = {
    doctors,
    setDoctors,
    userData,
    setUserData,
    token,
    setToken,
    backendUrl,
    LogOut,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
