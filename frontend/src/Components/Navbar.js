import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <div>
      <header className="text-gray-600 body-font">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      
      <span className="ml-3 text-xl">Sale Tracker</span>
    </a>
    <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
      <NavLink className="mr-5 hover:text-gray-900 border-2 p-2 rounded-md hover:shadow-lg" to="/">Transaction Dashboard</NavLink>
      <NavLink className="mr-5 hover:text-gray-900 border-2 p-2 rounded-md hover:shadow-lg" to="/stats">Statistic </NavLink>
      <NavLink className="mr-5 hover:text-gray-900 border-2 p-2 rounded-md hover:shadow-lg" to="/charts">Bar chart</NavLink>
    </nav>
   
  </div>
</header>
    </div>
  )
}

export default Navbar

