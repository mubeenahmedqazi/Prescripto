import React, { createContext } from "react";
import { useState } from "react";

export const AdminContext=createContext()
const AdminContextProvider=(props)=>{

    const [aToken,setAToken]=useState (localStorage.getItem('AToken')?localStorage.getItem('AToken'):'')
    const backendURL=import.meta.env.VITE_BACKEND_URL
    const value={
        aToken,setAToken,
        backendURL,

    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider