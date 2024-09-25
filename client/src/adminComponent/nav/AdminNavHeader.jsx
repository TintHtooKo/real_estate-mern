import React, { useContext } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import User from '../../assets/user.svg'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

export default function AdminNavHeader({toggle}) {
    const {dispatch} = useContext(AuthContext)
    const [openProfile,setOpenProfile] = useState(false)
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
    const toggleProfile = () =>{
        setOpenProfile(!openProfile)
    }

    const closeProfile = () =>{ setOpenProfile(false)}

    const LogoutSubmit = async () => {
      let res = await axios.post('/user/logout')
      if (res.status == 200) {
        dispatch({ type: 'LOGOUT' })
        navigate('/login')
      }
    }

  return (
    <div className=' adheader p-4 flex items-center justify-between bg-white shadow-md  border-b border-gray-300 w-full'>
        <i className='fa fa-bars text-2xl cursor-pointer mx-2' onClick={toggle}></i>
        <div>

          <div className="adprofile flex relative items-center">
              <h4 className='text-gray-500 me-3'>{user.fullname}</h4>
              <img src={User} alt="" className='w-[33px] rounded-full cursor-pointer' onClick={toggleProfile} />
          </div>
          <ul className={` transition-all duration-300 bg-white absolute top-[65px] right-5 border p-5 px-10 flex flex-col gap-4 text-gray-400 rounded shadow-sm ${openProfile ? 'opacity-100' : 'opacity-0'}`}>
            <li className='hover:text-gray-700'><Link to={'/admin/dashboard'} onClick={closeProfile}>Profile</Link></li>
            <li className='hover:text-gray-700'><Link to={'/admin/dashboard'} onClick={closeProfile}>Change Password</Link></li>
            <li className='hover:text-gray-700'><button onClick={LogoutSubmit}>Logout</button></li>
          </ul>
        </div>
        
    </div>
  )
}
