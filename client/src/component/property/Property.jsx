import React, { useEffect, useState } from 'react'
import RoomOne from '../../assets/Proper1.jpeg'
import {FaBath, FaBed} from 'react-icons/fa'  
import { TbViewportWide } from "react-icons/tb";
import './Property.css'
import Aos from 'aos'
import axios from '../../helper/axios'

export default function Property() {
  let [property,setProperty] = useState([])
  useEffect(()=>{
    Aos.init({duration:1000})
  },[])

  useEffect(()=>{
    let fetchProperty = async()=>{
      let res = await axios.get('/property')
      setProperty(res.data);      
    }
    fetchProperty()
  },[])

  return (
    <div className="">
        {
          property.map((item,index)=>(
            <div data-aos="fade-up" key={index} className=" relative">
              <img src={import.meta.env.VITE_BACKEND_URL_ACCESS + item.image[0]} alt="" />
              
              <div className=" offer absolute bg-white shadow-md rounded p-5 px-7 top-[10rem] left-5 transition-all duration-300 cursor-pointer hover:shadow-2xl">
              <div className=" offerone flex gap-10">
                  <p className=" font-bold"> AED {item.price}<span className="text-gray-500 font-light">/mo</span></p>
              </div>

              <div className=" offertwo flex items-center gap-8 mt-3">
                  <div className=" flex gap-2 text-gray-600 items-center">
                    <FaBed/> {item.bedroom}
                  </div>
                  <div className=" flex gap-2 text-gray-600 items-center">
                    <FaBath/> {item.bathroom}
                  </div>
                  <div className=" flex gap-2 text-gray-600 items-center">
                    <TbViewportWide/> {item.sqft} sqft
                  </div>
              </div>

              <div className="mt-3">
                <p className=' text-xl'>{item.name}</p>
              </div>
          </div>
          </div>
          ))
        }
    </div>
  )
}
