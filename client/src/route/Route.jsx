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
import AdminProperties from '../adminPage/AdminProperties'




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
                    element : !isAdmin && <Home/>
                },
                {
                    path : '/about',
                    element :!isAdmin && <About/>
                },
                {
                    path : '/agent',
                    element : !isAdmin && <Agent/>
                },
                {
                    path : '/services',
                    element : !isAdmin && <Services/>
                },
                {
                    path : '/properties',
                    element : !isAdmin && <Properties/>
                },
                {
                    path : '/contact',
                    element : !isAdmin && <Contact/>
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
                },
                {
                    path : '/admin/properties',
                    element : isAdmin ? <AdminProperties/> : <ErrorPage/>
                }
            ]
        }
    ])
  return (
    <RouterProvider router={router} />
  )
}
