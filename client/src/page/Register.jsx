import React from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <div className="">
      <h1 className=' text-[2rem] mb-4 text-center'>Register</h1>
      <div className=" flex items-center justify-center">
        <form action="">
            <div className=" flex flex-col items-start mb-8">
                <label htmlFor="" className=' text-gray-500 font-bold ms-2'>Full Name</label>
                <input type="text" className=' border-b border-r rounded-full p-2 px-4 w-[20rem] text-gray-700 outline-none shadow-md' placeholder='John Doe'/>
            </div>

            <div className=" flex flex-col items-start mb-8">
                <label htmlFor="" className=' text-gray-500 font-bold ms-2'>Email</label>
                <input type="email" className=' border-b border-r rounded-full p-2 px-4 w-[20rem] text-gray-700 outline-none shadow-md' placeholder='john@gamil.com'/>
            </div>

            <div className=" flex flex-col items-start mb-8">
                <label htmlFor="" className=' text-gray-500 font-bold ms-2'>Phone</label>
                <input type="text" className=' border-b border-r rounded-full p-2 px-4 w-[20rem] text-gray-700 outline-none shadow-md' placeholder='+971 123 456 789'/>
            </div>

            <div className=" flex flex-col items-start mb-8">
                <label htmlFor="" className=' text-gray-500 font-bold ms-2'>Password</label>
                <input type="password" className=' border-b border-r rounded-full p-2 px-4 w-[20rem] text-gray-700 outline-none shadow-md' placeholder='********'/>
            </div>

            <div className=" flex flex-col items-start mb-8">
                <label htmlFor="" className=' text-gray-500 font-bold ms-2'>Confirm Password</label>
                <input type="password" className=' border-b border-r rounded-full p-2 px-4 w-[20rem] text-gray-700 outline-none shadow-md' placeholder='********'/>
            </div>

            <div className=" flex flex-col items-start mb-8">
                <button type="submit" className=' bg-pink-500 text-white rounded-full p-2 px-4 w-[20rem] outline-none shadow-md transition-all duration-300 hover:shadow-pink-800'>Register</button>
            </div>

            <div className=" flex flex-col items-start mb-8">
                <p className=' text-gray-500 ms-2'>Have you already register ?<Link to="/login"><span className="text-pink-500 underline ms-2">Login</span></Link></p>
            </div>
        </form>
      </div>
    </div>
  )
}
