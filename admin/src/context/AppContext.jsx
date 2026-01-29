import { createContext, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useEffect } from "react"

export const AppContext = createContext()

const AppContextProvider = ({ children }) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL
  const [token, setToken] = useState(localStorage.getItem("token") || "")
  const [userData, setUserData] = useState(null)

  // Add calculateAge function
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return 'N/A';
    
    try {
      const birthDate = new Date(dateOfBirth);
      if (isNaN(birthDate.getTime())) {
        return 'N/A';
      }
      
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      return age;
    } catch (error) {
      console.error('Error calculating age:', error);
      return 'N/A';
    }
  };
  useEffect(() => {
  const storedToken = localStorage.getItem("token");

  if (storedToken) {
    setToken(storedToken);
  } else {
    localStorage.removeItem("token");
    setToken("");
  }
}, []);


  // FIXED: Handle underscore date format "4_9_2025"
  const slotDateFormat = (dateString) => {
    if (!dateString) return 'N/A';
    
    console.log('Raw date string:', dateString); // For debugging
    
    try {
      // First, replace underscores with dashes or slashes
      let cleanedDate = dateString;
      
      // Replace underscores with dashes
      if (dateString.includes('_')) {
        cleanedDate = dateString.replace(/_/g, '-');
        console.log('After underscore replacement:', cleanedDate);
      }
      
      // Try to parse the date
      let date = new Date(cleanedDate);
      
      // If still invalid, try manual parsing for "4-9-2025" (D-M-YYYY)
      if (isNaN(date.getTime())) {
        const parts = cleanedDate.split('-');
        
        if (parts.length === 3) {
          // Handle "4-9-2025" format
          const day = parseInt(parts[0]);
          const month = parseInt(parts[1]) - 1; // Month is 0-indexed
          const year = parseInt(parts[2]);
          
          date = new Date(year, month, day);
          
          if (isNaN(date.getTime())) {
            // Try alternative format "9-4-2025" (M-D-YYYY)
            date = new Date(year, day - 1, month + 1);
          }
        }
      }
      
      if (isNaN(date.getTime())) {
        console.warn('Invalid date format:', dateString);
        return dateString; // Return original if can't parse
      }
      
      // Get day, month, and year
      const day = date.getDate();
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      
      // Get weekday
      const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const weekday = weekdayNames[date.getDay()];
      
      // Format: "Monday, January 15, 2024"
      return `${weekday}, ${month} ${day}, ${year}`;
      
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString || 'N/A';
    }
  };

  // Alternative: Simple format "15 Jan 2024"
  const slotDateFormatSimple = (dateString) => {
    if (!dateString) return 'N/A';
    
    try {
      // Replace underscores
      let cleanedDate = dateString;
      if (dateString.includes('_')) {
        cleanedDate = dateString.replace(/_/g, '-');
      }
      
      // Parse date
      let date = new Date(cleanedDate);
      
      if (isNaN(date.getTime())) {
        const parts = cleanedDate.split('-');
        if (parts.length === 3) {
          const day = parseInt(parts[0]);
          const month = parseInt(parts[1]) - 1;
          const year = parseInt(parts[2]);
          date = new Date(year, month, day);
        }
      }
      
      if (isNaN(date.getTime())) {
        return dateString;
      }
      
      const day = date.getDate();
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                         "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      
      return `${day} ${month} ${year}`;
      
    } catch (error) {
      return dateString || 'N/A';
    }
  };

  // Currency symbol
  const currency = '₹';

  const bookAppointment = async (data) => {
    try {
      const res = await axios.post(
        backendURL + "/api/user/book-appointment",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (res.data.success) {
        toast.success(res.data.message)
      } else {
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
  }

  // Load user profile data function
  const loadUserProfileData = async () => {
    if (!token) return;
    
    try {
      const response = await axios.get(
        backendURL + "/api/user/get-profile",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      if (response.data.success) {
        setUserData(response.data.user);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setToken("");
      }
    }
  };

  // Logout function
  const logout = () => {
    setToken("");
    setUserData(null);
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
  };

  const value = {
    backendURL,
    token,
    setToken,
    userData,
    setUserData,
    bookAppointment,
    calculateAge,
    slotDateFormat, // Main function
    slotDateFormatSimple, // Simple version
    currency,
    loadUserProfileData,
    logout
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider