import React from 'react'

export default function Skeleton() {
  return (
    <div className=" h-[100vh]">
        <div className=" flex items-center justify-between mt-5 mx-[50px]">
            <div className=" bg-gray-200 animate-pulse w-[60px] px-3 py-4"></div>
            <div className=" bg-gray-200 animate-pulse w-[50rem] px-3 py-4"></div>
            <div className=" bg-gray-200 animate-pulse w-[100px] px-3 py-4"></div>
        </div>
        <div className=" bg-gray-200 animate-pulse h-[80vh] px-3 py-4 mt-5 mx-[50px]"></div>
    </div>
  )
}
