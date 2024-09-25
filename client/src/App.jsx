import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useNavigation } from 'react-router-dom'
import NavBar from './component/nav/NavBar'
import ScrollToTop from './component/scroll/ScrollToTop'
import Footer from './component/footer/Footer'
import Skeleton from './component/skeleton/Skeleton'
import { AuthContext } from './context/AuthContext'
import './index.css'
import AdminNavBar from './adminComponent/nav/AdminNavBar'
import AdminNavHeader from './adminComponent/nav/AdminNavHeader'

export default function App() {
  const [loading,setLoading] = useState(true)
  const navigate = useNavigation()
  const [open,setOpen] = useState(true)
  const {user} = useContext(AuthContext)
  const isAdmin = user?.role?.role === 'superadmin' || user?.role?.role === 'admin'

  const toggle = () =>{
    setOpen(!open)
  }

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setLoading(false)
    },500)
    return () => clearTimeout(timer)
  },[navigate.state])
  if(loading){
    return (
      <Skeleton/>
    )
  }
  return (
        <>
        {
          isAdmin ? (
            <div className="App h-screen overflow-hidden">
              <AdminNavBar open={open} />
              <div className="flex flex-col w-full h-full">
                <AdminNavHeader toggle={toggle} />
                <div className="flex-1 overflow-auto">
                  <Outlet />
                </div>
              </div>
            </div>
          ) : (
          <div className="">
            <NavBar/>
            <Outlet/>
            <ScrollToTop/>
            <Footer/>
          </div>
          )
        }
          
        </>
  )
}
