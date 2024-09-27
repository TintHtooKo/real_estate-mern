import axios from '../helper/axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ToastContainer, toast } from 'react-toastify'


export default function UserList() {
    let {user} = useContext(AuthContext)
    let [userAd,setUserAd] = useState([])
    let [search,setSearch] = useState('')
    

    let superAdmin = user?.role?.role === 'superadmin'

    useEffect(()=>{
        let fetchUserList = async()=>{
            let userList = await axios.get('/user/userlist') 

            setUserAd(userList.data)
            
        }   
        fetchUserList()
    },[])

    let deleteUser = async(id)=>{
        try {
            let res = await axios.delete(`/user/delete/${id}`)
            if(res.status === 200){
                let res = await axios.get('/user/userlist')
                setUserAd(res.data)
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
    <div className=' mx-10'>
        <div className="my-5  adlist-title  text-center text-3xl font-semibold">User List</div>
        <div className=" flex items-center justify-end">
        <input
            onChange={e=>setSearch(e.target.value)}
            type="search"
            placeholder="Search Users"
            className='border border-neutral-200 outline-none shadow-md py-1 rounded-md px-3'
        />
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
                            userAd.filter((item)=>{
                                return search.toLowerCase() === '' ? item : 
                                item.fullname.toLowerCase().includes(search) || item.email.toLowerCase().includes(search)
                            }).map((user,index)=>(
                                <tr key={index}
                                className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-600">
                                <td className="whitespace-nowrap px-6 py-4">{index+1}</td>
                                <td className="whitespace-nowrap px-6 py-4">{user.fullname}</td>
                                <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
                                <td className="whitespace-nowrap px-6 py-4">{user.phone}</td>
                                <td className="whitespace-nowrap px-6 py-4">{user.role.role}</td>
                                {
                                    superAdmin && (
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <button onClick={()=>deleteUser(user._id)} className="text-red-500 hover:text-red-600"><i className="fa-solid fa-trash"></i></button>
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
    {/* {!!links && <Pagination links={links} page={page || 1}/>} */}
    <ToastContainer />
    </>
  )
}
