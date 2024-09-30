import { useParams } from 'react-router-dom';
import axios from '../../helper/axios';
import React, { useEffect, useState } from 'react';
import './AdminPropertyDetail.css'
import { Link } from 'react-router-dom';
export default function AdminPropertyDetail() {
  const [property, setProperty] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const fetchProperty = async () => {
      if (id) {
        const res = await axios.get('/property/detail/' + id);
        setProperty(res.data);
      }
    };
    fetchProperty();
  }, [id]);

  const Prev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? property.image.length - 1 : prev - 1
    );
  };

  const Next = () => {
    setCurrentIndex((next) =>
      next === property.image.length - 1 ? 0 : next + 1
    );
  };

  return (
    <div className="">
        <div className=" flex items-center justify-between mx-5 mt-5">
            <Link to={'/admin/properties'} className=' bg-slate-800  px-1 rounded'><i className=' text-white fa-solid fa-arrow-left text-xl cursor-pointer'></i></Link>
            <Link to={'/admin/add/property/' + property._id} className=' bg-slate-800  px-2 rounded'><i className=' text-white fa-solid fa-pen text-xl'></i></Link>
        </div>

        <div className=" m-5 adproperty">
            <div className="imgdiv relative w-[400px] h-[280px]">
                {property?.image && property.image.length > 0 && (
                    <div className="w-full h-full overflow-hidden rounded border-2 border-gray-300 relative">
                        <img
                            src={import.meta.env.VITE_BACKEND_URL_ACCESS + property.image[currentIndex]}
                            className="w-full h-full object-cover transition-transform duration-300 ease-in-out"
                            alt="Property Image"
                        />

                        {/* Left Arrow */}
                        <button
                            onClick={Prev}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none"
                        >
                            <i className='fa-solid fa-chevron-left'></i>
                        </button>

                        {/* Right Arrow */}
                        <button
                            onClick={Next}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none"
                        >
                            <i className='fa-solid fa-chevron-right'></i>
                        </button>
                    </div>
                )}
            </div>
            <div className=" detaildiv flex flex-col gap-5">
                <div className=" flex flex-col items-start gap-2">
                    <h1 className=" font-bold">Name  </h1>
                    <p className="">{property.name}</p>
                </div>
                         
                <div className=" flex flex-col items-start gap-2">
                    <h1 className=" font-bold">Rent Or Sell  </h1>
                    <p className="">{property?.rentsell?.name}</p>
                </div>
                
                <div className=" flex flex-col items-start gap-2">
                    <h1 className=" font-bold">Bedroom  </h1>
                    <p className="">{property.bedroom}</p>
                </div>
                
                <div className=" flex flex-col items-start gap-2">
                    <h1 className=" font-bold">Sqft  </h1>
                    <p className="">{property.sqft} sq/ft</p>
                </div>
                
                
            </div>
            <div className="detaildiv flex flex-col gap-5">
                <div className=" flex flex-col items-start gap-2">
                    <h1 className=" font-bold">Home Type  </h1>
                    <p className="">{property?.type?.name}</p>
                </div>  

                <div className=" flex flex-col items-start gap-2">
                    <h1 className=" font-bold">Price  </h1>
                    <p className="">{property.price} AED</p>
                </div>

                <div className=" flex flex-col items-start gap-2">
                    <h1 className=" font-bold">Bathroom  </h1>
                    <p className="">{property.bathroom}</p>
                </div>

                <div className=" flex flex-col items-start gap-2">
                    <h1 className=" font-bold">Location  </h1>
                    <p className="">{property.location}</p>
                </div>
            </div>
        </div>
        <div className=" m-5">
            <div className=" flex flex-col items-start gap-2">
                <h1 className=" font-bold">Description  </h1>
                <p className="">{property.desc}</p>
            </div>
            <div className=" flex flex-col items-start gap-2">
                <h1 className=" font-bold">More Info  </h1>
                <p className="">{property.moreinfo}</p>
            </div>
        </div>
    </div>
  );
}
