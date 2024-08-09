import React, { useContext, useState } from "react";
import axios from "axios";
import InfoContext from "../../../context/InfoContext";
import { Link } from "react-router-dom";

const Course = ({ id, name }) => {
  const { BASE_URL } = useContext(InfoContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    const result = JSON.parse(localStorage.getItem("Profile"));
    if (result) {
      try {
        await axios.delete(`${BASE_URL}/course/deleteCourse/${id}`, {
          headers: {
            authorization: `Bearer ${result?.token}`,
          },
        });
        setSuccess(true);
        window.location.reload(); // Refresh the page
      } catch (err) {
        setError("Failed to delete the course");
      } finally {
        setLoading(false);
      }
    }
    return false;
  };

  return (
    <div className="w-3/5 border-slate-400 flex justify-between border p-3 my-2 rounded-xl">
      <h1>{name}</h1>
      <div className="w-1/5 flex justify-around">
        <Link
          to={`/admin/updateCourse/${id}`}
          className="rounded-md text-customColor3 border-slate-700 border-l border-t flex justify-around items-center px-3 hover:bg-gradient-to-tl from-black to-customBg hover:border-l-customColor3 hover:border-t-customColor3"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className={`rounded-md text-red-600 border-slate-700 border-l border-t flex justify-around items-center px-3 ${
            loading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gradient-to-tl from-black to-customBg hover:border-l-red-700 hover:border-t-red-600"
          }`}
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">Course deleted successfully</p>}
    </div>
  );
};

export default Course;
