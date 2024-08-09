import React from "react";
import { Link } from "react-router-dom";

const Project = ({ id, img, name, description, technology, url }) => {
  return (
    <div className="w-full md:w-64 border text-white flex pb-9 relative flex-col items-center rounded-xl">
      <div className="w-full h-40 rounded-t-xl">
        <img
          src={img}
          className="object-cover w-full h-full rounded-t-xl"
          alt={name}
        />
      </div>
      <Link to={url} target="_blank"  rel="noopener noreferrer" className="my-2 font-bold text-lg hover:text-customColor3">{name}</Link>
      <p className="text-xs my-1 mb-2 px-1 text-center">
        {description.length > 150? `${description.slice(0, 150)}...` : description }
      </p>
      <p className="text-xs flex justify-center flex-wrap pb-1 mb-2">
        {technology?.map((tag) => (
          <span
            key={tag}
            className="p-0.5 m-0.5 px-1 mx-1 rounded-md bg-customColor2 text-customColor3"
          >
            {tag}
          </span>
        ))}
      </p>
      <Link
        to={`/project/${id}`}
        className="hover:bg-gradient-to-b  text-customColor3 border-t-2 from-black to-customBg hover:border-l-customColor3 hover:border-t-customColor3 text-center absolute bottom-0  w-full py-2 mt-3 rounded-b-xl transition duration-300 ease-in-out hover:shadow-lg"
      >
        Learn More
      </Link>
    </div>
  );
};

export default Project;
