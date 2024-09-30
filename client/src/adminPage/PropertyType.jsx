import React, { useEffect, useState } from 'react'
import './css/Dashboard.css'
import axios from '../helper/axios'
import { toast, ToastContainer } from 'react-toastify'

export default function PropertyType() {
    let [type,setType] = useState([])
    let [name,setName] = useState('')
    let [search,setSearch] = useState('')

    useEffect(()=>{
        let fetchType = async()=>{
            let res = await axios.get('/type')
            setType(res.data);          
        }
        fetchType()
    },[])

    let createType = async(e) =>{
        try {
            e.preventDefault()
            let data = {name}
            if(name === ''){
                toast.error('All fields are required',{
                    position : 'top-right',
                    autoClose : 4000,
                    pauseOnHover : true,
                    draggable : true,
                    theme : 'dark'
                  })
            }
            let res = await axios.post('/type/create',data)
            if(res.status === 200){
                setName('')
                let res = await axios.get('/type')
                setType(res.data)
                toast.success('Type Create Successfully',{
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

    let deleteType= async(id)=>{
        try {
            let res = await axios.delete(`/type/delete/${id}`)
            if(res.status === 200){
                let res = await axios.get('/type')
                setType(res.data)
                toast.success('Type Delete Successfully',{
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
    <div className=" pro-type flex items-start justify-evenly mt-5">
        <div className=" flex flex-col items-start gap-2">
            <h1 className="text-center text-[20px] font-semibold mt-5">
                Create Property Type
            </h1>
            <div className="">
                <form action="" onSubmit={createType} className='flex flex-col items-start gap-2'>
                    <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='border outline-none border-[#bbbbbb] p-1 rounded' />
                    <input type="submit" value="Create" className=' text-white bg-[#070922] py-1 px-3 rounded cursor-pointer' />
                </form>
            </div>
        </div>


        <div className="">
        <h1 className="text-center text-[20px] font-semibold mt-5">
                 Property Type
            </h1>
        <div className=" mt-5">
            <input type="search" placeholder='Search Type' className='border outline-none ms-20 border-[#bbbbbb] p-1 rounded' onChange={(e)=>setSearch(e.target.value)} id="" />
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
                        <th scope="col" className="px-6 py-4">Property Type</th>
                        <th scope="col" className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            type.filter((item)=>{
                                return search.toLowerCase() === '' ? item : 
                                item.name.toLowerCase().includes(search)
                            }).map((type,index)=>(
                                <tr key={index}
                                className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-600">
                                <td className="whitespace-nowrap px-6 py-4">{index+1}</td>
                                <td className="whitespace-nowrap px-6 py-4">{type.name}</td>
                                <td className="whitespace-nowrap px-6 py-4">
                                    <button onClick={()=>deleteType(type._id)} className="text-red-500 hover:text-red-600"><i className="fa-solid fa-trash"></i></button>
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
    </div>
    <ToastContainer/>
    </>
  )
}
