import React, { useContext } from "react";
import "./profile.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Profile = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  const handleClick = async () => {
    try{
      const res = await axios.get(`/users/${user._id}/rooms`)
      console.log(res);
    }catch(err){
      
    }
  }
  return (
    <div class="profileContainer">
      <div className="profileWrapper">
        <div className="name">{user.username}</div>
        <div className="email">{user.email}</div>
        <div className="details">
            <button onClick={handleClick}>rooms</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
