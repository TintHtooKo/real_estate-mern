import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer,toast } from 'react-toastify'
import Spinner from '../assets/spinner.svg'
import axios from '../helper/axios'
import { AuthContext } from '../context/AuthContext'

export default function Login() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const {dispatch} = useContext(AuthContext)
  const handleSubmit = async(e) =>{
    try {
      setLoading(true)
      e.preventDefault()

      let data = {email,password}

      if(!email || !password){
        toast.error('All fields are required',{
          position : 'top-right',
          autoClose : 4000,
          pauseOnHover : true,
          draggable : true,
          theme : 'dark'
        })
        setLoading(false)
      }

      let res = await axios.post('/user/login',data,{withCredentials:true})      
      if(res.status == 200){
        dispatch({type : 'LOGIN', payload : res.data.user})
        toast.success('Login Successfully',{
          position : 'top-right',
          autoClose : 4000,
          pauseOnHover : true,
          draggable : true,
          theme : 'dark'
        })
        setTimeout(()=>{
          navigate('/properties')
        },1000)
      }
      setLoading(false)
      
    } catch (error) {
      toast.error(error.response.data.msg,{
        position : 'top-right',
        autoClose : 4000,
        pauseOnHover : true,
        draggable : true,
        theme : 'dark'
      })
      setLoading(false)
    }
  }

  return (
    <>
    <div className="">
      <h1 className=' text-[2rem] mb-4 text-center'>Login</h1>
      <div className=" flex items-center justify-center">
        <form action="" onSubmit={handleSubmit}>

            <div className=" flex flex-col items-start mb-8">
                <label htmlFor="" className=' text-gray-500 font-bold ms-2'>Email</label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className=' border-b border-r rounded-full p-2 px-4 w-[20rem] text-gray-700 outline-none shadow-md' placeholder='john@gamil.com'/>
            </div>

            <div className=" flex flex-col items-start mb-8">
                <label htmlFor="" className=' text-gray-500 font-bold ms-2'>Password</label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className=' border-b border-r rounded-full p-2 px-4 w-[20rem] text-gray-700 outline-none shadow-md' placeholder='********'/>
            </div>

            <div className=" flex flex-col items-start mb-8">
                <Link><span className="text-gray-500 text-sm underline ms-2">forget password?</span></Link>
            </div>

            <div className=" flex flex-col items-start mb-8">
                <button type="submit" className=' bg-pink-500 flex items-center justify-center gap-5 text-white rounded-full p-2 px-4 w-[20rem] outline-none shadow-md transition-all duration-300 hover:shadow-pink-800'>
                  {
                    loading && <img src={Spinner} alt="" />
                  }
                  Login
                </button>
            </div>

            <div className=" flex flex-col items-start mb-8">
                <p className=' text-gray-500 ms-2'>Do you have an account?<Link to="/register"><span className="text-pink-500 underline ms-2">Register</span></Link></p>
            </div>
        </form>
      </div>
    </div>
    <ToastContainer/>
    </>
  )
}
