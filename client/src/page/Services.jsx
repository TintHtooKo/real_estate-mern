import React from 'react'
import Hero from '../component/hero/Hero'
import Service from '../component/service/Service'

export default function Services() {
    const title = "SERVICES"
    return (
      <div className="">
        <div className="">
          <Hero title={title}/>
        </div>
        <div className="">
          <Service/>
        </div>
      </div>
    )
}
