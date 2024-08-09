import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import InfoContext from './InfoContext';
import { useNavigate } from 'react-router-dom';

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

const InfoProvider = ({ children }) => {

  const [User, setUser] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [allCertificates, setAllCertificates] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [allMessage, setAllMessage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = () => {
      const result = JSON.parse(localStorage.getItem("Profile"));
      if (result) {
        const { token } = result;

        // Decode token to get its expiry time
        const decodedToken = JSON.parse(atob(token.split(".")[1]));

        // Check if token is expired
        if (decodedToken.exp * 1000 < new Date().getTime()) {
          // Token is expired, remove it from local storage and set user to null
          localStorage.removeItem("Profile");
          setUser(null);
          navigate('admin-login/auth')

        } else {
          // Token is valid, set user
          setUser(result);
        }
      }
      else{
        navigate('admin-login/auth')
      }
    };

    fetchUser();
  }, [BASE_URL]);

  useEffect(() => {
    const fetchAllData = async () => {
      await Promise.all([
        fetchData(`${BASE_URL}/project/getAllProject`, setAllProjects, setError),
        fetchData(`${BASE_URL}/certificate/getAllCertificate`, setAllCertificates, setError),
        fetchData(`${BASE_URL}/contact/getAllMessages`, setAllMessage, setError),
        fetchData(`${BASE_URL}/course/getAllCourse`, setAllCourses, setError)
      ]);
      setLoading(false);
    };

    fetchAllData();
  }, [User]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data. Please try again later.</div>;
  }

  return (
    <InfoContext.Provider value={{setUser, User, allProjects, allCertificates, allCourses, BASE_URL, allMessage }}>
      {children}
    </InfoContext.Provider>
  );
};

export default InfoProvider;
