import React from 'react'
import { Link } from 'react-router-dom'

export default function Pagination({links,page,location}) {
  return (
    <nav aria-label="Page navigation example">
          <ul className="flex items-center -space-x-px h-8 text-sm">
            <li>
              <Link to={`${links.previousPage ? `${location.pathname}?page=` + (page - 1) : `${location.pathname}?page=`  + (page)}`}  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span className="sr-only">Previous</span>
                <svg className="w-2.5 h-2.5 rtl:rotate-180 text-pink-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                </svg>
              </Link>
            </li>
            {
                links.loopLinks.map(link =>{
                    if(link.number == page){
                       return (
                        <li key={link.number}>
                        <Link  to={`${location.pathname}?page=${link.number}`} className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-white border bg-pink-500 border-blue-300">{link.number}</Link>
                        </li>
                       )
            
                    }else{
                         return(
                            <li key={link.number}>
                            <Link  to={`${location.pathname}?page=${link.number}`} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{link.number}</Link>
                            </li>
                         )
                    }
                
                } 
                    )
            }
            <li>
              <Link to={`${links.nextPage ? `${location.pathname}?page=` + (page + 1) : `${location.pathname}?page=`  + (page)}`} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <span className="sr-only">Next</span>
                <svg className="w-2.5 h-2.5 rtl:rotate-180 text-pink-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                </svg>
              </Link>
            </li>
          </ul>
        </nav>
  )
}
