import axios from '../helper/axios'
import React, { useEffect, useState } from 'react'

export default function UserList() {
    const [user,setUser] = useState([])
    useEffect(()=>{
        let fetchUserList = async()=>{
            let userList = await axios.get('/user/userlist')
            setUser(userList.data)
        }   
        fetchUserList()
    },[])

  return (
    <div className=' mx-10'>
        <div className="my-5 text-center text-3xl font-semibold">User List</div>
        <div className=" flex items-center justify-end">
            <input type="search" name="" className='border border-neutral-200 outline-none shadow-md py-1 rounded-md px-3' id="" />
            <button className=' ms-3 border p-1 bg-neutral-200 rounded-md shadow-md transition-all duration-300 hover:bg-slate-700 hover:text-white'><i className='fa-solid fa-magnifying-glass'></i></button>
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
                        {
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
                        }
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}
