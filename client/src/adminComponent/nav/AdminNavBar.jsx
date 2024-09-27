import React, { useContext } from 'react' 
import './AdminNavBar.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import axios from '../../helper/axios'

export default function AdminNavBar({open}) { 
  let {user,dispatch} = useContext(AuthContext)
  let navigate = useNavigate()
  let superAdmin = user?.role?.role === 'superadmin'

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
          <NavLink to={'/admin/dashboard'} className={({isActive})=>`text-[18px] cursor-pointer my-5 flex items-center transition-all duration-300 
                                      ${isActive ? 'text-gray-200' : 'text-gray-500  hover:text-gray-200'}
                                      `}>
            <i className="fa-solid fa-gauge me-5 "></i> Dashboard
          </NavLink>

          <NavLink to={'/admin/adminlist'} className={({isActive})=>`text-[18px] cursor-pointer my-5 flex items-center transition-all duration-300 
                                      ${isActive ? 'text-gray-200' : 'text-gray-500  hover:text-gray-200'}
                                      `}>
            <i className="fa-solid fa-users me-5"></i>Agent List
          </NavLink>

          <NavLink to={'/admin/userlist'} className={({isActive})=>`text-[18px] cursor-pointer my-5 flex items-center transition-all duration-300 
                                      ${isActive ? 'text-gray-200' : 'text-gray-500  hover:text-gray-200'}
                                      `}>
            <i className="fa-solid fa-users me-5"></i>User List
          </NavLink>

          <NavLink to={'/admin/properties'} className={({isActive})=>`text-[18px] cursor-pointer my-5 flex items-center transition-all duration-300 
                                      ${isActive ? 'text-gray-200' : 'text-gray-500  hover:text-gray-200'}
                                      `}>
            <i class="fa-solid fa-house-chimney me-5"></i>Properties
          </NavLink>
              
          <button onClick={LogoutSubmit} className={`text-[18px] cursor-pointer my-5 flex items-center transition-all duration-300 text-gray-500 hover:text-gray-200 '}
                                      `}>
            <i className="fa-solid fa-right-from-bracket me-5"></i>Logout
          </button>
        </div>
      </div>
    </div>

    
    </>
  )
}
