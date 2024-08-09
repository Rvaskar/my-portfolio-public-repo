import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className='md:absolute md:top-0 z-10 rounded-r-2xl rounded-b md:w-2/4 h-16 mb-2 flex items-center border border-slate-700 px-5 md:right-0 bg-navbarBg'>
      <ul className= 'navbar-ul text-base flex px-2  md:px-5 md:gap-7'>
        <li ><NavLink to={'/'}>About</NavLink>  </li>
        <li><NavLink to={'/resume'}>Resume</NavLink>  </li>
        <li><NavLink to={'/projects'}>Projects</NavLink>  </li>
        <li><NavLink to={'/contact'}>Contact</NavLink>  </li>
        
      </ul>
    </nav>
  )
}

export default Navbar
