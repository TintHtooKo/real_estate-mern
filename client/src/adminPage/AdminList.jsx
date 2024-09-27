import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../helper/axios'
import { ToastContainer, toast } from 'react-toastify'
import { AuthContext } from '../context/AuthContext'
import './css/Dashboard.css'

export default function AdminList() {
    let [admin,setAdmin] = useState([])
    let {user} = useContext(AuthContext)
    let [search,setSearch] = useState('')
    let superAdmin = user?.role?.role === 'superadmin'

    useEffect(()=>{
        let fetchAdmin = async()=>{
            let adminlist = await axios.get('/user/adminlist')
            setAdmin(adminlist.data)
        }
        fetchAdmin()
    },[])

    let deleteAdmin = async(id)=>{
        try {
            let res = await axios.delete(`/user/delete/${id}`)
            if(res.status === 200){
                let res = await axios.get('/user/adminlist')
                setAdmin(res.data)
                toast.success('User Delete Successfully',{
                    position : 'top-right',
                    autoClose : 4000,
                    pauseOnHover : true,
                    draggable : true,
                    theme : 'dark'
                  })
            }
        } catch (error) {
            console.log(error);
            toast.error('Something wrong. Please try again later',{
                position : 'top-right',
                autoClose : 4000,
                pauseOnHover : true,
                draggable : true,
                theme : 'dark'
              })
        }
    }
  return (
    <>
    <div className='adlist mx-10'>
        <div className=" adlist-title my-5 text-center text-3xl font-semibold">Agent List</div>
            <div className="adlist-input-icon flex flex-wrap items-center justify-between">
                <div className="">
                    <Link to={'/admin/addadmin'}><i className='fa-solid fa-plus me-3 border p-2 bg-green-500 text-white rounded-md shadow-md transition-all duration-300 hover:bg-slate-700 hover:text-white'></i></Link>
                </div>
                <div className="">
                    <input
                    onChange={(e)=>setSearch(e.target.value)}
                     type="search" name="" className='border border-neutral-200 outline-none shadow-md py-1 rounded-md px-3' placeholder='Search Agents' id="" />
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
                        <th scope="col" className="px-6 py-4">Role</th>
                        {superAdmin && <th scope="col" className="px-6 py-4"></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            admin.filter((item)=>{
                                return search.toLowerCase() === '' ? 'item' : 
                                item.fullname.toLowerCase().includes(search) || item.email.toLowerCase().includes(search)
                            }).map((admin,index)=>(
                                <tr key={index}
                                className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-600">
                                <td className="whitespace-nowrap px-6 py-4 font-medium">{index+1}</td>
                                <td className="whitespace-nowrap px-6 py-4">{admin.fullname}</td>
                                <td className="whitespace-nowrap px-6 py-4">{admin.email}</td>
                                <td className="whitespace-nowrap px-6 py-4">{admin.phone}</td>
                                <td className="whitespace-nowrap px-6 py-4">{admin.role.role}</td>
                                {superAdmin && (
                                    <td className="whitespace-nowrap px-6 py-4">
                                    <button onClick={()=>deleteAdmin(admin._id)} className="text-red-500 hover:text-red-600"><i className="fa-solid fa-trash"></i></button>
                                </td>
                                )}
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
    <ToastContainer/>
    </>
  )
}
