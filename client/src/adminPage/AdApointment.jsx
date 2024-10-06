import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { AuthContext } from '../context/AuthContext'
import axios from '../helper/axios'
import moment from 'moment'
import { Link, useParams } from 'react-router-dom'


export default function AdApointment() {
  let {user} = useContext(AuthContext)
  let superAdmin = user?.role?.role === 'superadmin'
  let [apoint,setApoint] = useState([])
  let {id} = useParams()

  useEffect(()=>{
    let fetchApoint = async()=>{
      let res = await axios.get('/apoint')
      setApoint(res.data)
    }
    fetchApoint()
  },[])

  let deleteApoint = async(id)=>{
    try {
      let res = await axios.delete(`/apoint/delete/${id}`)
      if(res.status === 200){
        window.location.reload()
        let res = await axios.get('/apoint')
        setApoint(res.data)
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
    <div className='adlist mx-10'>
        <div className=" adlist-title my-5 text-center text-3xl font-semibold">Apointment List</div>
            <div className="adlist-input-icon flex flex-wrap items-center justify-between">
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
                        <th scope="col" className="px-6 py-4">Name</th>
                        <th scope="col" className="px-6 py-4">Email</th>
                        <th scope="col" className="px-6 py-4">Phone</th>
                        <th scope="col" className="px-6 py-4">Agent</th>
                        <th scope="col" className="px-6 py-4">Property</th>
                        <th scope="col" className="px-6 py-4">Created At</th>
                        {superAdmin && <th scope="col" className="px-6 py-4"></th>}
                        </tr> 
                    </thead>
                    <tbody>
                        {
                            apoint.map((item,index)=>(
                                <tr key={index}
                                className={`border-b border-neutral-200 transition duration-300 ease-in-out ${item.read === false ? '' : 'bg-gray-200'} hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-600`}>
                                <td className="whitespace-nowrap px-6 py-4">{item.name}</td>
                                <td className="whitespace-nowrap px-6 py-4">{item.email}</td>
                                <td className="whitespace-nowrap px-6 py-4">{item.phone}</td>
                                <td className="whitespace-nowrap px-6 py-4">{item?.agent == null ? 'Random' : item?.agent?.fullname}</td>
                                <td className="whitespace-nowrap px-6 py-4">{item?.property?.name}</td>
                                <td className="whitespace-nowrap px-6 py-4">{moment(item.createdAt).format('MMMM Do, YYYY')}</td>
                                {superAdmin && (
                                    <td className="whitespace-nowrap px-6 py-4">
                                    <Link to={`/admin/apointment/${item._id}`} className="text-blue-500 hover:text-blue-600"><i className="fa-solid fa-eye me-5"></i></Link>
                                    <button onClick={()=>deleteApoint(item._id)} className="text-red-500 hover:text-red-600"><i className="fa-solid fa-trash"></i></button>
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
