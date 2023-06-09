import React, { useContext } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="nav-container">
        <Link to="/" style={{ color: "inherit", textDecoration: null }}>
          <div className="logo">Booking.com</div>
        </Link>
        {user ? (
          <div>
            <p className="lUser">{user.username}</p>
          </div>
        ) : (
          <div className="nav-buttons">
            <button className="reg-button">Register</button>
            <button className="login-button">Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
