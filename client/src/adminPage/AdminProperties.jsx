import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axios from '../helper/axios'
import { ToastContainer,toast } from 'react-toastify'
import Pagination from '../component/pagination/Pagination'

export default function AdminProperties() {
  let {user} = useContext(AuthContext)
  let superAdmin = user?.role?.role === 'superadmin' 
  let [property,setProperty] = useState([])
  let [search,setSerach] = useState('')
  let [links,setLinks] = useState(null)

  useEffect(()=>{
    let fetchProperty = async()=>{
      let property = await axios.get('/property/admin')
      setProperty(property.data)
    }
    fetchProperty()
  },[])

  let deleteProperty = async(id)=>{
    try {
        let res = await axios.delete(`/property/delete/${id}`)
        if(res.status === 200){
            let res = await axios.get('/property')
            setProperty(res.data)
            toast.success('Property Delete Successfully',{
                position : 'top-right',
                autoClose : 4000,
                pauseOnHover : true,
                draggable : true,
                theme : 'dark'
              })
        }
    } catch (error) {
        console.log(error);
    }
}

  return (
    <>
    <div className=" mx-5">
      <div className="my-5  adlist-title  text-center text-3xl font-semibold">Properties</div>
      <div className=" flex justify-between items-center">
        <div className="">
          <Link to={'/admin/add/property'}><i className=' fa fa-plus bg-slate-900 text-white p-1 rounded cursor-pointer'></i></Link>
        </div>
        <div className="">
          <input type="search" onChange={(e)=>setSerach(e.target.value)} name="" placeholder=' Search' className='border border-neutral-200 outline-none shadow-md py-1 rounded-md px-3' id="" />
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
                        <th scope="col" className="px-6 py-4">Name</th>
                        <th scope="col" className="px-6 py-4">Type</th>
                        <th scope="col" className="px-6 py-4">Rent Or Sell</th>
                        <th scope="col" className="px-6 py-4">Price<span className=' font-thin'>/mon</span></th>
                        <th scope="col" className="px-6 py-4">Location</th>
                        {superAdmin && <th scope="col" className="px-6 py-4"></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            property.filter((item)=>{
                                return search.toLowerCase() === '' ? item : 
                                item.name.toLowerCase().includes(search) || 
                                item.type.name.toLowerCase().includes(search) ||
                                item.location.toLowerCase().includes(search) ||
                                item.rentsell.name.toLowerCase().includes(search)                              
                            }).map((property,index)=>(
                                <tr key={index}
                                className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-600">
                                <td className="whitespace-nowrap px-6 py-4">{index+1}</td>
                                <td className="whitespace-nowrap px-6 py-4">{property.name}</td>
                                <td className="whitespace-nowrap px-6 py-4">{property.type.name}</td>
                                <td className="whitespace-nowrap px-6 py-4">{property.rentsell.name}</td>
                                <td className="whitespace-nowrap px-6 py-4">{property.price}</td>
                                <td className="whitespace-nowrap px-6 py-4">{property.location}</td>
                                {
                                    superAdmin && (
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <Link to={`/admin/property/${property._id}`} className="text-blue-500 hover:text-blue-600 me-3"><i className="fa-solid fa-eye"></i></Link>
                                            <button onClick={()=>deleteProperty(property._id)} className="text-red-500 hover:text-red-600"><i className="fa-solid fa-trash"></i></button>
                                        </td>
                                    )
                                }
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
