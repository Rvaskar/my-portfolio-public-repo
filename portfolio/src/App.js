import React from 'react'
import Sidebar from './components/User/sidebar/Sidebar'

import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Routes from './Routes'

const App = () => {
  return (
    <BrowserRouter>
      <Routes/>
    </BrowserRouter>
   
  )
}

export default App
