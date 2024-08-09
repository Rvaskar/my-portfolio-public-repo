import React from 'react'
import AdminNavbar from './AdminNavbar'
import { Outlet } from 'react-router-dom'

const ProjectAction = () => {
  return (
    <div className='text-white'>
        <AdminNavbar/>
 
      <main className='mt-4'>
      <Outlet/>
      </main>
    </div>
  )
}

export default ProjectAction
