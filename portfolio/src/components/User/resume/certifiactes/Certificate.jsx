import React from 'react'
import { Link } from 'react-router-dom'

const Certificate = ({name,url}) => {
  return (
    <div className='flex justify-between my-2 py-2 px-4 rounded-xl items-center border border-slate-700  '>
        <p>{name}</p>
        <Link to={url}  target="_blank"  rel="noopener noreferrer"  className='rounded-md text-customColor3 border-slate-700  border-l border-t flex justify-around items-center py-1 px-4 hover:bg-gradient-to-br from-black to-customBg hover:border-l-customColor3  hover:border-t-customColor3  '>Open</Link>
      
    </div>
  )
}

export default Certificate
