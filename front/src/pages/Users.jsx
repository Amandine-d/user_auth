import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Users.css";
import img from "../email.png";

function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/users").then((res) => setUsers(res.data));
  }, []);
  const navigate = useNavigate();

  const logOut = () => {
    console.log(localStorage, "local");
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <h1>Users</h1>
      <div className="container">
        {users.map((user, index) => (
          <div className="users" key={index}>
            <img src={img} alt="mail with @" className="email" />
            <h3>{user.email}</h3>
            <br />
          </div>
        ))}
      </div>
      <button onClick={logOut}>Disconnect</button>
    </>
  );
}

export default Users;
