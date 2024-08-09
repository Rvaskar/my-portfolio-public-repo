import React, { useContext, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import axios from "axios";
import InfoContext from "../../context/InfoContext";

const UploadProject = () => {
  const { BASE_URL } = useContext(InfoContext);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    url: "",
    technology: [],
    details: "",
    coverImage: "",
    outputImage: [],
    tags: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "technology" || name === "tags" ? value.split(" ") : value,
    }));
  };

  const resizeImage = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = 1024; // Maximum width or height
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => {
              callback(reader.result);
            };
          },
          "image/jpeg",
          0.8 // Compress to 80% quality
        );
      };
    };
    reader.onerror = (error) => {
      console.error("Error: ", error);
    };
  };

  const convertToBase64 = (e) => {
    const file = e.target.files[0];
    if (file) {
      resizeImage(file, (base64) => {
        setFormData((prevData) => ({
          ...prevData,
          coverImage: base64,
        }));
      });
    }
  };

  const convertToBase = (e) => {
    const files = Array.from(e.target.files);
    const newOutputImages = [];

    files.forEach((file) => {
      resizeImage(file, (base64) => {
        newOutputImages.push(base64);
        if (newOutputImages.length === files.length) {
          setFormData((prevData) => ({
            ...prevData,
            outputImage: [...prevData.outputImage, ...newOutputImages],
          }));
        }
      });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const User = JSON.parse(localStorage.getItem("Profile"));
    if (User) {
      try {
        const response = await axios.post(
          `${BASE_URL}/project/addProject`,
          formData,
          {
            headers: {
              authorization: `Bearer ${User?.token}`,
            },
          }
        );
        console.log("Response:", response.data);

        // Reset form fields after successful submission
        setFormData({
          name: "",
          description: "",
          url: "",
          technology: [],
          details: "",
          coverImage: "",
          outputImage: [],
          tags: [],
        });
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
    return false;
  };

  return (
    <div className="text-base flex my-5 justify-center text-customColor4 transition-all ease-in-out delay-150">
      <section className="w-5/6">
        <h1 className="text-white text-2xl font-bold mb-5 pb-5">
          Add New Project Details
        </h1>
        <form className="my-4" onSubmit={handleSubmit}>
          <div className="flex flex-col justify-between my-3">
            <label htmlFor="name">Enter Project Name:</label>
            <input
              className="w-full bg-customColor2 my-3 p-3 focus:outline-customColor3 outline-none border-0 text-white text-sm rounded-md"
              type="text"
              name="name"
              onChange={handleChange}
              id="name"
              placeholder="Enter Name"
              value={formData.name}
            />
            <label htmlFor="description">Enter Description:</label>
            <input
              className="w-full bg-customColor2 my-3 p-3 focus:outline-customColor3 outline-none border-0 text-white text-sm rounded-md"
              type="text"
              name="description"
              onChange={handleChange}
              id="description"
              placeholder="Enter description"
              value={formData.description}
            />
            <label htmlFor="url">Enter Url (GitHub/Deploy link):</label>
            <input
              className="w-full bg-customColor2 my-3 p-3 focus:outline-customColor3 outline-none border-0 text-white text-sm rounded-md"
              type="text"
              name="url"
              onChange={handleChange}
              id="url"
              placeholder="Enter Url"
              value={formData.url}
            />
            <label htmlFor="tags">
              Enter Project Type (e.g., MERN / Web / Static):
            </label>
            <input
              className="w-full bg-customColor2 my-3 p-3 focus:outline-customColor3 outline-none border-0 text-white text-sm rounded-md"
              type="text"
              name="tags"
              id="tags"
              placeholder="Enter Project Type"
              onChange={handleChange}
              value={formData.tags.join(" ")}
            />
            <label htmlFor="technology">
              Enter Technologies Used (separate by space):
            </label>
            <input
              className="w-full bg-customColor2 my-3 p-3 focus:outline-customColor3 outline-none border-0 text-white text-sm rounded-md"
              type="text"
              name="technology"
              id="technology"
              placeholder="Enter technology"
              onChange={handleChange}
              value={formData.technology.join(" ")}
            />
          </div>

          <div className="py-2">
            <h3 className="py-2">Upload Cover Image</h3>
            <input type="file" accept="image/*" onChange={convertToBase64} />
            {formData.coverImage && (
              <img
                id="displayImage"
                src={formData.coverImage}
                alt="Cover"
                width={700}
                height={500}
              />
            )}
          </div>

          <label htmlFor="details">Details :</label>
          <textarea
            className="w-full min-h-52 my-4 bg-customColor2 p-3 focus:outline-customColor3 outline-none border-0 text-white text-sm rounded-md"
            name="details"
            id="details"
            onChange={handleChange}
            placeholder="Project Details max-250 words"
            value={formData.details}
          ></textarea>

          <div className="py-2 my-2 mb-4">
            <h3 className="my-1 py-2">Upload Multiple Images</h3>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={convertToBase}
            />
            <div id="imagesContainer">
              {formData.outputImage.map((base64, index) => (
                <img
                  key={index}
                  src={base64}
                  alt="Uploaded"
                  style={{
                    display: "block",
                    margin: "10px",
                    maxWidth: "100px",
                  }}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-start">
            <button
              type="submit"
              className="rounded-md text-customColor3 border-slate-700 border-l border-t flex justify-around items-center p-3 hover:bg-gradient-to-br from-black to-customBg hover:border-l-customColor3 hover:border-t-customColor3 w-44"
            >
              <BsFillSendFill /> Add New Project
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UploadProject;
