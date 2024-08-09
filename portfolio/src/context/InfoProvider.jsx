import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import InfoContext from './InfoContext';
import { useNavigate } from 'react-router-dom';

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

const InfoProvider = ({ children }) => {
  // State variables to hold fetched data and manage loading/error states
  const [User, setUser] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [allCertificates, setAllCertificates] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [allMessage, setAllMessage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Hook to navigate programmatically
  const navigate = useNavigate();

  // useEffect to fetch and verify user data from localStorage
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
          navigate('admin-login/auth'); // Redirect to login
        } else {
          // Token is valid, set user
          setUser(result);
        }
      } else {
        navigate('admin-login/auth'); // Redirect to login if no user data found
      }
    };

    fetchUser();
  }, [navigate]); // Dependency on navigate to avoid missing updates

  // useEffect to fetch all data once user data is available
  useEffect(() => {
    const fetchAllData = async () => {
      await Promise.all([
        fetchData(`${BASE_URL}/project/getAllProject`, setAllProjects, setError),
        fetchData(`${BASE_URL}/certificate/getAllCertificate`, setAllCertificates, setError),
        fetchData(`${BASE_URL}/contact/getAllMessages`, setAllMessage, setError),
        fetchData(`${BASE_URL}/course/getAllCourse`, setAllCourses, setError)
      ]);
      setLoading(false); // Set loading to false once all data is fetched
    };

    if (User) {
      fetchAllData(); // Fetch data only if user is available
    }
  }, [User]); // Dependency on User to refetch data when User state changes

  // Display a loading message while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display an error message if there was an issue fetching the data
  if (error) {
    return <div>Error fetching data. Please try again later.</div>;
  }

  // Provide the fetched data and state to the context provider
  return (
    <InfoContext.Provider value={{ setUser, User, allProjects, allCertificates, allCourses, BASE_URL, allMessage }}>
      {children}
    </InfoContext.Provider>
  );
};

export default InfoProvider;
