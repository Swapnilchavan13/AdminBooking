import React from 'react'
import '../Styles/navbar.css'
import { Link } from 'react-router-dom'
import '../Styles/screen.css'

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
        {/* <Link to="/addscreen">
          <h2>Add Screen</h2>
        </Link> */}
        <Link to="/addmovie">
          <h2>Add Movie</h2>
        </Link>
        <Link to="/allocatemovie">
          <h2>Allocate Movie</h2>
        </Link>
      
        <Link to="/addevent">
          <h2>Add Event</h2>
        </Link>
      </div>
    </div>
  )
}
