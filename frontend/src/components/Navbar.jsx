import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setShowDropdown(false);
    navigate("/"); 
    window.location.reload(); // reload page so "Create Account" appears
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 px-4 md:px-8">
      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        className="w-32 md:w-44 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/"><li className="py-1">HOME</li></NavLink>
        <NavLink to="/doctors"><li className="py-1">ALL DOCTORS</li></NavLink>
        <NavLink to="/about"><li className="py-1">ABOUT</li></NavLink>
        <NavLink to="/contect"><li className="py-1">CONTACT</li></NavLink>
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-4 relative">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer relative">
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={userData.image}
              alt="Profile"
              onClick={() => setShowDropdown((prev) => !prev)}
            />
            <img
              className="w-2.5"
              src={assets.dropdown_icon}
              alt="Dropdown"
              onClick={() => setShowDropdown((prev) => !prev)}
            />

            {/* Dropdown */}
            {showDropdown && (
              <div className="absolute top-12 right-0 text-base font-medium text-gray-600 z-20 bg-stone-100 rounded shadow-lg p-4 flex flex-col gap-3">
                <p
                  onClick={() => {
                    navigate("/my-profile");
                    setShowDropdown(false);
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => {
                    navigate("/my-appointments");
                    setShowDropdown(false);
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={logout}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 text-white px-5 py-2 rounded-full text-sm"
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu Button */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="Menu"
        />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 sm:w-1/2 bg-white z-30 shadow-lg transform transition-transform duration-300 ${
          showMenu ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-6 border-b">
          <img className="w-32" src={assets.logo} alt="Logo" />
          <img
            className="w-7 cursor-pointer"
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            alt="Close"
          />
        </div>

        <ul className="flex flex-col items-center gap-4 mt-6 text-lg font-medium">
          <NavLink onClick={() => setShowMenu(false)} to="/">HOME</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/doctors">ALL DOCTORS</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/about">ABOUT</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/contect">CONTACT</NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
