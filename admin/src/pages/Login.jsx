import React, { useState, useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setAToken, backendURL } = useContext(AdminContext)
  const { setDToken } = useContext(DoctorContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendURL + '/api/admin/login', { email, password })
        if (data.success) {
          localStorage.setItem('AToken', data.token)
          setAToken(data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendURL + '/api/doctor/login', { email, password })
        if (data.success) {
          localStorage.setItem('DToken', data.token)
          setDToken(data.token)
          console.log(data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-[100vh] flex items-center justify-center bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-600"
    >
      <div className="flex flex-col gap-5 m-auto items-start p-10 min-w-[340px] sm:min-w-[400px] bg-white rounded-2xl shadow-xl border border-gray-100">
        {/* Title */}
        <p className="text-2xl font-semibold m-auto text-gray-800">
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
        {state === 'Admin' ? (
          <p className="text-sm text-gray-600">
            Doctor Login?{' '}
            <span
              className="text-indigo-600 hover:text-indigo-800 underline cursor-pointer font-medium"
              onClick={() => setState('Doctor')}
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-sm text-gray-600">
            Admin Login?{' '}
            <span
              className="text-indigo-600 hover:text-indigo-800 underline cursor-pointer font-medium"
              onClick={() => setState('Admin')}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  )
}

export default Login
