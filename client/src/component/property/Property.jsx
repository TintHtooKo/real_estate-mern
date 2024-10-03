import React, { useEffect, useState } from 'react'
import {FaBath, FaBed} from 'react-icons/fa'  
import { TbViewportWide } from "react-icons/tb";
import './Property.css'
import axios from '../../helper/axios'
import { Link } from 'react-router-dom'

export default function Property({limit}) {
  let [property,setProperty] = useState([])

  useEffect(()=>{
    let fetchProperty = async()=>{
      let res = await axios.get('/property')
      setProperty(res.data);      
    }
    fetchProperty()
  },[])

  let displayedProperties = limit ? property.slice(0, limit) : property

  return ( 
    <div className=" property">
        {
          displayedProperties.map((item,index)=>(
            <div key={index} className=" relative">
              <img src={import.meta.env.VITE_BACKEND_URL_ACCESS + item.image[0]} alt="" />
              <span className=' absolute top-0 bg-pink-500 text-white px-3 py-1'>{item?.rentsell?.name}</span>
              <Link to={`/detail/${item._id}`}>
              <div className=" offer absolute bg-white shadow-md rounded p-5 px-7 top-[10rem] left-5 transition-all duration-300 cursor-pointer hover:shadow-2xl">
                <div className=" offerone flex gap-10">
                    <p className=" font-bold"> AED {item.price}</p>
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
              </Link>
          </div>
          ))
        }
       
    </div>
  )
}


