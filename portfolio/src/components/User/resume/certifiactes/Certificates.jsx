import React, { useContext } from 'react'
import PortfolioContext from '../../../../context/PortfolioContext';
import Certificate from './Certificate';

const Certificates = () => {
    const { allCertificates } = useContext(PortfolioContext);

  return (
    <section className='my-6'>
       <h2 className='text-2xl text-white font-bold  py-3'> Certificates</h2>
        {allCertificates.length !== 0? allCertificates?.map((projects,index)=>{
          return <Certificate key={index} id={projects._id} name={projects.name} url={projects.certificateUrl}   />
        }): <h1 className='font-semibold text-white text-3xl'>Loading...</h1>}
      
    </section>
  )
}

export default Certificates
