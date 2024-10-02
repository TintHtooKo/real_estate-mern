import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { AuthContext } from '../../context/AuthContext'
import axios from '../../helper/axios'

export default function AdChangePw() {
    let [oldPassword,setOldPassword] = useState('')
    let [newPassword,setNewPassword] = useState('')
    let [confirmPassword,setConfirmPassword] = useState('')

    let handleSubmit = async(e) =>{
        e.preventDefault()
        try {
            if(!oldPassword || !newPassword || !confirmPassword){
                toast.error('All fields are required',{
                    position: 'top-right',
                    autoClose : 4000,
                    pauseOnHover : true,
                    draggable : true,
                    theme : 'dark'
                })
            }else if(newPassword !== confirmPassword){
                toast.error('New Password and Confirm Password must be the same',{
                    position : 'top-right',
                    autoClose : 4000,
                    pauseOnHover : true,
                    draggable : true,
                    theme : 'dark'
                })
            }else{
                let changepw = {oldpassword : oldPassword, newpassword : newPassword}
                let res = await axios.post(`/user/changepw/`,changepw)
                if(res.status === 200){
                    toast.success('Password Change Successfully',{
                        position : 'top-right',
                        autoClose : 4000,
                        pauseOnHover : true,
                        draggable : true,
                        theme : 'dark'
                    })
                    setOldPassword('')
                    setNewPassword('')
                    setConfirmPassword('')
                }
            }
        } catch (error) {
            console.log(error);
            
            toast.error(error.response.data.msg,{
                position : 'top-right',
                autoClose : 4000,
                pauseOnHover : true,
                draggable : true,
                theme : 'dark'
            });           
        }
    }

  return (
    <div>
        <Link to={'/admin/profile'} className=''><i className='fa fa-arrow-left text-2xl m-5'></i></Link>
        <div className=" flex flex-col items-center">
            <h1 className=' mb-5 text-3xl font-medium'>Change Password</h1>
            <form onSubmit={handleSubmit} action="" className=' flex flex-col gap-5'>
                <div className=" flex flex-col">
                    <label htmlFor="">Old Password</label>
                    <input value={oldPassword} onChange={(e)=>{setOldPassword(e.target.value)}} type="password" name="" className=' border border-gray-300 px-2 py-1 rounded shadow-md outline-none' placeholder='Enter Old Password' />
                </div>
                <div className=" flex flex-col">
                    <label htmlFor="">New Password</label>
                    <input value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}} type="password" name="" className=' border border-gray-300 px-2 py-1 rounded shadow-md outline-none' placeholder='Enter New Password' />
                </div>
                <div className=" flex flex-col">
                    <label htmlFor="">Confirm Password</label>
                    <input value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}} type="password" name="" className=' border border-gray-300 px-2 py-1 rounded shadow-md outline-none' placeholder='Enter Confirm Password' />
                </div>
                <div className="">
                    <button type="submit" className=' bg-pink-500 text-white rounded px-3 py-1 text-center w-full'>Change Password</button>
                </div>
            </form>
        </div>
        <ToastContainer/>
    </div>
  )
}
