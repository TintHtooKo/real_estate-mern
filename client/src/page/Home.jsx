import React, { useEffect, useState } from 'react'
import Hero from '../component/hero/Hero'
import Service from '../component/service/Service'
import Property from '../component/property/Property'
import './css/Home.css'
import ForAbout from '../component/about/ForAbout'
import Testimonial from '../component/testimonial/Testimonial'
import AgentPage from '../component/agent/AgentPage'



export default function Home() {
  const title = "The Simplest Way to Find Property"
  const paragraph = "A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts"
  
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
        <div className="property-home">
          <Property/>
          <Property/>
          <Property/>
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
