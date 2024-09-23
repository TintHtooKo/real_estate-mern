import React, { useEffect } from 'react'
import './Service.css'
import Aos from 'aos'
import 'aos/dist/aos.css'
import DownPayment from '../../assets/payment.svg'
import Purse from '../../assets/purse.svg'
import File from '../../assets/file.svg'
import Lock from '../../assets/lock.svg'
import ImgOne from '../../assets/img1.webp'
import One from '../../assets/one.svg'
import Two from '../../assets/two.svg'
import Three from '../../assets/three.svg'
import Four from '../../assets/four.svg'

export default function Service() {
  useEffect(()=>{
    Aos.init({duration:1000})
  })
  return (
    <div className=" my-10">

        <div className=" flex flex-col items-center">
            <small className=" text-pink-500 text-xl">_____ Our Service _____</small>
            <h1 className='smartest text-center sm:text-2x text-4xl'>The smartest way to buy a home</h1>
        </div> 

        <div className="service mx-10 mt-20">
          <div  data-aos="zoom-out"  className=" flex flex-col gap-5 items-center">
            <img src={DownPayment} className=' w-20 text-pink-500' alt="" />
            <h1 className=' text-[25px]'>No Downpayment</h1>
            <p className=' text-center text-gray-600'>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
          </div>

          <div  data-aos="zoom-out"  className=" flex flex-col gap-5 items-center">
            <img src={Purse} className=' w-20 text-pink-500' alt="" />
            <h1 className=' text-[25px]'>All Cash Offer</h1>
            <p className=' text-center text-gray-600'>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
          </div>

          <div  data-aos="zoom-out"  className=" flex flex-col gap-5 items-center">
            <img src={File} className=' w-20 text-pink-500' alt="" />
            <h1 className=' text-[25px]'>Experts in Your Corner</h1>
            <p className=' text-center text-gray-600'>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
          </div>

          <div  data-aos="zoom-out"  className=" flex flex-col gap-5 items-center">
            <img src={Lock} className=' w-20 text-pink-500' alt="" />
            <h1 className=' text-[25px]'>No Downpayment</h1>
            <p className=' text-center text-gray-600'>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
          </div>
        </div>

        <div className=" work flex items-start justify-evenly mt-32 mx-20">
          <div className=" howitwork bg-black w-[50%] p-[24.5px]">
              <div className="flex flex-col items-center">
                <p className='text-white'><span className=' text-pink-500'>_____</span> WORK FLOW <span className=' text-pink-500'>____</span></p>
                <h1 className='text-white font-bold text-3xl'>HOW IT WORK</h1>
              </div>

              <div className="mt-10 work-flow">
                <div data-aos='fade-up'  className=" flex flex-col gap-5 items-center">
                  <img src={One} className=' w-20 text-pink-500' alt="" />
                  <h1 className=' text-[25px] text-gray-200'>Evaluate Property</h1>
                  <p className=' text-center text-gray-300 text-[14px]'>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                </div>

                <div data-aos='fade-up'  className=" flex flex-col gap-5 items-center">
                  <img src={Two} className=' w-20 text-pink-500' alt="" />
                  <h1 className=' text-[25px] text-gray-200'>Meet Your Agent</h1>
                  <p className=' text-center text-gray-300 text-[14px]'>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                </div>

                <div data-aos='fade-up'  className=" flex flex-col gap-5 items-center">
                  <img src={Three} className=' w-20 text-pink-500' alt="" />
                  <h1 className=' text-[25px] text-gray-200'>Close the Deal</h1>
                  <p className=' text-center text-gray-300 text-[14px]'>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                </div>

                <div data-aos='fade-up'  className=" flex flex-col gap-5 items-center">
                  <img src={Four} className=' w-20 text-pink-500' alt="" />
                  <h1 className=' text-[25px] text-gray-200'>Have Your Property</h1>
                  <p className=' text-center text-gray-300 text-[14px]'>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                </div>
              </div>
          </div>
          <div className="">
            <img src={ImgOne}  alt="" />
          </div>
        </div>

        {/* work flow mobile design */}
        <div className="work-mob p-10">
        <div className="">
              <div className="flex flex-col items-center">
                <p className='text-white'><span className=' text-pink-500'>_____</span> WORK FLOW <span className=' text-pink-500'>____</span></p>
                <h1 className='text-white font-bold text-3xl'>HOW IT WORK</h1>
              </div>

              <div className="mt-10 flex flex-col gap-10">
                <div  className=" flex flex-col gap-5 items-center">
                  <img src={One} className=' w-20 text-pink-500' alt="" />
                  <h1 className=' text-[25px] text-gray-200'>Evaluate Property</h1>
                  <p className=' text-center text-gray-300 text-[14px]'>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                </div>

                <div  className=" flex flex-col gap-5 items-center">
                  <img src={Two} className=' w-20 text-pink-500' alt="" />
                  <h1 className=' text-[25px] text-gray-200'>Meet Your Agent</h1>
                  <p className=' text-center text-gray-300 text-[14px]'>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                </div>

                <div  className=" flex flex-col gap-5 items-center">
                  <img src={Three} className=' w-20 text-pink-500' alt="" />
                  <h1 className=' text-[25px] text-gray-200'>Close the Deal</h1>
                  <p className=' text-center text-gray-300 text-[14px]'>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                </div>

                <div  className=" flex flex-col gap-5 items-center">
                  <img src={Four} className=' w-20 text-pink-500' alt="" />
                  <h1 className=' text-[25px] text-gray-200'>Have Your Property</h1>
                  <p className=' text-center text-gray-300 text-[14px]'>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                </div>
              </div>
          </div>
        </div>
    </div>
  )
}
