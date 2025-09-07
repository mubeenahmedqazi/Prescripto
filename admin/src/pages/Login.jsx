import React, { useState, useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Login = () => {
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setAToken, backendURL } = useContext(AdminContext)
  const { setDToken } = useContext(DoctorContext)
  const navigate = useNavigate()

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendURL + '/api/admin/login', { email, password })
        if (data.success) {
          localStorage.setItem('AToken', data.token)
          setAToken(data.token)
          navigate('/admin-dashboard')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendURL + '/api/doctor/login', { email, password })
        if (data.success) {
          localStorage.setItem('DToken', data.token)
          setDToken(data.token)
          navigate('/doctor-dashboard')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600 px-4">
      
      {/* Logo at top-left */}
      <div className="absolute top-4 left-4">
        <img
          src={assets.admin_logo}
          alt="Logo"
          className="w-32 sm:w-40 md:w-48 cursor-pointer bg-white p-2 rounded-lg shadow"
        />
      </div>

      {/* Login Form */}
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-5 w-full max-w-sm sm:max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-10"
      >
        {/* Title */}
        <p className="text-xl sm:text-2xl font-semibold text-center text-gray-800">
          <span className="text-indigo-600">{state}</span> Login
        </p>

        {/* Email */}
        <div className="w-full">
          <label className="block text-gray-700 text-sm font-medium">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-gray-300 rounded-md w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Password */}
        <div className="w-full">
          <label className="block text-gray-700 text-sm font-medium">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-gray-300 rounded-md w-full p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Button */}
        <button className="bg-indigo-600 hover:bg-indigo-700 transition text-white w-full py-2 rounded-md text-base font-medium shadow-md">
          Login
        </button>

        {/* Switch Login */}
        <p className="text-sm text-center text-gray-600">
          {state === 'Admin' ? (
            <>
              Doctor Login?{' '}
              <span
                className="text-indigo-600 hover:text-indigo-800 underline cursor-pointer font-medium"
                onClick={() => setState('Doctor')}
              >
                Click here
              </span>
            </>
          ) : (
            <>
              Admin Login?{' '}
              <span
                className="text-indigo-600 hover:text-indigo-800 underline cursor-pointer font-medium"
                onClick={() => setState('Admin')}
              >
                Click here
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  )
}

export default Login
