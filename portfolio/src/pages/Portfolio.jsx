import React from 'react'
import Sidebar from '../components/User/sidebar/Sidebar'
import Mainbar from './Mainbar'

const Portfolio = () => {
  return (
    <div className='flex flex-col md:flex-row m-auto mt-11 text-white gap-6 justify-center items-stretch main-component max-w-screen-xl'>
      <Sidebar />
      <Mainbar />
    </div>
  )
}

export default Portfolio
