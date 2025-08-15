import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-10 my-10 mt-40 text-sm'>

        {/* ---------Left Section------- */}
        <div className='text-center sm:text-left'>
          <img className='mb-5 w-40 mx-auto sm:mx-0' src={assets.logo} alt='' />
          <p className='text-gray-600 leading-6 sm:w-11/12'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
        </div>

        {/* ---------Center Section------- */}
        <div className='text-center'>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy Policy</li>
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
