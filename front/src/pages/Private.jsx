import React from "react";
import { Outlet } from "react-router-dom";
import Login from "./Login";

function Private({ email, password }) {

  const token = localStorage.getItem("token", localStorage.token);

  return token ? (
    <Outlet />
  ) : (
    <>
      <h2> You have to login first </h2>
      <Login />
    </>
  );
}

export default Private;
