import React, { useContext } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '../App'
import Home from '../page/Home'
import About from '../page/About'
import Agent from '../page/Agent'
import Services from '../page/Services'
import Properties from '../page/Properties'
import Contact from '../page/Contact'
import Login from '../page/Login'
import Register from '../page/Register'
import AdminDashboard from '../adminPage/adminDashboard'
import { AuthContext } from '../context/AuthContext'
import ErrorPage from '../component/404/404page'
import UserList from '../adminPage/UserList'
import AdminList from '../adminPage/AdminList'
import AddAdmin from '../adminComponent/addAdmin/AddAdmin'




export default function Route() {
    const {user} = useContext(AuthContext)
    let isAdmin = user?.role?.role === 'superadmin' || user?.role?.role === 'admin'
    
    
    const router = createBrowserRouter([
        {
            path : '/',
            element : <App/>,
            children : [
                {
                    path : '/',
                    element : <Home/>
                },
                {
                    path : '/about',
                    element : <About/>
                },
                {
                    path : '/agent',
                    element : <Agent/>
                },
                {
                    path : '/services',
                    element : <Services/>
                },
                {
                    path : '/properties',
                    element : <Properties/>
                },
                {
                    path : '/contact',
                    element : <Contact/>
                },
                {
                    path : '/login',
                    element : !user && <Login/>
                },
                {
                    path : '/register',
                    element : !user && <Register/>
                },
                {
                    path  : '/admin/dashboard',
                    element : isAdmin ?  <AdminDashboard/> : <ErrorPage/> 
                },
                {
                    path : '/admin/userlist',
                    element : isAdmin ? <UserList/> : <ErrorPage/>
                },
                {
                    path : '/admin/adminlist',
                    element : isAdmin ? <AdminList/> : <ErrorPage/>
                },
                {
                    path : '/admin/addadmin',
                    element : isAdmin ? <AddAdmin/> : <ErrorPage/>
                }
            ]
        }
    ])
  return (
    <RouterProvider router={router} />
  )
}
