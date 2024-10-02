import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import {ToastContainer,toast} from 'react-toastify'
import axios from '../../helper/axios'
import Spinner from '../../assets/spinner.svg'
import Profile from '../../assets/user.svg'

export default function AdEditProfile() {
    let {user,dispatch} = useContext(AuthContext) 
    let [fullname,setFullname] = useState(user.fullname)
    let [phone,setPhone] = useState(user.phone)
    let [email,setEmail] = useState(user.email)
    let [file,setFile] = useState('')
    let [loading,setLoading] = useState(false)
    let [preview,setPreview] = useState(import.meta.env.VITE_BACKEND_URL_ACCESS + user.profile)
    let isAdmin = user?.role?.role === 'superadmin'
    let navigate = useNavigate()

    let upload = (e) =>{
        let file = e.target.files[0]
        setFile(file)

        let fileReader = new FileReader()
        fileReader.onload = (e) =>{
            setPreview(e.target.result)
        }

        fileReader.readAsDataURL(file)
    }

    let handleSubmit = async(e) =>{
        setLoading(true)
        e.preventDefault()
        try {
            let data = {fullname,phone}
            let uploadRes = null
            let res = await axios.patch('/user/editprofile/',data)
            if(file){
            let formData = new FormData()
            formData.set('profile',file)
            uploadRes = await axios.post('/user/uploadprofile', formData,{
                headers : {
                    'Content-Type' : 'multipart/form-data'
                }
            })            
            }
            if(res.status == 200){              
                dispatch({
                    type: 'UPDATE_PROFILE',
                    payload: { fullname, phone, profile :  uploadRes ? uploadRes.data.data.profile : user.profile }
                });
                navigate('/admin/profile')
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }
    
  return (
    <div className="">
        <div className="">
            <Link to={'/admin/profile'} ><i className='fa fa-arrow-left text-2xl m-10'></i></Link>
        </div>
        <div className=" flex flex-col items-center">
            <h1 className=' mb-5 text-3xl font-medium'>Edit Profile</h1>
            <form onSubmit={handleSubmit} action="" className=' flex flex-col gap-5'>
            <div className=" flex flex-col">
                    <label htmlFor="">Email</label>
                    <input type="text" value={email} readOnly  name="" className=' text-gray-400 border border-gray-300 px-2 py-1 rounded shadow-md outline-none' placeholder='John Doe' />
                    <span className=' text-sm text-gray-400'>Email doesn't allow to change</span>
                </div>
                <div className=" flex flex-col">
                    <label htmlFor="">Full Name</label>
                    <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} name="" className=' border border-gray-300 px-2 py-1 rounded shadow-md outline-none' placeholder='John Doe' />
                </div>
                <div className=" flex flex-col">
                    <label htmlFor="">Phone</label>
                    <input  type="text" value={phone} onChange={(e) => setPhone(e.target.value)} name="" className=' border border-gray-300 px-2 py-1 rounded shadow-md outline-none' placeholder='09xxxxxxxxx' />
                </div>
                <div className=" flex flex-col">
                    <label htmlFor="">Profile</label>
                    <input  type="file" name="" onChange={upload} className=' border border-gray-300 px-2 py-1 rounded shadow-md outline-none' placeholder='09xxxxxxxxx' />
                </div>
                <div className="">
                    {
                        preview ? <img src={preview} className="w-40"/> : <img src={Profile} className="w-40"/>
                    }
                </div>
                <div className="">
                    <button type="submit" className=' bg-pink-500 flex items-center justify-center gap-3 text-white rounded px-3 py-1 text-center w-full'>
                    {
                    loading && <img src={Spinner} alt="" />
                  }
                        Change Profile
                    </button>
                </div>
            </form>
        </div>
        <ToastContainer/>
    </div>
  )
}
