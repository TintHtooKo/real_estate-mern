import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className=" footer">
        <div className=" footer-one">
            <div className=" flex flex-col gap-10">
                <h1 className=' text-2xl'>LOGO</h1>
                <p className=' text-gray-500'>Far far away, behind the word mountains, far from the countries.</p>
                <div className=" flex gap-4">
                    <Link><i className='fa-brands fa-facebook text-pink-500 text-[30px]'></i></Link>
                    <Link><i className='fa-brands fa-twitter text-pink-500 text-[30px]'></i></Link>
                    <Link><i className='fa-brands fa-instagram text-pink-500 text-[30px]'></i></Link>
                </div>
            </div>

            <div className="flex flex-col gap-10">
                <h1 className=' text-2xl'>Community</h1>
                <div className=" flex flex-col gap-1">
                    <Link><i className='fa-solid fa-long-arrow-right text-pink-500 me-2'></i> <span className="text-gray-500">Search Properties</span></Link>
                    <Link><i className='fa-solid fa-long-arrow-right text-pink-500 me-2'></i> <span className="text-gray-500">For Agents</span></Link>
                    <Link><i className='fa-solid fa-long-arrow-right text-pink-500 me-2'></i> <span className="text-gray-500">Reviews</span></Link>
                    <Link><i className='fa-solid fa-long-arrow-right text-pink-500 me-2'></i> <span className="text-gray-500">FAQs</span></Link>
                </div>
            </div>

            <div className="flex flex-col gap-10">
                <h1 className=' text-2xl'>Our Story</h1>
                <div className=" flex flex-col gap-1">
                    <Link><i className='fa-solid fa-long-arrow-right text-pink-500 me-2'></i> <span className="text-gray-500">Our Story</span></Link>
                    <Link><i className='fa-solid fa-long-arrow-right text-pink-500 me-2'></i> <span className="text-gray-500">Meet the Team</span></Link>
                    <Link><i className='fa-solid fa-long-arrow-right text-pink-500 me-2'></i> <span className="text-gray-500">Careers</span></Link>
                </div>
            </div>

            <div className="flex flex-col gap-10">
                <h1 className=' text-2xl'>Company</h1>
                <div className=" flex flex-col gap-1">
                    <Link><i className='fa-solid fa-long-arrow-right text-pink-500 me-2'></i> <span className="text-gray-500">About Us</span></Link>
                    <Link><i className='fa-solid fa-long-arrow-right text-pink-500 me-2'></i> <span className="text-gray-500">Press</span></Link>
                    <Link><i className='fa-solid fa-long-arrow-right text-pink-500 me-2'></i> <span className="text-gray-500">Contact</span></Link>
                    <Link><i className='fa-solid fa-long-arrow-right text-pink-500 me-2'></i> <span className="text-gray-500">Careers</span></Link>
                </div>
            </div>

            <div className="flex flex-col gap-10">
                <h1 className=' text-2xl'>Have a Question?</h1>
                <div className=" flex flex-col gap-2">
                    <div className=" flex gap-5 items-center">
                        <i className="fa-solid fa-location-dot text-pink-500"></i>
                        <p className=' text-gray-500'>203 Fake St. Mountain View, San Francisco, California, USA</p>
                    </div>
                    <div className=" flex gap-5 items-center">
                        <i className="fa-solid fa-phone text-pink-500"></i>
                        <p className=' text-gray-500'>+2 392 3929 210</p>
                    </div>
                    <div className=" flex gap-5 items-center">
                        <i className="fa-regular fa-envelope text-pink-500"></i>
                        <p className=' text-gray-500'>abc@yourdomain.com</p>
                    </div>
                </div>
            </div>
        </div>

        <div className=" text-center text-gray-600 mt-[5rem]">Copyright ©2024 All rights reserved</div>
    </div>
  )
}
