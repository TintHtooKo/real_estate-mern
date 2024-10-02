import React, { useState } from 'react'
import Hero from '../component/hero/Hero'
import Spinner from '../assets/spinner.svg'
import { toast, ToastContainer } from 'react-toastify'
import axios from '../helper/axios'
import './css/Contact.css'

export default function Contact() {    
  let title = "CONTACT US"
  let [loading, setLoading] = useState(false)
  let [name,setName] = useState('')
  let [email,setEmail] = useState('')
  let [subject,setSubject] = useState('')
  let [message,setMessage] = useState('')

  let handleSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)
    try {
      let data = {name,email,subject,message}
      if(!name || !email || !subject || !message){
        toast.error('All fields are required', {
          position: 'top-right',
          autoClose: 4000,
          pauseOnHover: true,
          draggable: true,
          theme: 'dark'
        })
      }
      let res = await axios.post('/contact/create',data)
      if(res.status === 200){
        setLoading(false)
        toast.success('Thank you for your message. We will reply as soon as possible', {
          position: 'top-right',
          autoClose: 4000,
          pauseOnHover: true,
          draggable: true,
          theme: 'dark'
        })
        setName('')
        setEmail('')
        setSubject('')
        setMessage('')
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  return (
    <div className="">
      <div className="">
        <Hero title={title}/>
      </div>
      <div className=" contact flex items-start gap-28 justify-center mt-24">
        <div className="">
          <form action="" onSubmit={handleSubmit} className=' border px-16 py-8 shadow-md'>
              <div className=" flex flex-col items-start mb-8">
                  <label htmlFor="" className=' text-gray-500 font-bold ms-2'>Name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} type="text" className=' border-b border-r rounded-full p-2 px-4 w-[20rem] text-gray-700 outline-none shadow-md' placeholder='Enter your name'/>
              </div>

              <div className=" flex flex-col items-start mb-8">
                  <label htmlFor="" className=' text-gray-500 font-bold ms-2'>Email</label>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className=' border-b border-r rounded-full p-2 px-4 w-[20rem] text-gray-700 outline-none shadow-md' placeholder='Enter you email'/>
              </div>

              <div className=" flex flex-col items-start mb-8">
                  <label htmlFor="" className=' text-gray-500 font-bold ms-2'>Subject</label>
                  <input value={subject} onChange={(e) => setSubject(e.target.value)} type="text" className=' border-b border-r rounded-full p-2 px-4 w-[20rem] text-gray-700 outline-none shadow-md' placeholder='Enter your subject'/>
              </div>

              <div className=" flex flex-col items-start mb-8">
                  <label htmlFor="" className=' text-gray-500 font-bold ms-2'>Message</label>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} name=""  className='border-b border-r h-[10rem] rounded py-2 px-4 w-[20rem] text-gray-700 outline-none shadow-md' id=""></textarea>
              </div>


              <div className=" flex flex-col items-start mb-8">
                  <button type="submit" className=' bg-pink-500 flex items-center justify-center gap-5 text-white rounded-full p-2 px-4 w-[20rem] outline-none shadow-md transition-all duration-300 hover:shadow-pink-800'>
                    {
                      loading && <img src={Spinner} alt="" />
                    }
                    Send
                  </button>
              </div>

          </form>
        </div>

        <div className=" flex flex-col gap-5">
          <h1 className=' text-xl'>Contact Info</h1>
          <div className="">
            <h1 className=' text-gray-700 text-[18px]'>Address</h1>
            <p className=' text-gray-600'>203 Fake St. Mountain View, San Francisco, California, USA</p>
          </div>
          <div className="">
            <h1 className=' text-gray-700 text-[18px]'>Phone</h1>
            <p className=' text-gray-600'>+2 392 3929 210</p>
          </div>
          <div className="">
            <h1 className=' text-gray-700 text-[18px]'>Email Address</h1>
            <p className=' text-gray-600'>abc@yourdomain.com</p>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}
