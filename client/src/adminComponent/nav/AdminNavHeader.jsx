import React, { useContext, useState } from 'react'
import User from '../../assets/user.svg'
import { AuthContext } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../helper/axios'
import './AdminNavBar.css'
export default function AdminNavHeader({toggle}) {
    let {user,dispatch} = useContext(AuthContext)
    let navigate = useNavigate()
    let [open,setOpen] = useState(false)
    const toggleMenu = () => {
      setOpen(!open)
    }

    const menuClose = () => {
      setOpen(false)
    }

    const LogoutSubmit = async () => {
      let res = await axios.post('/user/logout')
      if (res.status == 200) {
        setOpen(false)
        dispatch({ type: 'LOGOUT' })
        navigate('/login')
      }
    } 

  return (
    <>
    <div className=' adheader p-4 flex items-center justify-between bg-white shadow-md  border-b border-gray-300 w-full'>
        <i className='fa fa-bars hideicon text-2xl cursor-pointer mx-2' onClick={toggle}></i>
        <i className='fa fa-bars md:hidden text-2xl cursor-pointer mx-2' onClick={toggleMenu} ></i>
        <div>

          <Link to={'/admin/profile'}>
            <div className="adprofile flex relative items-center">
                <h4 className='text-gray-500 me-3'>{user.fullname}</h4>
                {
                  user.profile ?
                   <img src={import.meta.env.VITE_BACKEND_URL_ACCESS + user.profile} className='w-[33px] rounded-full cursor-pointer' /> 
                   : 
                   <img src={User} alt="" className='w-[33px] rounded-full cursor-pointer' />
                }
            </div>
          </Link>
        </div>        
    </div>

    {/* for tablet and mobile size . This is for admin nav bar*/}
    <div className={`admin-nav-res transition-all duration-300 overflow-auto lg:hidden bg-[#070922] w-full ${open ? 'h-[15rem]' : 'h-0'}`}>
      <div className=" text-white">
        <ul className='flex flex-col gap-5 items-center p-5 text-md '>
          <li><Link to={'/admin/dashboard'} onClick={menuClose}>Dashboard</Link></li>
          <li><Link to={'/admin/adminlist'} onClick={menuClose}>Admin List</Link></li>
          <li><Link to={'/admin/userlist'} onClick={menuClose}>User List</Link></li>
          <li><Link to={'/admin/properties'} onClick={menuClose}>Properties</Link></li>
          <li><Link to={'/admin/apointment'} onClick={menuClose}>Apointment</Link></li>
          <li><Link to={'/admin/contact'} onClick={menuClose}>Contact Message</Link></li>
          <li><button onClick={LogoutSubmit}>Logout</button></li>
        </ul>
      </div>
    </div>
    </>
  )
}
