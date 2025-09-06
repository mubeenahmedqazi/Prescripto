import React from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-10 my-10 mt-40 text-sm'>

        {/* ---------Left Section------- */}
        <div className='text-center sm:text-left sm:border-r border-indigo-500 '>
          <img className='mb-5 w-40 mx-auto sm:mx-0 ' src={assets.logo} alt='' />
          <p className='text-gray-600 leading-6 sm:w-11/12'>
            Prescripto is a doctor appointment booking app that connects patients with trusted healthcare professionals. Patients can easily create accounts, book appointments, and manage their medical needs. Doctors can securely manage schedules and patient details. With simplicity and data security, Prescripto makes healthcare more accessible and reliable.
          </p>
        </div>

        {/* ---------Center Section------- */}
        <div className='text-center sm:border-r border-indigo-500  '>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <NavLink to='/' >
              <li
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="py-1 cursor-pointer hover:text-indigo-500 font-bold ">
                HOME
              </li>
              <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto" />

            </NavLink>
            <NavLink to='/about'>
              <li
                className="py-2  border-gray-200 hover:text-indigo-500 cursor-pointer font-bold"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                ABOUT
              </li>


            </NavLink>
            <NavLink
              to="/contect"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <li className="py-1 cursor-pointer hover:text-indigo-500 font-bold">
                CONTACT
              </li>
              <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto" />
            </NavLink>

            <NavLink
              to="/privacy-policy"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <li className="py-1 cursor-pointer hover:text-indigo-500 font-bold">
                PRIVACY POLICY
              </li>
              <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto " />
            </NavLink>

          </ul>
        </div>

        {/* ---------Right Section------- */}
        <div className='text-center sm:text'>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>0328-4161846</li>
            <li>ahmedqazimubeen@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* --------copyright text-------- */}
      <hr />
      <p className='py-5 text-sm text-center'>
        Copyright © 2025 MUBEEN TECHNOLOGIES - All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
