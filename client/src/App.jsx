import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './component/nav/NavBar'
import ScrollToTop from './component/scroll/ScrollToTop'
import Footer from './component/footer/Footer'

export default function App() {
  return (
    <>
      <NavBar/>
      <Outlet/>
      <ScrollToTop/>
      <Footer/>
    </>
  )
}
