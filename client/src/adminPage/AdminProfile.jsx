import React, { useContext } from 'react'
import Profile from './../assets/user.svg'
import {Link} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import './css/Dashboard.css'

export default function AdminProfile() {
  let {user} = useContext(AuthContext)
  return (
    <div className=" adprofile flex items-center m-24 gap-10">
      <div className="">
        {
          user.profile ? <img src={import.meta.env.VITE_BACKEND_URL_ACCESS + user.profile} className='w-[15rem] rounded' /> : <img src={Profile} className='w-[15rem] rounded-full' alt="" />
        }
      </div>

      <div className="">

        <div className=" flex items-start gap-4">
          <div className=" flex flex-col gap-3">
            <p>Email</p>
            <p>Name</p>
            <p>Phone</p>
          </div>
          <div className="flex flex-col gap-3">
            <p>:</p>
            <p>:</p>
            <p>:</p>
          </div>
          <div className="flex flex-col gap-3">
            <p>{user.email}</p>
            <p>{user.fullname}</p>
            <p>{user.phone}</p>
          </div>
        </div>

        <div className=" mt-5 flex gap-4">
          <Link to={'/admin/edit/profile'} className=' bg-pink-500 text-white rounded px-3 py-1 text-center'>Edit Profile</Link>
          <Link to={'/admin/changepw'} className=' bg-pink-500 text-white rounded px-3 py-1 text-center'>Change Password</Link>
        </div>
      </div>
    </div>
  )
}
