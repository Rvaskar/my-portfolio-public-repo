import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Certi from './Certi'
import InfoContext from '../../../context/InfoContext';

const AllCertificates = () => {
  const { allCertificates } = useContext(InfoContext);
 
  return (
    <div className="w-5/6 pt-4 m-auto">
    <div className="flex justify-end w-4/5">
    <Link
       to={"/admin/addCertificate"}
       className="rounded-md text-customColor3  border-slate-700  border-l border-t flex justify-around items-center p-3 bg-gradient-to-br from-black to-customBg hover:border-l-customColor3  hover:border-t-customColor3  w-44"
     >
       Add New Certificate
     </Link>
    </div>
     <section className="flex flex-col items-center mt-4 ">
      {allCertificates?.map((course,index)=>{
        return  <Certi key={index+1} name={course.name} id={course._id}/>
      })}
     </section>
   </div>
  )
}

export default AllCertificates
