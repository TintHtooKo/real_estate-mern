import React, { useEffect, useState } from 'react'
import './css/Dashboard.css'
import axios from '../helper/axios'

export default function AdminDashboard() {
  let [totalUser, setTotalUser] = useState(0)
  let [totalAgent,setTotalAgent] = useState(0)

  useEffect(()=>{
    let fetchUser = async() =>{
      let user = await axios.get('/user/userlist')
      setTotalUser(user.data.length)
    }
    fetchUser()
  },[])

  useEffect(()=>{
    let fetchUser = async() =>{
      let agent = await axios.get('/user/adminlist')
      setTotalAgent(agent.data.length)
    }
    fetchUser()
  },[])



  
  return (
    <div className="ad-dashboard">
      <div className=" flex flex-wrap gap-3 items-center justify-between mx-5 mt-5">
        <div className=" p-10 text-white  rounded shadow-md shadow-[#070922] transition-all duration-300 bg-[#070922] cursor-pointer hover:shadow-2xl">
          <div className=" text-xl flex flex-col gap-3 items-start">
            Total Register Users
            <div className="">
              <i className=' fa fa-user me-5'></i>
              <span>{totalUser}</span>
            </div>
          </div>
        </div>

        <div className=" p-10 text-white  rounded shadow-md shadow-[#070922] transition-all duration-300 bg-[#070922] cursor-pointer hover:shadow-2xl">
          <div className=" text-xl flex flex-col gap-3 items-start">
            Total Agents
            <div className="">
              <i className=' fa fa-user me-5'></i>
              <span>{totalAgent}</span>
            </div>
          </div>
        </div>

        <div className=" p-10 text-white  rounded shadow-md shadow-[#070922] transition-all duration-300 bg-[#070922] cursor-pointer hover:shadow-2xl">
          <div className=" text-xl flex flex-col gap-3 items-start">
            Total Properties
            <div className="">
              <i className=' fa fa-user me-5'></i>
              <span>20</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
