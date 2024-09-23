import React, { useEffect, useState } from 'react'

export default function ScrollToTop() {
    const [scrolled, setScrolled] = useState(false);
  
    const scrollToTop = () =>{
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }
    useEffect(()=>{
        const handleScroll = () => {
          if(window.scrollY > 50){
            setScrolled(true)
          }else{
            setScrolled(false)
          }
        }
        window.addEventListener('scroll', handleScroll)
          return () => {
            window.removeEventListener('scroll', handleScroll)
          }
      },[])
  return (
    <div className="scrolltop">
        <button onClick={scrollToTop} className={`  fixed bottom-10 right-10 bg-pink-500 p-3 rounded-full text-white ${scrolled ? 'scrolled' : 'opacity-0'}`}>
          <i className="fa-solid fa-arrow-up"></i>
        </button>
          
      </div>
  )
}
