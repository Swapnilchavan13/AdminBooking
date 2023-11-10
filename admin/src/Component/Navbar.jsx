import React from 'react'
import '../Styles/navbar.css'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <div className='navbar'>
      <Link to='/'>
      <h2>Admin</h2>
      </Link>
      <div>
        <Link to="/addtheatre">
          <h2>Add Theatre</h2>
        </Link>
        <Link to="/addmovie">
          <h2>Add Movie</h2>
        </Link>
        <Link to="/allocatemovie">
          <h2>Allocate Movie</h2>
        </Link>
      </div>
    </div>
  )
}
