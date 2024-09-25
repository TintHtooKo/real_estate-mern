import React from 'react' 
import './AdminNavBar.css'
import { NavLink } from 'react-router-dom'

export default function AdminNavBar({open}) {
  return (
    <div className={` admin-nav transition-all duration-300  h-screen overflow-auto border-r border-gray-600 bg-[#070922] ${open ? 'open' : 'closed'}`}>
      <div className="">
        <div className='logo border-b border-gray-600 w-full p-4'>
          <h1 className='text-gray-200 text-2xl font-bold cursor-pointer'>LOGO</h1>
        </div>
        <div className=' ms-3 flex flex-col'>
          <NavLink to={'/admin/dashboard'} className={({isActive})=>`text-[18px] cursor-pointer my-5 flex items-center transition-all duration-300 
                                      ${isActive ? 'text-gray-200' : 'text-gray-500  hover:text-gray-200'}
                                      `}>
            <i className="fa-solid fa-gauge me-5 "></i> Dashboard
          </NavLink>
          <NavLink to={'/admin/userlist'} className={({isActive})=>`text-[18px] cursor-pointer my-5 flex items-center transition-all duration-300 
                                      ${isActive ? 'text-gray-200' : 'text-gray-500  hover:text-gray-200'}
                                      `}>
            <i className="fa-solid fa-table-list me-5"></i>User List
          </NavLink>
          <NavLink to={'/admin/adminlist'} className={({isActive})=>`text-[18px] cursor-pointer my-5 flex items-center transition-all duration-300 
                                      ${isActive ? 'text-gray-200' : 'text-gray-500  hover:text-gray-200'}
                                      `}>
            <i className="fa-solid fa-table-list me-5"></i>Admin List
          </NavLink>
        </div>
      </div>
    </div>
  )
}
