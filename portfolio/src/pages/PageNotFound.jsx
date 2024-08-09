import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-6">Page Not Found</p>
        <Link to={"/"} className="inline-block px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg">
          Go Back Home
        </Link>
      </div>
    </div>
  )
}

export default PageNotFound
