import React from 'react';
import './navbar.css'

const navbar = () => {
  return (
    <div className='navbar'>
        <div className="nav-container">
          <div className="logo">Booking.com</div>
          <div className="nav-buttons">
            <button className='reg-button'>Register</button>
            <button className='login-button'>Login</button>
          </div>
        </div>
    </div>
  )
}

export default navbar