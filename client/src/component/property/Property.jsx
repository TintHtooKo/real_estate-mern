import React, { useEffect } from 'react'
import RoomOne from '../../assets/Proper1.jpeg'
import {FaBath, FaBed} from 'react-icons/fa'  
import { TbViewportWide } from "react-icons/tb";
import './Property.css'
import Aos from 'aos'

export default function Property() {
  useEffect(()=>{
    Aos.init({duration:1000})
  },[])
  return (
    <div className="">
        <div data-aos="fade-up" className=" relative">
            <img src={RoomOne} alt="" />
            
            <div className=" offer absolute bg-white shadow-md rounded p-5 px-7 top-[10rem] left-5 transition-all duration-300 cursor-pointer hover:shadow-2xl">
            <div className=" offerone flex gap-10">
                <p className="text-gray-500 line-through">130,000</p>
                <p className=" font-bold"> AED 9000<span className="text-gray-500 font-light">/mo</span></p>
            </div>

            <div className=" offertwo flex items-center gap-8 mt-3">
                <div className=" flex gap-2 text-gray-600 items-center">
                  <FaBed/> 3
                </div>
                <div className=" flex gap-2 text-gray-600 items-center">
                  <FaBath/> 2
                </div>
                <div className=" flex gap-2 text-gray-600 items-center">
                  <TbViewportWide/> 1,878 sqft
                </div>
            </div>

            <div className="mt-3">
              <p className=' text-xl'>The Blue Sky Home</p>
              <span className='text-gray-500 text-sm'>Abu Dhabi</span>
            </div>
        </div>
        </div>
    </div>
  )
}
