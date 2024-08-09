import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InfoContext from '../../../context/InfoContext';

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { BASE_URL, setUser } = useContext(InfoContext);
  const navigate = useNavigate();

  // const handleSwitch = () => {
  //   setIsSignup(!isSignup);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }

    const user = { email, password };

    if (isSignup) {
      if (!name) {
        alert('Please enter name to continue');
        return;
      }
      user.name = name;

      axios.post(`${BASE_URL}/admin/createAdmin`, user)
        .then((response) => {
          const { result, token } = response.data;
          localStorage.setItem('Profile', JSON.stringify({ result, token }));
          setUser(result);
          navigate('/admin/'); // redirect to home or dashboard
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });

    } else {
      axios.post(`${BASE_URL}/admin/signin`, user)
        .then((response) => {
          const { result, token } = response.data;
          localStorage.setItem('Profile', JSON.stringify({ result, token }));
          setUser(result);
          navigate('/admin/'); // redirect to home or dashboard
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  };

  return (
    <section className="min-h-screen flex justify-center items-center bg-customColor text-white">
      <div className="min-w-[20%] flex flex-col justify-center items-center">
        <form 
          onSubmit={handleSubmit}
          className="w-full p-5 bg-transparent rounded-lg flex flex-col justify-between shadow-lg shadow-slate-500"
        >
          {isSignup && (
            <label htmlFor="name" className="mb-4">
              <h4 className="mb-1 mt-2">Display Name</h4>
              <input
                type="text"
                id="name"
                name="name"
                onChange={(e) => setName(e.target.value)}
                className="p-2 w-full border border-gray-300 text-black text-sm"
              />
            </label>
          )}
          <label htmlFor="email" className="mb-4">
            <h4 className="mb-1 mt-2">Email</h4>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 w-full border border-gray-300 text-black text-sm"
            />
          </label>
          <label htmlFor="password" className="mb-4">
            <div className="flex justify-between">
              <h4 className="mb-1 mt-2">Password</h4>
              {!isSignup && <h4 className="text-blue-600 text-sm">Forgot password?</h4>}
            </div>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 w-full border border-gray-300 text-black text-sm"
            />
          </label>
          <button 
            type="submit" 
            className="mt-3 p-2 bg-blue-500 border border-blue-500 text-white rounded-lg cursor-pointer transition duration-200 text-sm font-medium hover:bg-blue-600"
          >
            {isSignup ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        {/* <p className="mt-4">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
          <button 
            type="button" 
            className="bg-transparent text-blue-600 border-none text-sm cursor-pointer ml-1"
            onClick={handleSwitch}
          >
            {isSignup ? "Log in" : "Sign up"}
          </button>
        </p> */}
      </div>
    </section>
  );
};

export default Auth;
