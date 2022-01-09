import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const login = () => {
    axios
      .post("http://localhost:8000/login", {
        email: email,
        password: password,
      })
      .then(function (response) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        // console.log(`Token ${token}`);
        // console.log(response, 'response');
        // console.log(localStorage, 'local')
        // console.log(response.data.token, 'response.data.token');
        if (token) {
          navigate("/users");
        } else {
          navigate("/register");
        }
      })
      .catch(function (error) {
        console.log(error);
        setMessage(`Something wrong happened: ${error.message}`);
      });
  };
  const backHome = () => {
    navigate("/");
  };
  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="container__form">
        <form
          onSubmit={(e) => {
            login();
            e.preventDefault();
          }}
        >
          <h1>Login</h1>
          <div className={message ? 'wrong' : 'correct'}>{message}</div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
          <br />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <br />
          <button type="submit" value="Login">
            Login
          </button>
        </form>
      </div>
      <button onClick={backHome}>Home</button>
      <button onClick={goToRegister}>Register here</button>
    </>
  );
}

export default Login;
