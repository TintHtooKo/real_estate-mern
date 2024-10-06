import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from '../../helper/axios'
import './ContactDetail.css'
import moment from 'moment'

export default function ContactDetail() {
    let [contact,setContact] = useState('')
    let {id} = useParams()
    let navigate = useNavigate()
    useEffect(()=>{
        let fetchContact = async()=>{
            if(id){
                let contact = await axios.get('/contact/detail/'+id)
                setContact(contact.data)
            }
        }
        fetchContact()
    },[id])

    let updateRead = async(e)=>{
        e.preventDefault();
        try {
            let updateRead = !contact.read
            let res = await axios.patch('/contact/update/'+id,{read:updateRead})
            if(res.status == 200){   
                setContact(res.data)
                navigate('/admin/contact')
                window.location.reload()
            }
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <>
        <Link to={'/admin/contact'}><i className='fa-solid fa-long-arrow-left text-xl bg-black text-white px-3 m-5'></i></Link>
        <div className=" flex items-start gap-4 mx-16 contact-detail">
            <div className=" flex flex-col gap-3">
                <p>Name</p>
                <p>Email</p>
                <p>Subject</p>
                <p>Date</p>
                <p>Message</p>
            </div>
            <div className=" flex flex-col gap-3">
                <p>:</p>
                <p>:</p>
                <p>:</p>
                <p>:</p>
                <p>:</p>
            </div>
            <div className=" flex flex-col gap-3">
                <p>{contact.name}</p>
                <p>{contact.email}</p>
                <p>{contact.subject}</p>
                <p>{moment(contact.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
                <p className=' w-[400px] msg'>{contact.message}</p>              
            </div>
        </div> 
        <form action="" onSubmit={updateRead}>
            <button type='submit' className='bg-black text-white mx-16 px-3 py-1 rounded mt-2'>
                {contact.read ? 'Mark as Unread' : 'Mark as Read'}
            </button>
        </form>
    </>
  )
}
