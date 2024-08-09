import React from "react";

const PersonalInfo = ({ img, title, content }) => {
  return (
    <div className="flex text-sm my-7">
      <div className="rounded-md text-customColor3 border-slate-700  border-l border-t flex justify-center items-center min-w-11 h-11 text-xl">
        {img}
      </div>
      <div className="pl-1">
        <h5 className="pl-2 text-customColor4 " >{title}</h5>
        <p className="pl-2 overflow-x-auto"> {content}</p>
      </div>
    </div>
  );
};

export default PersonalInfo;
