import React from 'react'
import Hero from '../component/hero/Hero'
import ForAbout from '../component/about/ForAbout'
import Testimonial from '../component/testimonial/Testimonial'


export default function About() {
    const title = "ABOUT US"
    return (
      <div className="">
        <div className="">
          <Hero title={title}/>
        </div>
        <div className="">
          <ForAbout/>
        </div>
        <div className="">
          <Testimonial/>
        </div>
      </div>
  )
}
