import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import Spinner from '../../assets/spinner.svg'
import './AddProperty.css'
import axios from '../../helper/axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function AddProperty() {
    let [loading, setLoading] = useState(false)
    let [rentsell, setRentsell] = useState([])
    let [type, setType] = useState([])
    let { id } = useParams()
    let [name, setName] = useState('')
    let [addType, setAddType] = useState('')
    let [addRentsell, setAddRentsell] = useState('')
    let [price, setPrice] = useState('')
    let [desc, setDesc] = useState('')
    let [moreinfo, setMoreinfo] = useState('')
    let [bedroom, setBedroom] = useState('')
    let [location, setLocation] = useState('')
    let [bathroom, setBathroom] = useState('')
    let [sqft, setSqft] = useState('')
    let [files, setFiles] = useState([])
    let [previews, setPreviews] = useState([])
    let [property,setProperty] = useState('')
    let navigate = useNavigate()

    useEffect(() => {
        let fetchDetail = async () => {
            let res = await axios.get(`/property/detail/${id}`)
            setProperty(res.data)
            setName(res.data.name)
            setAddType(res.data.type._id)
            setAddRentsell(res.data.rentsell._id)
            setPrice(res.data.price)
            setDesc(res.data.desc)
            setMoreinfo(res.data.moreinfo)
            setBedroom(res.data.bedroom)
            setLocation(res.data.location)
            setBathroom(res.data.bathroom)
            setSqft(res.data.sqft)

            if (Array.isArray(res.data.image)) {
                // If image is already an array of URLs, use it directly
                const imageURLs = res.data.image.map((path) => import.meta.env.VITE_BACKEND_URL_ACCESS + path);
                setPreviews(imageURLs);
            }
        }
        fetchDetail()
    }, [id])

    useEffect(() => {
        let fetchType = async () => {
            let res = await axios.get('/type')
            setType(res.data);
        }
        fetchType()
    }, [])

    useEffect(() => {
        let fetchRentSell = async () => {
            let res = await axios.get('/rentsell')
            setRentsell(res.data);
        }
        fetchRentSell()
    }, [])


    // for image upload
    let upload = (e) => {
        let selectedFiles = e.target.files;
        let fileArray = Array.from(selectedFiles); // Convert FileList to array

        fileArray.forEach((file) => {
            let fileReader = new FileReader();
            fileReader.onload = (event) => {
                setPreviews((prevPreviews) => [...prevPreviews, event.target.result]);
            };
            fileReader.readAsDataURL(file);
        });

        setFiles((prevFiles) => [...prevFiles, ...fileArray]);
    };

    let removeImage = (index) => {
        setFiles(files.filter((_, i) => i !== index));
        setPreviews(previews.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (!name || !addType || !addRentsell || !price || !desc || !moreinfo || !bedroom || !location || !bathroom || !sqft) {
                toast.error('All fields are required', {
                    position: 'top-right',
                    autoClose: 4000,
                    pauseOnHover: true,
                    draggable: true,
                    theme: 'dark'
                })
                setLoading(false)
                return
            }
            let data = {
                name, 
                type: addType,
                rentsell: addRentsell, 
                price, 
                desc, 
                moreinfo, 
                bedroom, 
                location, 
                bathroom, 
                sqft,
                }
            let res;
            if (id) {
                res = await axios.patch(`/property/update/${id}`, data)
                console.log(res.data);
                
            } else {
                res = await axios.post('/property/create', data)
            }

            let propertyId = id || res.data._id

            // image ko upload ma lote pal edit lote yin old image kyan ag files.length shi ma shi a yin sis tr
            if (files.length > 0) {
                let formData = new FormData()
                for (let i = 0; i < files.length; i++) {
                    formData.append('image', files[i])
                }

                let uploadImg = await axios.post(`/property/upload/${propertyId}`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                )
            }


            if (res.status === 200) {
                setName('')
                setAddType('')
                setAddRentsell('')
                setPrice('')
                setDesc('')
                setMoreinfo('')
                setBedroom('')
                setLocation('')
                setBathroom('')
                setSqft('')

                navigate('/admin/properties')
            }
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }

    }

    return (
        <>
            <div className="">
                <Link to={'/admin/property/' + property._id} className=' bg-slate-800 mt-4  px-2 rounded'><i className=' text-white fa-solid fa-arrow-left text-xl'></i></Link>
                <h1 className=' text-[2rem] my-4 text-center'>{id ? 'Edit' : 'Add New'} Property</h1>
                <div className=" flex items-center justify-center">
                    <form action="" onSubmit={handleSubmit} className='register'>
                        <div className=" flex flex-col items-start mb-8">
                            <label htmlFor="" className=' text-gray-500 font-bold ms-2'>Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className=' border-b border-r rounded-full p-2 px-4 w-[30rem] text-gray-700 outline-none shadow-md' placeholder=' The Blue Sky Home' />
                        </div>

                        <div className=" flex flex-col items-start mb-8">
                            <label htmlFor="" className=' text-gray-500 font-bold ms-2'>Type</label>
                            <select value={addType} onChange={(e) => setAddType(e.target.value)} name="" className=' border-b border-r rounded-full p-2 px-4 w-[30rem] text-gray-700 outline-none shadow-md' id="">
                                <option value="" className="text-gray-500">Choose One</option>
                                {
                                    type.map((item, index) => (
                                        <option key={index} value={item._id} className="text-gray-500">{item.name}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className=" flex flex-col items-start mb-8">
                            <label htmlFor="" className=' text-gray-500 font-bold ms-2'>Rent Or Sell</label>
                            <select name="" value={addRentsell} onChange={(e) => setAddRentsell(e.target.value)} className=' border-b border-r rounded-full p-2 px-4 w-[30rem] text-gray-700 outline-none shadow-md' id="">
                                <option value="" className="text-gray-500">Choose One</option>
                                {
                                    rentsell.map((item, index) => (
                                        <option key={index} value={item._id} className="text-gray-500">{item.name}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className=" flex flex-col items-start mb-8 hide">
                            <label htmlFor="" className=' text-gray-500 font-bold ms-2'>Price</label>
                            <input type="number" value={price} min={1} onChange={(e) => setPrice(e.target.value)} className=' border-b border-r rounded-full p-2 px-4 w-[30rem] text-gray-700 outline-none shadow-md' placeholder='$ 1000' />
                        </div>

                        <div className=" flex flex-col items-start mb-8">
                            <label htmlFor="" className=' text-gray-500 font-bold ms-2'>Description</label>
                            <textarea name="" value={desc} onChange={(e) => setDesc(e.target.value)} className=' border-b border-r rounded p-2 px-4 w-[30rem] h-[5rem] text-gray-700 outline-none shadow-md' placeholder='Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem cumque eos porro ... ' id=""></textarea>
                        </div>

                        <div className=" flex flex-col items-start mb-8">
                            <label htmlFor="" className=' text-gray-500 font-bold ms-2'>More Info</label>
                            <textarea name="" value={moreinfo} onChange={(e) => setMoreinfo(e.target.value)} className=' border-b border-r rounded p-2 px-4 w-[30rem] h-[10rem] text-gray-700 outline-none shadow-md' placeholder='Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem cumque eos porro ... ' id=""></textarea>
                        </div>

                        <div className=" flex flex-col items-start mb-8 hide">
                            <label htmlFor="" className=' text-gray-500 font-bold ms-2'>Bedroom</label>
                            <input type="number" value={bedroom} onChange={(e) => setBedroom(e.target.value)} className=' border-b border-r rounded-full p-2 px-4 w-[8rem] text-center text-gray-700 outline-none shadow-md' min={1} placeholder='1' />
                        </div>

                        <div className=" flex flex-col items-start mb-8 hide">
                            <label htmlFor="" className=' text-gray-500 font-bold ms-2'>Bathroom</label>
                            <input type="number" value={bathroom} onChange={(e) => setBathroom(e.target.value)} className=' border-b border-r rounded-full p-2 px-4 w-[8rem] text-center text-gray-700 outline-none shadow-md' min={1} placeholder='1' />
                        </div>

                        <div className=" flex flex-col items-start mb-8 hide">
                            <label htmlFor="" className=' text-gray-500 font-bold ms-2'>Square Feet</label>
                            <input type="number" value={sqft} onChange={(e) => setSqft(e.target.value)} className=' border-b border-r rounded-full p-2 px-4 w-[10rem] text-gray-700 outline-none shadow-md' min={1} placeholder=' 1500 sq/ft' />
                        </div>

                        <div className=" flex flex-col items-start mb-8">
                            <label htmlFor="" className=' text-gray-500 font-bold ms-2'>Location</label>
                            <textarea name="" onChange={(e) => setLocation(e.target.value)} value={location} className=' border-b border-r rounded p-2 px-4 w-[30rem] h-[5rem] text-gray-700 outline-none shadow-md' placeholder=' NO(123), Abc Building, Abc Street, ABC ' id=""></textarea>
                        </div>

                        <div className=" flex flex-col items-start mb-8">
                            <label htmlFor="" className=' text-gray-500 font-bold ms-2'>Image</label>
                            <input type="file" multiple onChange={upload} className=' border-b border-r rounded-full p-2 px-4 w-[30rem] text-gray-700 outline-none shadow-md' />
                        </div>

                        <div className="flex flex-wrap gap-4 mt-4">
                            {previews.map((preview, index) => (
                                <div key={index} className="relative">
                                    <img src={preview} className="w-40" alt={`Preview ${index + 1}`} />
                                    <button
                                        type='button'
                                        className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                                        onClick={() => removeImage(index)}
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>


                        <div className=" flex items-center mb-8">
                            <button type="submit" className=' bg-pink-500 flex items-center justify-center gap-5 text-white rounded-full p-2 px-4 w-full outline-none shadow-md transition-all duration-300 hover:shadow-pink-800'>
                                {
                                    loading && <img src={Spinner} alt="" />
                                }
                                {id ? 'Edit' : 'Add'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}
