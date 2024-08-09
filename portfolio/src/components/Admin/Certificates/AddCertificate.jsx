import axios from "axios";
import React, { useContext, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import InfoContext from "../../../context/InfoContext";

const AddCertificate = () => {
  const { BASE_URL } = useContext(InfoContext);

  const [courseData, setCourseData] = useState({
    name: "",
    certificateUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const User = JSON.parse(localStorage.getItem("Profile"));
    if (User) {
      try {
        const response = await axios.post(
          `${BASE_URL}/certificate/addCertificate`,
          courseData,
          {
            headers: {
              authorization: `Bearer ${User?.token}`,
            },
          }
        );
        console.log("Response:", response.data);
        // Reset form fields after successful submission
        setCourseData({
          name: "",
          certificateUrl: "",
        });
      } catch (error) {
        console.error("Error submitting form:", error);
        // Handle error (e.g., show an error message)
      }
    }
    return false;
  };

  return (
    <div className="text-base flex justify-center text-customColor4 transition-all ease-in-out delay-150">
      <section className="w-5/6">
        <h1 className="text-white text-2xl font-bold mb-5 pb-5">
          Add New Certificate Details
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-between my-3">
            <label htmlFor="name">Enter Certificate Name:</label>
            <input
              className="w-full bg-customColor2 my-3 p-3 focus:outline-customColor3 outline-none border-0 text-white text-sm rounded-md"
              type="text"
              name="name"
              onChange={handleChange}
              value={courseData.name}
              id="name"
              placeholder="Enter Name"
            />
            <label htmlFor="certificateUrl">Enter Certificate URL:</label>
            <input
              className="w-full bg-customColor2 my-3 p-3 focus:outline-customColor3 outline-none border-0 text-white text-sm rounded-md"
              type="text"
              name="certificateUrl"
              onChange={handleChange}
              value={courseData.certificateUrl}
              id="certificateUrl"
              placeholder="Enter Certificate URL"
            />
          </div>

          <div className="flex justify-start">
            <button
              type="submit"
              className="rounded-md text-customColor3 border-slate-700 border-l border-t flex justify-around items-center p-3 hover:bg-gradient-to-br from-black to-customBg hover:border-l-customColor3 hover:border-t-customColor3 w-48"
            >
              <BsFillSendFill /> Add New Certificate
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddCertificate;
