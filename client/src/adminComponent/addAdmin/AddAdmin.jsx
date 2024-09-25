import React from 'react'
import Spinner from '../../assets/spinner.svg'

export default function AddAdmin() {
  return (
    <div className=" mt-3">
      <h1 className=' text-[2rem] mb-4 text-center'>Add New Admin</h1>
      <div className=" flex items-center justify-center">
        <form action="" className='register'>
            <div className=" flex flex-col items-start mb-8">
                <label htmlFor="" className=' text-gray-500 font-bold ms-2'>Full Name</label>
                <input type="text"  className=' border-b border-r rounded-full p-2 px-4 w-[30rem] text-gray-700 outline-none shadow-md' placeholder='John Doe'/>
            </div>

            <div className=" flex flex-col items-start mb-8">
                <label htmlFor="" className=' text-gray-500 font-bold ms-2'>Email</label>
                <input type="email" className=' border-b border-r rounded-full p-2 px-4 w-[30rem] text-gray-700 outline-none shadow-md' placeholder='john@gamil.com'/>
            </div>

            <div className=" flex flex-col items-start mb-8">
                <label htmlFor="" className=' text-gray-500 font-bold ms-2'>Phone</label>
                <input type="text"  className=' border-b border-r rounded-full p-2 px-4 w-[30rem] text-gray-700 outline-none shadow-md' placeholder='+971 123 456 789'/>
            </div>

            <div className=" flex flex-col items-start mb-8">
                <label htmlFor="" className=' text-gray-500 font-bold ms-2'>Password</label>
                <input type="password"  className=' border-b border-r rounded-full p-2 px-4 w-[30rem] text-gray-700 outline-none shadow-md' placeholder='********'/>
            </div>

            <div className=" flex flex-col items-start mb-8">
                <label htmlFor="" className=' text-gray-500 font-bold ms-2'>Confirm Password</label>
                <input type="password"  className=' border-b border-r rounded-full p-2 px-4 w-[30rem] text-gray-700 outline-none shadow-md' placeholder='********'/>
            </div>

            <div className=" flex items-center mb-8">
                <button type="submit" className=' bg-pink-500 flex items-center justify-center gap-5 text-white rounded-full p-2 px-4 w-full outline-none shadow-md transition-all duration-300 hover:shadow-pink-800'>
                  {/* {
                    loading && <img src={Spinner} alt="" />
                  } */}
                  Add
                </button>
            </div>
        </form>
      </div>
    </div>
  )
}
