import React from 'react';
import Navbar from '../components/User/navbar/Navbar';
import { Outlet } from 'react-router-dom';

const Mainbar = () => {
  return (
    <main className='w-full h-screen overflow-x-hidden overflow-y-auto md:pr-2 scrollbar-hide sm:w-4/5 md:w-3/4 md:max-h-dvh'>
      <section className='m-2 border-slate-600 bg-customColor border flex flex-col transition-opacity ease-in-out delay-150 align-center p-4 sm:p-6 md:p-8 box-border rounded-2xl w-full sm:ml-8 md:ml-24 relative'>
        <Navbar />
        <Outlet />
      </section>
    </main>
  );
}

export default Mainbar;
