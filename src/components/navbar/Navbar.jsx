import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

const navbar = () => {
  return (
    <div className='navbar'>
        <div className="nav-container">
          <Link to="/" style={{color: "inherit", textDecoration:null}}>
          <div className="logo">Booking.com</div>
          </Link>
          <div className="nav-buttons">
            <button className='reg-button'>Register</button>
            <button className='login-button'>Login</button>
          </div>
        </div>
    </div>
  )
}

export default navbar