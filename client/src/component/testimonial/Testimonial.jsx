import React, { useEffect } from 'react'
import Fumi from '../../assets/fumi.webp'
import './Testimonial.css'
import Aos from 'aos'


export default function Testimonial() {

    useEffect(()=>{
        Aos.init({duration:1000})
    },[])

  return (
    <div className="">
        <div className="">
            <p className='text-center text-pink-500'>_____ TESTIMONIALS _____</p>
            <h1 className="text-center text-4xl">What Our Clients Say</h1>
        </div>
        
        <div className="testimonial mt-20 mx-10">
                <div data-aos='fade-up' className=" cursor-pointer shadow-lg p-5">
                    <p className=' text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                        Dolores adipisci accusantium maxime porro odit deserunt voluptas
                        itaque repudiandae vero eos ullam esse</p>
                    <div className="fumi">
                        <img src={Fumi} alt="" />
                        <div className="">
                            <h1 className=" text-gray-500">Fumi Nikaido</h1>
                            <p className=" text-gray-500">Actress</p>   
                        </div>
                    </div>
                </div>

                <div data-aos='fade-up' className=" cursor-pointer shadow-lg p-5">
                    <p className=' text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                        Dolores adipisci accusantium maxime porro odit deserunt voluptas
                        itaque repudiandae vero eos ullam esse</p>
                    <div className="fumi">
                        <img src={Fumi} alt="" />
                        <div className="">
                            <h1 className=" text-gray-500">Fumi Nikaido</h1>
                            <p className=" text-gray-500">Actress</p>
                        </div>
                    </div>
                </div>

                <div data-aos='fade-up' className=" cursor-pointer shadow-lg p-5">
                    <p className=' text-gray-600'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                        Dolores adipisci accusantium maxime porro odit deserunt voluptas
                        itaque repudiandae vero eos ullam esse</p>
                    <div className="fumi">
                        <img src={Fumi} alt="" />
                        <div className="">
                            <h1 className=" text-gray-500">Fumi Nikaido</h1>
                            <p className=" text-gray-500">Actress</p>
                        </div>
                    </div>
                </div>
        </div>
    </div>
  )
} 
