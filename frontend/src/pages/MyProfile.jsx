// src/components/MyProfile.jsx
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  // Handle selecting a new image
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setUserData(prev => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };

  // Update user profile

  if (!userData) return null;

  return (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      {/* Profile Image */}
      <div className='flex justify mt-2'>
        {isEdit ? (
          <label htmlFor='image' className='cursor-pointer relative'>
            <img
              className='w-48 h-48 object-cover rounded opacity-80'
              src={image ? URL.createObjectURL(image) : userData.image}
              alt='Profile'
            />
            <img
              className='w-10 absolute bottom-2 right-2'
              src={assets.upload_icon}
              alt='Upload'
            />
            <input
              type='file'
              id='image'
              accept='image/*'
              hidden
              onChange={handleImageChange}
            />
          </label>
        ) : (
          <img
            className='w-48 h-48 object-cover rounded'
            src={userData.image || null}
            alt='Profile'
          />
        )}
      </div>

      {/* Name */}
      {isEdit ? (
        <input
          className='bg-gray-50 text-3xl font-medium max-w-60 mt-4'
          type='text'
          value={userData.name}
          onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
        />
      ) : (
        <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      )}

      <hr className='bg-zinc-400 h-[1px] border-none' />

      {/* Contact Info */}
      <div>
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3'>
          <p className='font-medium'>Email:</p>
          <p className='text-blue-500'>{userData.email}</p>

          <p className='font-medium'>Phone:</p>
          {isEdit ? (
            <input
              className='bg-gray-100 max-w-52'
              type='text'
              value={userData.phone || ''}
              onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
            />
          ) : (
            <p className='text-blue-400'>{userData.phone}</p>
          )}

          <p className='font-medium'>Address:</p>
          {isEdit ? (
            <div>
              <input
                className='bg-gray-50 w-full mb-1'
                type='text'
                value={userData.address?.line1 || ''}
                onChange={e => setUserData(prev => ({
                  ...prev,
                  address: { ...prev.address, line1: e.target.value }
                }))}
              />
              <input
                className='bg-gray-50 w-full'
                type='text'
                value={userData.address?.line2 || ''}
                onChange={e => setUserData(prev => ({
                  ...prev,
                  address: { ...prev.address, line2: e.target.value }
                }))}
              />
            </div>
          ) : (
            <p className='text-gray-500'>
              {userData.address?.line1}<br />
              {userData.address?.line2}
            </p>
          )}
        </div>
      </div>

      {/* Basic Info */}
      <div>
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender</p>
          {isEdit ? (
            <select
              className='max-w-20 bg-gray-100'
              value={userData.gender || 'Not Selected'}
              onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))}
            >
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
              <option value='Not Selected'>Not Selected</option>
            </select>
          ) : (
            <p className='text-gray-400'>{userData.gender}</p>
          )}

          <p className='font-medium'>Birthday</p>
          {isEdit ? (
            <input
              className='max-w-28 bg-gray-100'
              type='date'
              value={userData.dob !== "Not Selected" ? userData.dob : ""}
              onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))}
            />
          ) : (
            <p className='text-gray-400'>{userData.dob}</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className='mt-4'>
        {isEdit ? (
          <button
            className='border border-indigo-500 px-8 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition-all'
            onClick={updateUserProfileData}
          >
            Save Information
          </button>
        ) : (
          <button
            className='border border-indigo-500 px-8 py-2 rounded-full hover:bg-indigo-500 hover:text-white transition-all'
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
