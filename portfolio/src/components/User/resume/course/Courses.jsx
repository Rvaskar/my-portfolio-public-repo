import React, { useContext } from 'react'
import PortfolioContext from '../../../../context/PortfolioContext';
import Course from './Course';

const Courses = () => {
    const { allCourses } = useContext(PortfolioContext);
  return (
    <section className='my-6'>
       <h2 className='text-2xl text-white font-bold  py-3'> Course</h2>
        {allCourses.length !== 0? allCourses?.map((projects,index)=>{
          return <Course key={index} id={projects._id} name={projects.name} description={projects.description}  tags={projects.tags} />
        }): <h1 className='font-semibold text-white text-3xl'>Loading...</h1>}
      
    </section>
  )
}

export default Courses
