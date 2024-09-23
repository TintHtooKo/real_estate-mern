import React, { useEffect, useState } from 'react'
import About from '../../assets/about.jpeg'
import ScrollTrigger from 'react-scroll-trigger'
import CountUp from 'react-countup'
import './ForAbout.css'
import Aos from 'aos'

export default function ForAbout() {
    const [counton,setCounton] = useState(false)
    useEffect(()=>{
        Aos.init({duration:1000})},[])
  return (
    <div className="">
        <div className=" forabout  flex mx-10 relative" >
            <img src={About} alt="" className='w-1/2' />

            <div data-aos="fade-up" className=" about bg-white absolute w-[50%] top-10 right-10 py-5 px-10">
                <h1 className=" text-4xl mb-3">We Put People First.</h1>
                <p className=" text-gray-600 mb-3">
                    A small river named Duden flows by their place and 
                    supplies it with the necessary regelialia. It is a paradisematic country,
                    in which roasted parts of sentences fly into your mouth.
                </p>
                <p className=" text-gray-600 mb-3 ">
                    On her way she met a copy. The copy warned the Little Blind Text, 
                    that where it came from it would have been rewritten a thousand times and everything
                    that was left from its origin would be the word "and" and the Little Blind Text 
                    should turn around and return to its own, safe country. But nothing the copy said 
                    could convince her and so it didn’t take long until a few insidious Copy Writers 
                    ambushed her, made her drunk with Longe and Parole and dragged her into their agency, 
                    where they abused her for their.
                </p>
            </div>
        </div>

        <ScrollTrigger onEnter={()=>setCounton(true)} onExit={()=>setCounton(false)}>
            <div className="no">
                <div className=" flex items-center p-5 gap-5">
                    <h1><CountUp start={0} end={305} duration={2} delay={0} redraw={true}/></h1>
                    <p>Area Population</p>
                </div>

                <div className=" flex items-center p-5 gap-5">
                    <h1><CountUp start={0} end={1090} duration={2} delay={0} redraw={true}/></h1>
                    <p>Total Properties</p>
                </div>

                <div className=" flex items-center p-5 gap-5">
                    <h1><CountUp start={0} end={209} duration={2} delay={0} redraw={true}/></h1>
                    <p>Average House</p>
                </div>  

                <div className=" flex items-center p-5 gap-5">
                    <h1><CountUp start={0} end={67} duration={2} delay={0} redraw={true}/></h1>
                    <p>Total Branches</p>
                </div>
            </div>
        </ScrollTrigger>
    </div>
  )
}
