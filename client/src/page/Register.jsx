import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ToastContainer,toast} from 'react-toastify'
import './css/Home.css'
import Spinner from '../assets/spinner.svg'
import axios from '../helper/axios'

export default function Register() {
  const [fullname,setFullname] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async(e) =>{
    try {
      setLoading(true)
      e.preventDefault()
      let data = {fullname,email,phone,password}
      if(!fullname || !email || !phone || !password || !confirmPassword){
        toast.error('All fields are required',{
          position: 'top-right',
          autoClose : 4000,
          pauseOnHover : true,
          draggable : true,
          theme : 'dark'
        })
        setLoading(false)
      }

      if(password !== confirmPassword){
        toast.error('Password and Confirm Password must be the same',{
          position : 'top-right',
          autoClose : 4000,
          pauseOnHover : true,
          draggable : true,
          theme : 'dark'
        })
        setLoading(false)
      }

      let res = await axios.post('/user/register/',data,{withCredentials:true})
      
      if(res.status == 200){
        toast.success('Registration Successfully',{
          position : 'top-right',
          autoClose : 4000,
          pauseOnHover : true,
          draggable : true,
          theme : 'dark'
        })
        setTimeout(()=>{
          navigate('/login')
        },1000)
        setLoading(false)
      }

      

    } catch (error) {
      toast.error(error.response.data.msg,{
        position : 'top-right',
        autoClose : 4000,
        pauseOnHover : true,
        draggable : true,
        theme : 'dark'
      })
      setLoading(false)
      console.log(error);
      
    }
  }

  return (
    <>
    <div className="">
      <h1 className=' text-[2rem] mb-4 text-center'>Register</h1>
      <div className=" flex items-center justify-center">
        <form action="" onSubmit={handleSubmit} className='register'>
            <div className=" flex flex-col items-start mb-8">
                <label htmlFor="" className=' text-gray-500 font-bold ms-2'>Full Name</label>
                <input type="text" value={fullname} onChange={(e)=>setFullname(e.target.value)} className=' border-b border-r rounded-full p-2 px-4 w-[30rem] text-gray-700 outline-none shadow-md' placeholder='John Doe'/>
            </div>

            <div className=" flex flex-col items-start mb-8">
                <label htmlFor="" className=' text-gray-500 font-bold ms-2'>Email</label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className=' border-b border-r rounded-full p-2 px-4 w-[30rem] text-gray-700 outline-none shadow-md' placeholder='john@gamil.com'/>
            </div>

            <div className=" flex flex-col items-start mb-8">
                <label htmlFor="" className=' text-gray-500 font-bold ms-2'>Phone</label>
                <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} className=' border-b border-r rounded-full p-2 px-4 w-[30rem] text-gray-700 outline-none shadow-md' placeholder='+971 123 456 789'/>
            </div>

            <div className=" flex flex-col items-start mb-8">
                <label htmlFor="" className=' text-gray-500 font-bold ms-2'>Password</label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className=' border-b border-r rounded-full p-2 px-4 w-[30rem] text-gray-700 outline-none shadow-md' placeholder='********'/>
            </div>

            <div className=" flex flex-col items-start mb-8">
                <label htmlFor="" className=' text-gray-500 font-bold ms-2'>Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} className=' border-b border-r rounded-full p-2 px-4 w-[30rem] text-gray-700 outline-none shadow-md' placeholder='********'/>
            </div>

            <div className=" flex items-center mb-8">
                <button type="submit" className=' bg-pink-500 flex items-center justify-center gap-5 text-white rounded-full p-2 px-4 w-full outline-none shadow-md transition-all duration-300 hover:shadow-pink-800'>
                  {
                    loading && <img src={Spinner} alt="" />
                  }
                  Register
                </button>
            </div>

            <div className=" flex flex-col items-start mb-8">
                <p className=' text-gray-500 ms-2'>Have you already register ?<Link to="/login"><span className="text-pink-500 underline ms-2">Login</span></Link></p>
            </div>
        </form>
      </div>
    </div>
    <ToastContainer/>
    </>
  )
}
