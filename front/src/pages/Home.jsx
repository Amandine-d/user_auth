import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const register = () => {
    navigate("/register");
  };
  const login = () => {
    navigate("/login");
  };
  return (
    <>
      <button onClick={register}>Sign up </button>
      <button onClick={login}>Login </button>
    </>
  );
}
