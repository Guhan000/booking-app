import React, { useContext, useState } from "react";
import "./register.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Register = () => {
  const [credentials, setCredientials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });
  const { user, loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredientials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const { username, email, password } = credentials;
    if (username && email && password) {
      await axios.post("/auth/register", credentials);
      toast.success("User registered successfully!");
      navigate("/login");
    } else {
      toast.error("Invalid Input");
    }
  };

  return (
    <div className="Register">
      <div className="lContainer">
        <h1>Booking.com</h1>
        <input
          type="text"
          className="lInput"
          placeholder="Username"
          id="username"
          onChange={handleChange}
        ></input>
        <input
          type="email"
          className="lInput"
          placeholder="Email"
          id="email"
          onChange={handleChange}
        ></input>
        <input
          type="password"
          className="lInput"
          placeholder="password"
          id="password"
          onChange={handleChange}
        ></input>
        <button disabled={loading} onClick={handleClick} className="lButton">
          Register
        </button>
        <p style={{marginTop:"10px"}}>Already Registered? <Link to="/login" style={{textDecoration:"none", color:"#003580"}}>Login</Link> Here!</p>
        {error && <span>{error.message}</span>}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
