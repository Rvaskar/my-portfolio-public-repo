import React, { useEffect, useState } from "react";
import PortfolioContext from "./PortfolioContext";
import Axios from "axios";

const BASE_URL = "http://localhost:5000";

const fetchData = async (url, setData, setError) => {
  try {
    const response = await Axios.get(url);
    setData(response.data);
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    setError(true);
  }
};

const PortfolioContextProvider = ({ children }) => {
  
  const [allProjects, setAllProjects] = useState([]);
  const [allCertificates, setAllCertificates] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      await Promise.all([
        fetchData(`${BASE_URL}/project/getAllProject`, setAllProjects, setError),
        fetchData(`${BASE_URL}/certificate/getAllCertificate`, setAllCertificates, setError),
        fetchData(`${BASE_URL}/course/getAllCourse`, setAllCourses, setError)
      ]);

    };

    fetchAllData();
  }, []);

  
  if (error) {
    return <div>Error fetching data. Please try again later.</div>;
  }

  console.log(allProjects, allCertificates, allCourses);

  return (
    <PortfolioContext.Provider value={{ allProjects, allCertificates, allCourses, BASE_URL }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export default PortfolioContextProvider;
