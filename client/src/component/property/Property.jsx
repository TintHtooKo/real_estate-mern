import React, { useEffect, useState } from 'react'
import {FaBath, FaBed} from 'react-icons/fa'  
import { TbViewportWide } from "react-icons/tb";
import './Property.css'
import axios from '../../helper/axios'
import { Link, useLocation } from 'react-router-dom'
import Pagination from '../pagination/Pagination';

export default function Property({limit}) {
  let [property,setProperty] = useState([])
  let [search, setSearch] = useState('')
  let [links,setLinks] = useState(null)
  let location = useLocation()
  let searchQuery = new URLSearchParams(location.search)
  let page = searchQuery.get('page')
  page = parseInt(page)
  let scrollTop = ()=>{
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
  }

  useEffect(()=>{
    let fetchProperty = async()=>{
      let res = await axios.get(`/property/?page=${page}`)
      setProperty(res.data.data);     
      setLinks(res.data.links)
      scrollTop()
    }
    fetchProperty()
  },[page])


  

  return ( 
    <>
    <div className=" property">
        {
          property.map((item,index)=>(
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
        <div className=" mt-[10rem] flex items-center justify-center">
          {!!links && <Pagination links={links} page={page || 1} location={location}/>}
        </div>
    </>
  )
}


