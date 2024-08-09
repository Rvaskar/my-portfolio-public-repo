import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PortfolioContext from '../../../context/PortfolioContext';

const ProjectDetails = () => {
  const { id } = useParams();
  const { allProjects } = useContext(PortfolioContext);
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (allProjects) {
      const foundProject = allProjects.find((project) => project._id === id);
      setProject(foundProject);
    }
  }, [id, allProjects]);

  if (!project) {
    return <div className='text-base text-customColor4 transition-all ease-in-out delay-150'>Loading...</div>;
  }

  return (
    <div className='text-base text-customColor4 transition-all ease-in-out delay-150'>
      <h1 className='text-white text-3xl font-bold pb-5'>Project Details</h1>
      <p className="bg-customColor3 w-24 rounded h-1 mb-5 "></p>
      <section className='text-white'>
        <div>
          <h3 className='inline-block text-customColor3 text-lg font-semibold mr-2 py-4'>Project Name :</h3> 
          {project.name}
         
        </div>
        <Link to={project.url} target="_blank"  rel="noopener noreferrer" className='rounded-md text-customColor3  border-slate-700  border-l border-t flex justify-around items-center p-3 bg-gradient-to-br from-black to-customBg hover:border-l-customColor3  hover:border-t-customColor3  w-44'>Open Project</Link>


        <div>
          <h3 className='inline-block text-customColor3 text-lg font-semibold mr-2 py-4'>Project Description :</h3> <br /> 
          {project.description}
        </div>
        <div>
          <h3 className='inline-block text-customColor3 text-lg font-semibold mr-2 py-4'>Technology Used :</h3> <br /> 
          {project?.technology.map((tag) => (
            <span key={tag} className='p-1 m-0.5 text-sm rounded-md bg-customColor2 text-white'>{tag}</span>
          ))}
        </div>
      </section>
      <div>
        <h3 className='inline-block text-customColor3 text-lg font-semibold mr-2 py-4'>Project Details :</h3> <br />
        {project.details}
      </div>
      <div>
        <h3 className='inline-block text-customColor3 text-lg font-semibold mr-2 py-4'>Output Images :</h3>
        <div className='grid grid-cols-1 gap-4'>
          {project.outputImage?.map((image, index) => (
            <img key={index} src={image} alt={`Output ${index + 1}`} className='w-full my-2 h-auto rounded-md' />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
