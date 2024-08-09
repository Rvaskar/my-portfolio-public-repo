import React, { useContext, useEffect, useState } from 'react'
import Project from './Project'
import InfoContext from '../../../context/InfoContext';

const AllProject = () => {
  const { allProjects } = useContext(InfoContext);
  const [filterProject, setFilterProject] = useState([]);

  
  useEffect(() => {
    if (allProjects.length > 0) {
      setFilterProject(allProjects);
    }
  }, [allProjects]);

  



  return (
    <section className='flex flex-col items-center mt-4 '>
       
        {filterProject?.map((project,index)=>{
          return <Project key={index+1} name={project.name} id={project._id} />
        })}
      
    </section>
  )
}

export default AllProject
