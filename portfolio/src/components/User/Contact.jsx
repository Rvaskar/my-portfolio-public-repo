import React, { useContext, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import axios from "axios";
import PortfolioContext from "../../context/PortfolioContext";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const { BASE_URL } = useContext(PortfolioContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/contact/addMessage`, formData);
      setFormData({ name: "", email: "", message: "" });
      alert("Message sent successfully!");
      navigate('/')
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-base pb-6 text-customColor4 transition-all ease-in-out delay-150">
      <h1 className="text-white text-3xl font-bold pb-5">Contact</h1>
      <p className="bg-customColor3 w-20 rounded h-1 mb-5 "></p>
      <section className="md:my-5">
        <h2 className="text-white text-2xl font-bold mb-5 pb-5">
          Contact Form
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row md:justify-between my-1 md:my-8 ">
            <input
              className="w-full mb-2 md:w-5/12 bg-customColor2 p-3 focus:outline-customColor3 outline-none border-0 text-white text-sm rounded-md"
              type="text"
              name="name"
              id="name"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              className="w-full mb-2 md:w-5/12 bg-customColor2 p-3 focus:outline-customColor3 outline-none border-0 text-white text-sm rounded-md"
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <textarea
            className="w-full min-h-52 my-2 md:my-4 bg-customColor2 p-3 focus:outline-customColor3 outline-none border-0 text-white text-sm rounded-md"
            name="message"
            id="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <div className="flex justify-end md:my-5">
            <button
              type="submit"
              className="rounded-md text-customColor3 border-slate-700 border-l border-t flex justify-around items-center p-3 
            transition-opacity duration-500 delay-150 hover:opacity-100 hover:bg-gradient-to-tl 
            from-black to-customBg hover:border-l-customColor3 hover:border-t-customColor3 w-44"
              disabled={loading}
            >
              <BsFillSendFill />{loading ? "Sending..." :" Send Message" }
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Contact;
