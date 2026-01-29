import { createContext, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

export const AppContext = createContext()

const AppContextProvider = ({ children }) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL
  const [token, setToken] = useState(localStorage.getItem("token") || "")
  const [userData, setUserData] = useState(null)

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

  const value = {
    backendURL,
    token,
    setToken,
    userData,
    setUserData,
    bookAppointment
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
