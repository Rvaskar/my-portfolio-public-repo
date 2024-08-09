import React, { useContext } from "react";
import Course from "./Course";
import { Link } from "react-router-dom";
import InfoContext from "../../../context/InfoContext";

const AllCourses = () => {
  const { allCourses } = useContext(InfoContext);
  return (
    <div className="w-5/6 pt-4 m-auto">
     <div className="flex justify-end w-4/5">
     <Link
        to={"/admin/addCourse"}
        className="rounded-md text-customColor3  border-slate-700  border-l border-t flex justify-around items-center p-3 bg-gradient-to-br from-black to-customBg hover:border-l-customColor3  hover:border-t-customColor3  w-44"
      >
        Add New Course
      </Link>
     </div>
      <section className="flex flex-col items-center mt-4 ">
        {allCourses?.map((course,index)=>{
          return <Course key={index+1} name={course.name} id={course._id} />
        })}
       
      </section>
    </div>
  );
};

export default AllCourses;
