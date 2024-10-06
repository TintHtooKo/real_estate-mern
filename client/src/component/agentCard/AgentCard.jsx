import React, { useEffect, useState } from 'react'
import './AgentCard.css'
import Agent from '../../assets/team3.webp'
import Aos from 'aos'
import axios from '../../helper/axios'

export default function AgentCard() {
  let [admin,setAdmin] = useState([])
      useEffect(()=>{
        Aos.init({duration:1000})
    },[])

    useEffect(()=>{
      let fetchAdmin = async()=>{
          let adminlist = await axios.get('/user/adminlist')
          setAdmin(adminlist.data)
      }
      fetchAdmin()
  },[])

  return (
    <>
      {
        admin.map((item,index)=>(
          <div key={index} data-aos="fade-up" className=" agcard relative cursor-pointer">
            <img src={import.meta.env.VITE_BACKEND_URL_ACCESS + item.profile} alt=""/>
            <div className=" absolute top-[17rem] left-3 shadow-md bg-white p-5">
                <h1 className=' text-xl'>{item.fullname}</h1>
                <p className=' text-gray-500'>Listing - <span className='text-black'>10 properties</span></p>
            </div>
        </div>
        ))
      }
    </>
  )
}
