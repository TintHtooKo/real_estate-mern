import React, { useContext, useEffect, useState } from 'react' 
import './AdminNavBar.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import axios from '../../helper/axios'

export default function AdminNavBar({open}) { 
  let {user,dispatch} = useContext(AuthContext)
  let navigate = useNavigate()
  let [unread,setUnread] = useState(0)
  let [msgUnread,setMsgUnread] = useState(0)
  let superAdmin = user?.role?.role === 'superadmin'

  useEffect(()=>{
    let fetchMsg = async()=>{
      let res = await axios.get('/contact')
      let unreadCount = res.data.filter(message => !message.read).length;
      setMsgUnread(unreadCount);
    }
    fetchMsg()
  })

  useEffect(()=>{
    let fetchApoint = async()=>{
      let res = await axios.get('/apoint')
      let unreadCount = res.data.filter(apoint => !apoint.read).length;
      setUnread(unreadCount);
    }
    fetchApoint()
  },[])

  const LogoutSubmit = async () => {
    let res = await axios.post('/user/logout')
    if (res.status == 200) {
      dispatch({ type: 'LOGOUT' })
      navigate('/login')
    }
  } 
  return (
    <>
    {/* for desktop size */}
      <div className={` admin-nav transition-all duration-300  h-screen overflow-auto border-r border-gray-600 bg-[#070922] ${open ? 'open' : 'closed'}`}>
      <div className="">
        <div className='logo border-b border-gray-600 w-full p-4'>
          <h1 className='text-gray-200 text-2xl font-bold cursor-pointer'>LOGO</h1>
        </div>
        <div className=' ms-3 flex flex-col'>
          <NavLink to={'/admin/dashboard'} className={({isActive})=>`text-[18px] cursor-pointer my-4 flex items-center transition-all duration-300 
                                      ${isActive ? 'text-gray-200' : 'text-gray-500  hover:text-gray-200'}
                                      `}>
            <i className="fa-solid fa-gauge me-5 "></i> Dashboard
          </NavLink>

          <NavLink to={'/admin/adminlist'} className={({isActive})=>`text-[18px] cursor-pointer my-4 flex items-center transition-all duration-300 
                                      ${isActive ? 'text-gray-200' : 'text-gray-500  hover:text-gray-200'}
                                      `}>
            <i className="fa-solid fa-user-tie me-5"></i>Agent List
          </NavLink>

          <NavLink to={'/admin/userlist'} className={({isActive})=>`text-[18px] cursor-pointer my-4 flex items-center transition-all duration-300 
                                      ${isActive ? 'text-gray-200' : 'text-gray-500  hover:text-gray-200'}
                                      `}>
            <i className="fa-solid fa-users me-5"></i>User List
          </NavLink>

          <NavLink to={'/admin/properties'} className={({isActive})=>`text-[18px] cursor-pointer my-4 flex items-center transition-all duration-300 
                                      ${isActive ? 'text-gray-200' : 'text-gray-500  hover:text-gray-200'}
                                      `}>
            <i class="fa-solid fa-house-chimney me-5"></i>Properties
          </NavLink>

          <NavLink to={'/admin/protype'} className={({isActive})=>`text-[18px] cursor-pointer my-4 flex items-center transition-all duration-300 
                                      ${isActive ? 'text-gray-200' : 'text-gray-500  hover:text-gray-200'}
                                      `}>
            <i class="fa-solid fa-house-circle-check me-5"></i>Property Type
          </NavLink>

          <NavLink to={'/admin/apointment'}  className={({isActive})=>`text-[18px] cursor-pointer my-4 flex items-center transition-all duration-300 
                                      ${isActive ? 'text-gray-200' : 'text-gray-500  hover:text-gray-200'}
                                      `}>
            <i class="fa-solid fa-calendar-check me-5"></i>Apointment <span className=' ms-8 bg-red-600 px-2 rounded-full text-white'>{unread}</span>
          </NavLink>

          <NavLink to={'/admin/contact'}  className={({isActive})=>`text-[18px] cursor-pointer my-4 flex items-center transition-all duration-300 
                                      ${isActive ? 'text-gray-200' : 'text-gray-500  hover:text-gray-200'}
                                      `}>
            <i class="fa-solid fa-message me-5"></i>Contact Message <span className=' ms-8 bg-red-600 px-2 rounded-full text-white'>{msgUnread}</span>
          </NavLink>
              
          <button onClick={LogoutSubmit} className={`text-[18px] cursor-pointer my-4 flex items-center transition-all duration-300 text-gray-500 hover:text-gray-200 '}
                                      `}>
            <i className="fa-solid fa-right-from-bracket me-5"></i>Logout
          </button>
        </div>
      </div>
    </div>

    
    </>
  )
}
