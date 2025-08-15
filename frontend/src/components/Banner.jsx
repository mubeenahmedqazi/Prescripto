import React from 'react'
import { useNavigate } from 'react-router-dom' // ✅ Import added
import { assets } from '../assets/assets'

const Banner = () => {
  const navigate = useNavigate()

  return (
    <div className="relative w-full">
      {/* Blue Gradient Background */}
      <div className="flex items-center justify-between bg-indigo-500 rounded-xl p-8 md:p-14 lg:p-20 overflow-hidden">
        
        {/* Left Side: Text + Button */}
        <div className="flex flex-col justify-center text-white max-w-xl z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Book Appointment
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl mt-4">
            With 100+ Trusted Doctors
          </h2>
          <button
            onClick={() => {
              navigate('/login')
              window.scrollTo(0, 0) // ✅ Proper function
            }}
            className="mt-6 bg-white text-blue-600 px-6 py-2 rounded-full text-sm font-semibold w-fit 
  hover:bg-gray-100 hover:shadow-md hover:-translate-y-1 
  transition-all duration-300 transform"
          >
            Create account
          </button>
        </div>

        {/* Right-side spacing only */}
        <div className="hidden md:block md:w-[250px] lg:w-[320px]" />
      </div>

      {/* Doctor Image Positioned Outside the Blue Banner */}
      <img
        src={assets.appointment_img}
        alt="Doctor"
        className="hidden md:block absolute bottom-0 right-[-10px] w-[280px] lg:w-[350px] z-20"
      />
    </div>
  )
}

export default Banner
