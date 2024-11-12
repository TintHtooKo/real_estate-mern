import React, { useEffect, useState } from 'react'
import Hero from '../component/hero/Hero'
import Service from '../component/service/Service'
import Property from '../component/property/Property'
import './css/Home.css'
import ForAbout from '../component/about/ForAbout'
import Testimonial from '../component/testimonial/Testimonial'
import AgentPage from '../component/agent/AgentPage'
import Aos from 'aos'
import axios from '../helper/axios'
import { Link } from 'react-router-dom'
import {FaBath, FaBed} from 'react-icons/fa'  
import { TbViewportWide } from "react-icons/tb";



export default function Home() {
  let [property,setProperty] = useState([])
  const title = "The Simplest Way to Find Property"
  const paragraph = "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts"
  useEffect(()=>{
    Aos.init({duration:1000})
},[])

let scrollTop = ()=>{
  window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
}

useEffect(()=>{
  let fetchProperty = async()=>{
    let res = await axios.get(`/property`)
    setProperty(res.data.data);      
  }
  fetchProperty()
},[])

let displayedProperties = 3 && property.slice(0, 3) 
  
  return (
    <div className=" ">
      {/* Hero section */}
      <div className="">
        <Hero title={title} paragraph={paragraph}/>
      </div>

      {/* service */}
      <div className="">
        <Service/>
      </div>

      {/* property */}
      <div className=" mt-32">
        <div className="">
          <p className='text-center text-pink-500'>_____ WHAT WE OFFER _____</p>
          <h1 className="text-center text-4xl">Exclusive Offer For You</h1>
        </div>
        <div className="" data-aos="fade-up" >
        <div className=" property">
        {
          displayedProperties.map((item,index)=>(
            <div key={index} className=" relative">
              <img src={import.meta.env.VITE_BACKEND_URL_ACCESS + item.image[0]} alt="" />
              <span className=' absolute top-0 bg-pink-500 text-white px-3 py-1'>{item?.rentsell?.name}</span>
              <Link to={`/detail/${item._id}`} onClick={scrollTop}>
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
        </div>
      </div>

      {/* About us */}
      <div className="cus-height" >
        <ForAbout/>
      </div>

      {/* Testimonial */}
      <div className="">
        <Testimonial/>
      </div>

      {/* Agents */}
      <div className=" mt-20">
        <div className="">
          <p className='text-center text-pink-500'>_____ AGENTS _____</p>
          <h1 className="text-center text-4xl">Our Agents</h1>
        </div>
        <div className="">
          <AgentPage/>
        </div>
      </div>
      
    </div>
  )
}
