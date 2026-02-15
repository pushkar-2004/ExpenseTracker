import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">MyApp</div>
      <ul className="nav-links">
        <li>
            <Link to='/'>Purchase Items</Link>
        </li>
        <li>
            <Link to='/expenseTracker'>Expense Tracker</Link>
        </li>
        <li>
            <Link to='/listItem'>List Items</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar