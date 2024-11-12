import React, { useEffect } from 'react'
import Hero from '../component/hero/Hero'
import Property from '../component/property/Property'
import './css/Home.css'
import Aos from 'aos'
import Pagination from '../component/pagination/Pagination'


export default function Properties() {
    const title = "PROPERTIES"
    useEffect(()=>{
      Aos.init({duration:1000})
  },[])

  
    return (
      <div className="">
        <div className="">
          <Hero title={title}/>
        </div>
        <div className="" data-aos="fade-up">
          <Property/>
        </div>
        
      </div>
  )
}
