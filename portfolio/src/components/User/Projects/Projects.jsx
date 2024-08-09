import React, { useContext, useEffect, useState } from 'react'
import Project from './Project'
import PortfolioContext from '../../../context/PortfolioContext'


const Projects = () => {

  const { allProjects } = useContext(PortfolioContext);
  const [filterProject, setFilterProject] = useState([]);
  

  useEffect(() => {
    if (allProjects.length > 0) {
      setFilterProject(allProjects);
    }
  }, [allProjects]);
  
  const filterByTag = (tag) => {
    const filtered = allProjects.filter((project) => project.tags.includes(tag));
    setFilterProject(filtered);
  };

  console.log(allProjects)

  return (
    <div className='text-base text-customColor4 transition-all ease-in-out delay-150'>
      <h1 className='text-white text-3xl font-bold pb-5'>Projects</h1>
      <p className="bg-customColor3 w-20 rounded h-1 mb-5 "></p>
      <p className='text-blue-500 text-sm font-light'>To view the project's GitHub code or deployed link, simply click on the project name.</p>
      <nav className='text-white text-sm md:text-base pl-3'>
        <ul className='flex gap-5 py-4 mb-4'>
          <li className='cursor-pointer' onClick={()=>setFilterProject(allProjects)}>All</li>
          <li className='cursor-pointer' onClick={()=>filterByTag('mern')}>MERN</li>
          <li className='cursor-pointer' onClick={()=>filterByTag('web')}>Web</li>
          <li className='cursor-pointer' onClick={()=>filterByTag('static')}>Static Clone</li>
        </ul>
      </nav>
      <section className='flex flex-wrap justify-start gap-10'>
        
        {filterProject.length !== 0? filterProject?.map((projects,index)=>{
          return <Project key={index} id={projects._id} img={projects.coverImage} name={projects.name} description={projects.description} technology={projects.technology} url={projects.url}  />
        }): <h1 className='font-semibold text-white text-xl'>Projects Not Found...</h1>}
        
      </section>
    </div>
  )
}

export default Projects
