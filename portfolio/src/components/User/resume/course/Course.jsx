import React from 'react'

const Course = ({name,description,tags}) => {
  return (
    <div className=' my-2 py-2 px-4 rounded-xl items-center border border-slate-700  '>
        <p className='text-white text-xl font-semibold py-2'>{name}</p>
        <p className='text-white text-sm pl-2 pb-2 mb-2'>{description}</p>
        <div className='flex gap-1 flex-wrap'>{tags?.map((tag) => (
            tag !== ""? <span key={tag} className='p-1 m-0.5 mx-1 text-xs rounded-md bg-customColor2 text-customColor3'>{tag}</span> : " "
          ))}</div>
      
    </div>
  )
}

export default Course
