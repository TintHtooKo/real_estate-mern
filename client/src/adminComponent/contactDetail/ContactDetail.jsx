import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from '../../helper/axios'
import './ContactDetail.css'

export default function ContactDetail() {
    let [contact,setContact] = useState('')
    let {id} = useParams()
    useEffect(()=>{
        let fetchContact = async()=>{
            if(id){
                let contact = await axios.get('/contact/detail/'+id)
                setContact(contact.data)
            }
        }
        fetchContact()
    },[id])
  return (
    <>
        <Link to={'/admin/contact'}><i className='fa-solid fa-long-arrow-left text-xl bg-black text-white px-3 m-5'></i></Link>
        <div className=" flex items-start gap-4 m-16 contact-detail">
            <div className=" flex flex-col gap-3">
                <p>Name</p>
                <p>Email</p>
                <p>Subject</p>
                <p>Message</p>
            </div>
            <div className=" flex flex-col gap-3">
                <p>:</p>
                <p>:</p>
                <p>:</p>
                <p>:</p>
            </div>
            <div className=" flex flex-col gap-3">
                <p>{contact.name}</p>
                <p>{contact.email}</p>
                <p>{contact.subject}</p>
                <p className=' w-[400px] msg'>{contact.message}</p>
            </div>
        </div>
    </>
  )
}
