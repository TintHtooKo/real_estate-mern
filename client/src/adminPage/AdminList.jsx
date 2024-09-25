import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminList() {
  return (
    <div className=' mx-10'>
        <div className="my-5 text-center text-3xl font-semibold">Admin List</div>
            <div className=" flex items-center justify-between">
                <div className="">
                    <Link to={'/admin/addadmin'}><i className='fa-solid fa-plus me-3 border p-2 bg-green-500 text-white rounded-md shadow-md transition-all duration-300 hover:bg-slate-700 hover:text-white'></i></Link>
                </div>
                <div className="">
                    <input type="search" name="" className='border border-neutral-200 outline-none shadow-md py-1 rounded-md px-3' id="" />
                    <button className=' ms-3 border p-1 bg-neutral-200 rounded-md shadow-md transition-all duration-300 hover:bg-slate-700 hover:text-white'><i className='fa-solid fa-magnifying-glass'></i></button>
                </div>
            </div>
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                    <table
                    className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                    <thead
                        className="border-b border-neutral-200 font-medium dark:border-white/10">
                        <tr>
                        <th scope="col" className="px-6 py-4">No</th>
                        <th scope="col" className="px-6 py-4">Full Name</th>
                        <th scope="col" className="px-6 py-4">Email</th>
                        <th scope="col" className="px-6 py-4">Phone</th>
                        <th scope="col" className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {
                            user.map((user,index)=>(
                                <tr key={index}
                                className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-600">
                                <td className="whitespace-nowrap px-6 py-4 font-medium">{index+1}</td>
                                <td className="whitespace-nowrap px-6 py-4">{user.fullname}</td>
                                <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
                                <td className="whitespace-nowrap px-6 py-4">{user.phone}</td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <button className="text-red-500 hover:text-red-600"><i className="fa-solid fa-trash"></i></button>
                                </td>
                                </tr>
                            ))
                        } */}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}
