import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import './NavBar.css'
import { AuthContext } from '../../context/AuthContext'
import Profile from '../../assets/user.svg'
import axios from '../../helper/axios'

export default function NavBar() {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(!open)
  const handleCloseMenu = () => setOpen(false)
  const { user, dispatch } = useContext(AuthContext)
  const navigate = useNavigate()

  const LogoutSubmit = async () => {
    let res = await axios.post('/user/logout')
    if (res.status == 200) {
      dispatch({ type: 'LOGOUT' })
      handleCloseMenu()
      navigate('/login')
    }
  }

  return (
    <>
      <nav className='flex items-start p-5 justify-between '>
        <div className=" font-bold text-3xl">
          <Link to='/'>LOGO </Link>
        </div>
        <div className="">
          <ul className='flex gap-10 menu'>
            <li><NavLink className={({ isActive }) => `${isActive ? 'text-pink-500' : 'text-black hover:text-pink-500'}`} to='/'>Home</NavLink ></li>
            <li><NavLink className={({ isActive }) => `${isActive ? 'text-pink-500' : 'text-black hover:text-pink-500'}`} to='/about'>About</NavLink ></li>
            <li><NavLink className={({ isActive }) => `${isActive ? 'text-pink-500' : 'text-black hover:text-pink-500'}`} to='/agent'>Agent</NavLink ></li>
            <li><NavLink className={({ isActive }) => `${isActive ? 'text-pink-500' : 'text-black hover:text-pink-500'}`} to='/services'>Services</NavLink ></li>
            <li><NavLink className={({ isActive }) => `${isActive ? 'text-pink-500' : 'text-black hover:text-pink-500'}`} to='/properties'>Properties</NavLink ></li>
            <li><NavLink className={({ isActive }) => `${isActive ? 'text-pink-500' : 'text-black hover:text-pink-500'}`} to='/contact'>Contact</NavLink ></li>
          </ul>
        </div>

        {user && (
          <div className=" logout">
            {/* <img src={Profile} className=' w-[50px] cursor-pointer' alt="" /> */}
            <button onClick={LogoutSubmit}>Logout</button>
          </div>
        )}

        {!user && (
          <div className="nav-btn bg-pink-500 p-3 rounded shadow-md text-white transition-all duration-300 hover:shadow-xl">
            <Link to='/login'>
              Get Started
            </Link>
          </div>
        )}


        {/* mobile menu  */}
        <div className="mob">
          <i className="fa-solid fa-bars text-2xl cursor-pointer" onClick={toggle}></i>
        </div>

      </nav>
      <div className={`mob-menu  ${open ? 'open' : ''}`}>
        <NavLink className={({ isActive }) => `${isActive ? 'text-pink-500' : 'text-white '}`} to='/' onClick={handleCloseMenu}>Home</NavLink>
        <NavLink className={({ isActive }) => `${isActive ? 'text-pink-500' : 'text-white '}`} to='/about' onClick={handleCloseMenu}>About</NavLink>
        <NavLink className={({ isActive }) => `${isActive ? 'text-pink-500' : 'text-white '}`} to='/agent' onClick={handleCloseMenu}>Agent</NavLink>
        <NavLink className={({ isActive }) => `${isActive ? 'text-pink-500' : 'text-white '}`} to='/services' onClick={handleCloseMenu}>Services</NavLink>
        <NavLink className={({ isActive }) => `${isActive ? 'text-pink-500' : 'text-white '}`} to='/properties' onClick={handleCloseMenu}>Properties</NavLink>
        <NavLink className={({ isActive }) => `${isActive ? 'text-pink-500' : 'text-white '}`} to='/contact' onClick={handleCloseMenu}>Contact</NavLink>
        <div className=" bg-pink-500 rounded p-1 shadow-md text-white">
          {!user && (<Link to='/login' onClick={handleCloseMenu}>
            Get Started
          </Link>)}
          {!!user && (
            <button onClick={LogoutSubmit}>Logout</button>
          )}
        </div>
      </div>
    </>
  )
}
