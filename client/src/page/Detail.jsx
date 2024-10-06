import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from '../helper/axios'
import { FaBath, FaBed } from 'react-icons/fa'
import { TbViewportWide } from 'react-icons/tb'
import Hero from '../component/hero/Hero'
import './css/Detail.css'
import moment from 'moment';
import { AuthContext } from '../context/AuthContext'
import { toast, ToastContainer } from 'react-toastify'

export default function Detail() {
    let title = "PROPERTY DETAILS"
    let [property,setProperty] = useState('')
    let [agent,setAgent] = useState([])
    let {id} = useParams()
    let [selectedImage, setSelectedImage] = useState(null)
    let {user} = useContext(AuthContext)
    let [name,setName] = useState(user?.fullname)
    let [email,setEmail] = useState(user?.email)
    let [phone,setPhone] = useState(user?.phone)
    let [selectAgent,setSelectAgent] = useState('')
    let [selectProperty,setSelectProperty] = useState('')
    
    let navigate = useNavigate()
    useEffect(()=>{
        let fetchAgent = async()=>{
            let res = await axios.get('/user/adminlist')
            setAgent(res.data);    
        }
        fetchAgent()
    },[])

    useEffect(()=>{
        let fetchProperty = async()=>{
            let res = await axios.get(`/property/detail/${id}`)   
            setProperty(res.data)    
            setSelectProperty(res.data._id) 
        }
        fetchProperty()
    },[id])

    let openImageModal = (image) => {
        setSelectedImage(image)
    };


    let closeModal = () => {
        setSelectedImage(null);
    };

    let handleSubmit = async(e) =>{
        e.preventDefault()
        try {
            if(user === null){
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                navigate('/login')
            }
            if(name === '' || email === '' || phone === ''){
                toast.error('All fields are required',{
                    position : 'top-right',
                    autoClose : 4000,
                    pauseOnHover : true,
                    draggable : true,
                    theme : 'dark'
                })
            }
            let data = {name,email,phone,property:selectProperty,agent:selectAgent !== '' ? selectAgent : null}
            let res = await axios.post('/apoint/create',data)
            if(res.status === 200){
                toast.success('Apointment create successfully. We will contact you as soon as possible.',{
                    position : 'top-right',
                    autoClose : 4000,
                    pauseOnHover : true,
                    draggable : true,
                    theme : 'dark'
                })
                setSelectAgent('')
            }
        } catch (error) {
            console.log(error);           
        }
    }

  return (
    <>
        <div className="">
            <Hero title={title}/>
        </div>

        <div className=" detail flex items-start justify-center gap-4 mt-20">

            <div className=" detail-left flex flex-col items-center ms-10 border">
                <div className=" relative">
                    {
                        property.image && property.image.length > 0 && (
                            <img src={import.meta.env.VITE_BACKEND_URL_ACCESS + property.image[0]} alt="" />
                        )
                    }
                    <span className=' absolute top-0 bg-pink-500 text-white px-3 py-1'>{property?.rentsell?.name}</span>
                </div>

                <div className=" dl flex items-start justify-between w-[90%] my-5  border-b ">
                    <div className="">
                        <h1 className=' text-2xl text-pink-500'>AED {property.price}</h1>
                    </div>
                    <div className="">
                        <h1 className=' text-xl text-gray-500'>Home Type</h1>
                        <p className=' text-gray-600 mb-3'>{property?.type?.name}</p>
                    </div>
                    <div className=" flex gap-5 mb-3">
                        <div className=" flex flex-col items-start text-gray-600">
                        <FaBed/> {property.bedroom}
                        </div>
                        <div className=" flex flex-col items-start text-gray-600">
                        <FaBath/> {property.bathroom}
                        </div>
                        <div className=" flex flex-col items-start text-gray-600">
                        <TbViewportWide/> {property.sqft} sqft
                        </div>
                    </div>
                </div>

                <div className=" mb-5 w-[90%] border-b">
                    <h1 className=' text-2xl mb-3'>More Info</h1>
                    <p className=' text-gray-500 mb-3'>{property.moreinfo}</p>
                </div>

                <div className=" w-[90%] mb-3">
                    <h1 className=' text-2xl mb-3'>Gallery</h1>
                </div>

                <div className=" w-[90%] gallery">
                    {
                        property?.image?.length > 0 && property.image.map((item,index)=>{
                            return(
                                <img 
                                src={import.meta.env.VITE_BACKEND_URL_ACCESS + item} 
                                className=' cursor-zoom-in border ' 
                                key={index} 
                                onClick={() => openImageModal(import.meta.env.VITE_BACKEND_URL_ACCESS + item)}
                                />
                            )
                        })
                    }
                </div>
                {selectedImage && (
                        <div className="modal box fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className=" relative flex items-center justify-center">
                                <img src={selectedImage} alt="Enlarged" className=" ms-10 w-[60%]" />
                                <button 
                                    className=" absolute top-0 right-[10px] text-white text-xl bg-pink-500 p-2 rounded"
                                    onClick={closeModal}
                                >
                                    <i className=' fa-solid fa-x'></i>
                                </button>
                            </div>
                        </div>
                    )}
            </div>
            

            <div className=" detail-right me-10">
                <div className=" border p-3 mb-5">
                    <h1 className=' text-2xl mb-3'>Get Apointment</h1>
                    <form action="" onSubmit={handleSubmit} className=' flex items-start flex-col gap-5'>
                        <div className=" flex flex-col">
                            <label htmlFor="">Your Name</label>
                            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className=' border-b w-[30rem] border-r rounded p-2 px-4 text-gray-700 outline-none shadow-md' />
                        </div>

                        <div className=" flex flex-col">
                            <label htmlFor="">Your Email</label>
                            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className=' border-b w-[30rem] border-r rounded p-2 px-4 text-gray-700 outline-none shadow-md' />
                        </div>

                        <div className=" flex flex-col">
                            <label htmlFor="">Your Contact Number</label>
                            <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} className=' border-b w-[30rem] border-r rounded p-2 px-4 text-gray-700 outline-none shadow-md' />
                        </div>

                        <input type="hidden" value={selectProperty} name="" />

                        <div className=" flex flex-col">
                            <label htmlFor="">Select Agent</label>
                            <select value={selectAgent} onChange={(e)=>setSelectAgent(e.target.value)} className=' border-b w-[30rem] border-r rounded p-2 px-4 text-gray-700 outline-none shadow-md'>
                                <option value="">Random</option>
                                {
                                    agent.map((item,index)=>(
                                        <option value={item._id} key={index}>{item.fullname}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="">
                            <button type='submit' className=' bg-pink-500 text-white px-4 py-2 rounded'>Submit</button>
                        </div>
                    </form>
                </div>

                <div className=" border p-3 mb-3">
                    <h1 className=' text-2xl mb-3'>Description</h1>
                    <p className=' text-gray-500'>{property.desc} </p>
                </div>

                <div className=" border p-3 mb-3"> 
                    <h1 className=' text-2xl mb-3'>Location</h1>
                    <p className=' text-gray-500'>{property.location}</p>
                </div>

                <div className=" border p-3 mb-3">
                    <h1 className=' text-2xl mb-3'>Upload Date</h1>
                    <p className=' text-gray-500'>{moment(property.updatedAt).format('MMMM Do, YYYY')}</p>
                </div>
            </div>

        </div>
        <ToastContainer/>
    </>
  )
}
