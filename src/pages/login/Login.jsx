import React, { useContext, useState } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredientials] = useState({
    username: undefined,
    password: undefined,
  });
  const { user, loading, error, dispatch} = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredientials((prev) => (
      {...prev, [e.target.id]: e.target.value}
    ))
  }
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({type:"LOGIN_START"});
    try{
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res?.data });
      navigate("/");
    }catch(err){
      dispatch({type:"LOGIN_FAILURE", payload:err.response?.data})
    }
  };
  // console.log(user);
  return <div className="login">
    
    <div className="lContainer">
    <h1>Booking.com</h1>
    <input type="text" className="lInput" placeholder="username" id="username" onChange={handleChange}></input>
    <input type="password" className="lInput" placeholder="password" id="password" onChange={handleChange}></input>
    <button disabled={loading} onClick={handleClick} className="lButton">Login</button>
    {error && <span>{error.message}</span>}
    </div>
  </div>;
};

export default Login;
