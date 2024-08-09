import axios from "axios";
import React, { useContext, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import InfoContext from "../../../context/InfoContext";

const AddCourse = () => {
  const { BASE_URL } = useContext(InfoContext);
  const [courseData, setCourseData] = useState({
    name: "",
    description: "",
    tags: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: name === "tags" ? value.split(" ") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const User = JSON.parse(localStorage.getItem("Profile"));
    if (User) {
    try {
      const response = await axios.post(
        `${BASE_URL}/course/addCourse`,
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
        description: "",
        tags: [],
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
          Add New Course Details
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-between my-3">
            <label htmlFor="name">Enter Course Name:</label>
            <input
              className="w-full bg-customColor2 my-3 p-3 focus:outline-customColor3 outline-none border-0 text-white text-sm rounded-md"
              type="text"
              name="name"
              onChange={handleChange}
              value={courseData.name}
              id="name"
              placeholder="Enter Name"
            />
            <label htmlFor="tags">
              Enter Technical skills that you learn separated by space:{" "}
            </label>
            <input
              className="w-full bg-customColor2 my-3 p-3 focus:outline-customColor3 outline-none border-0 text-white text-sm rounded-md"
              type="text"
              name="tags"
              onChange={handleChange}
              value={courseData.tags.join(" ")}
              id="tags"
              placeholder="Enter Technologies that you learn separate by space"
            />
          </div>
          <label htmlFor="description">Description :</label>
          <textarea
            className="w-full min-h-52 my-4 bg-customColor2 p-3 focus:outline-customColor3 outline-none border-0 text-white text-sm rounded-md"
            name="description"
            onChange={handleChange}
            value={courseData.description}
            id="description"
            placeholder="Course Description max-250 words"
          ></textarea>
          <div className="flex justify-start">
            <button
              type="submit"
              className="rounded-md text-customColor3 border-slate-700 border-l border-t flex justify-around items-center p-3 hover:bg-gradient-to-br from-black to-customBg hover:border-l-customColor3 hover:border-t-customColor3 w-44"
            >
              <BsFillSendFill /> Add new Course
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddCourse;
