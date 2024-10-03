import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './ApointDetail.css'
import axios from '../../helper/axios'
import moment from 'moment'

export default function ApointDetail() {
    let [detail,setDetail] = useState('')
    let {id} = useParams()
    useEffect(()=>{
        let fetchDetail = async()=>{
            let res = await axios.get('/apoint/detail/'+id)
            console.log(res.data);
            
            setDetail(res.data);
        }
        fetchDetail()
    },[id])
  return (
    <div className="">
        <Link to={'/admin/apointment'}><i className='fa-solid fa-long-arrow-left text-xl bg-black text-white px-3 m-5'></i></Link>
        <h1 className=' text-center text-2xl sm:text-3xl mb-5'>Apointment Detail</h1>
        <div className=" apoint-detail flex gap-10 mx-3">
            <div className="">
                {
                    detail?.property?.image && detail?.property?.image.length > 0 && (
                        <img className=' w-[40rem]' src={import.meta.env.VITE_BACKEND_URL_ACCESS + detail?.property?.image[0]} alt="" />
                    )
                }
            </div>
            <div className=" detail-grid">
                <div className="">
                    <div className="  flex flex-col mb-5 items-start">
                        <p className=' text-[20px]'>Name</p>
                        <span className=' text-[18px] text-gray-600'>{detail.name}</span>
                    </div>
                    <div className="  flex flex-col mb-5 items-start">
                        <p className='text-[20px]'>Phone</p>
                        <span className='text-[18px] text-gray-600'>{detail.phone}</span>
                    </div>
                    <div className="  flex flex-col mb-5 items-start">
                        <p className='text-[20px]'>Selected Agent</p>
                        <span className='text-[18px] text-gray-600'>{detail.agent == null ? 'Random' : detail?.agent?.fullname}</span>
                    </div>
                    <div className="  flex flex-col mb-5 items-start">
                        <p className='text-[20px]'>Date</p>
                        <span className='text-[18px] text-gray-600'>{moment(detail.createdAt).format('DD-MM-YYYY')}</span>
                    </div>
                </div>

                <div className="">
                    <div className="  flex flex-col mb-5 items-start">
                        <p className='text-[20px]'>Email</p>
                        <span className='text-[18px] text-gray-600'>{detail.email}</span>
                    </div>               
                    <div className="  flex flex-col mb-5 items-start">
                        <p className='text-[20px]'>Property</p>
                        <span className='text-[18px] text-gray-600'>{detail?.property?.name}</span>
                    </div>
                    <div className="  flex flex-col mb-5 items-start">
                        <p className='text-[20px]'>Location</p>
                        <span className='text-[18px] text-gray-600'>{detail?.property?.location}</span>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  )
}
