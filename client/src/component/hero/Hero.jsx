import React from 'react'
import './Hero.css'
import HeroSection from '../../assets/hero.jpg'

export default function Hero({title,paragraph}) {
  return (
    <div className='hero'>
        <h3 className=' font-bold text-white text-[3rem] w-[40%] text-center'>{title}</h3>
        <p className='text-white text-[1.2rem] text-center w-[60%]'>{paragraph}</p>        
    </div>
  )
}
