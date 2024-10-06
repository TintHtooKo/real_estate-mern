import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import axios from '../helper/axios'
import {Link} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function ContactMsg() {
    let {user} = useContext(AuthContext)
    let superAdmin = user.role.role === 'superadmin'
    let [contact,setContact] = useState([])

    useEffect(()=>{
        let fetchContact = async() =>{
            let contact = await axios.get('/contact')
            setContact(contact.data);     
            console.log(contact.data)    
        }
        fetchContact()
    },[])

    let deleteContact = async(id) =>{
        let res = await axios.delete(`/contact/delete/${id}`)
        if(res.status === 200){
            toast.success('Delete Contact Successfully',{
                position : 'top-right',
                autoClose : 4000,
                pauseOnHover : true,
                draggable : true,
                theme : 'dark'
            })
            window.location.reload()
            let contact = await axios.get('/contact')
            setContact(contact.data);
        }
    }
  return (
    <>
    <div className=' mx-10'>
        <div className="my-5  adlist-title  text-center text-3xl font-semibold">Contact Message</div>
        <div className=" flex items-center justify-end">
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
                        <th scope="col" className="px-6 py-4">Email</th>
                        <th scope="col" className="px-6 py-4">Subject</th>
                        <th scope="col" className="px-6 py-4">Message</th>
                        {superAdmin && <th scope="col" className="px-6 py-4"></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            contact.length > 0 ? (
                                contact.map((contact,index)=>(
                                    <tr key={index}
                                    className={`border-b border-neutral-200 transition duration-300 ease-in-out ${contact.read === false ? '' : 'bg-gray-200'} hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-600`}>
                                    <td className="whitespace-nowrap px-6 py-4">{index+1}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{contact.name}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{contact.email}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{contact.subject}</td>
                                    <td className="whitespace-nowrap px-6 py-4"> {contact.message.split(' ').slice(0, 8).join(' ')}...</td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <Link to={`/admin/contact/${contact._id}`} className="text-blue-500 hover:text-blue-600 me-3"><i className="fa-solid fa-eye"></i></Link>
                                        {
                                            superAdmin && (
                                                <button onClick={()=>deleteContact(contact._id)} className="text-red-500 hover:text-red-600"><i className="fa-solid fa-trash"></i></button>
                                            )
                                        }
                                    </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>There is no contact message</td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            )
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
