import React, { useContext, useState } from "react";
import axios from "axios";
import InfoContext from "../../../context/InfoContext";

const Certi = ({ name, id }) => {
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
        await axios.delete(`${BASE_URL}/certificate/deleteCertificate/${id}`, {
          headers: {
            authorization: `Bearer ${result?.token}`,
          },
        });
        setSuccess(true);
        window.location.reload(); // Refresh the page
      } catch (err) {
        setError("Failed to delete the message");
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
      {success && (
        <p className="text-green-600">Message deleted successfully</p>
      )}
    </div>
  );
};

export default Certi;
