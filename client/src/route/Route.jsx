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
import PropertyType from '../adminPage/PropertyType'
import AddProperty from '../adminComponent/addProperty/AddProperty'
import AdminPropertyDetail from '../adminComponent/propertyDetail/AdminPropertyDetail'
import AdminProfile from '../adminPage/AdminProfile'
import AdChangePw from '../adminComponent/adChangePw/AdChangePw'
import AdEditProfile from '../adminComponent/adEditProfile/AdEditProfile'





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
                },
                {
                    path : '/admin/protype',
                    element : isAdmin ? <PropertyType/> : <ErrorPage/>
                },
                {
                    path : '/admin/add/property',
                    element : isAdmin ? <AddProperty/> : <ErrorPage/>
                },
                {
                    path : '/admin/property/:id',
                    element : isAdmin ? <AdminPropertyDetail/> : <ErrorPage/>
                },
                {
                    path : '/admin/add/property/:id',
                    element : isAdmin ? <AddProperty/> : <ErrorPage/>
                },
                {
                    path : '/admin/profile',
                    element : isAdmin ? <AdminProfile/> : <ErrorPage/>
                },
                {
                    path : '/admin/changepw',
                    element : isAdmin ? <AdChangePw/> : <ErrorPage/>
                },
                {
                    path : '/admin/edit/profile',
                    element: isAdmin ? <AdEditProfile/> : <ErrorPage/>
                }
                
            ]
        }
    ])
  return (
    <RouterProvider router={router} />
  )
}
