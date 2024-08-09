import React, { useEffect, useState } from "react";
import PortfolioContext from "./PortfolioContext";
import Axios from "axios";

// Base URL for the API endpoints
const BASE_URL = "http://localhost:5000";

// Function to fetch data from a given URL and update state
const fetchData = async (url, setData, setError) => {
  try {
    // Make GET request to the provided URL
    const response = await Axios.get(url);
    // Update the state with the fetched data
    setData(response.data);
  } catch (error) {
    // Log error and set error state if the request fails
    console.error(`Error fetching data from ${url}:`, error);
    setError(true);
  }
};

const PortfolioContextProvider = ({ children }) => {
  // State variables to hold fetched data and error status
  const [allProjects, setAllProjects] = useState([]);
  const [allCertificates, setAllCertificates] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Function to fetch all data in parallel
    const fetchAllData = async () => {
      await Promise.all([
        // Fetch all projects
        fetchData(`${BASE_URL}/project/getAllProject`, setAllProjects, setError),
        // Fetch all certificates
        fetchData(`${BASE_URL}/certificate/getAllCertificate`, setAllCertificates, setError),
        // Fetch all courses
        fetchData(`${BASE_URL}/course/getAllCourse`, setAllCourses, setError)
      ]);
    };

    // Call the function to fetch all data when the component mounts
    fetchAllData();
  }, []); // Empty dependency array means this runs once when the component mounts

  // Display an error message if there was an issue fetching the data
  if (error) {
    return <div>Error fetching data. Please try again later.</div>;
  }

  // Log the fetched data for debugging purposes
  console.log(allProjects, allCertificates, allCourses);

  // Provide the fetched data and base URL to the context provider
  return (
    <PortfolioContext.Provider value={{ allProjects, allCertificates, allCourses, BASE_URL }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export default PortfolioContextProvider;
