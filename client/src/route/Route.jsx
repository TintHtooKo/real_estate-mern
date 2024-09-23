import React from 'react'
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

export default function Route() {
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
                    element : <Login/>
                },
                {
                    path : '/register',
                    element : <Register/>
                }
            ]
        }
    ])
  return (
    <RouterProvider router={router} />
  )
}
