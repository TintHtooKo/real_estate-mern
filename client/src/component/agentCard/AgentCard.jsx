import React, { useEffect } from 'react'
import './AgentCard.css'
import Agent from '../../assets/team3.webp'
import Aos from 'aos'

export default function AgentCard() {
      useEffect(()=>{
        Aos.init({duration:1000})
    },[])
  return (
    <div data-aos="fade-up" className=" agcard relative cursor-pointer">
        <img src={Agent} alt=""/>
        <div className=" absolute top-[17rem] left-3 shadow-md bg-white p-5">
            <h1 className=' text-2xl'>Missy Couper</h1>
            <p className=' text-gray-500'>Listing - <span className='text-black'>10 properties</span></p>
        </div>
    </div>
  )
}
