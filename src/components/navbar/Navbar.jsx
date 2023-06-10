import React, { useContext } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("l");
    dispatch({ type: "LOGIN_START" });
    try {
      // const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGOUT" });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response?.data });
    }
  };

  return (
    <div className="navbar">
      <div className="nav-container">
        <Link to="/" style={{ color: "inherit", textDecoration: null }}>
          <div className="logo">Booking.com</div>
        </Link>
        {user ? (
          <>
            <div style={{ display: "flex", gap: "5px" }}>
              <p className="lUser">{user.username}</p>

              <p className="lUser" onClick={handleClick}>
                Logout
              </p>
            </div>
          </>
        ) : (
          <div className="nav-buttons">
            <Link to="/register">
              <button className="reg-button">Register</button>
            </Link>

            <Link to="/login">
              <button className="login-button">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
