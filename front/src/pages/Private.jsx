import React from "react";
import { Outlet } from "react-router-dom";
import Login from "./Login";

function Private({ email, password }) {

  const token = localStorage.getItem("token", localStorage.token);
  console.log("local sto in private", token);
  console.log(localStorage);

  return token ? (
    <Outlet />
  ) : (
    <>
      <div> You have to login first </div>
      <Login />
    </>
  );
}

export default Private;
