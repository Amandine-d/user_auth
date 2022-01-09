import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(false);

  const registerUser = () => {
    axios
      .post("http://localhost:8000/register", {
        email: email,
        password: password,
      })
      .then(function (response) {
        console.log(response.status);
        setUser(true)
        setMessage("User registered successfully");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        navigate("/login");
      })
      .catch(function (error) {
        console.log(error);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setMessage(`Please enter a correct email address and password`);
      });
  };

  const checkForm = () => {
    if (password != confirmPassword) {
      setMessage("Password fields are not a match");
    } else if (
      validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
      })
    ) {
      setMessage("Strong Password");
    } else {
      setMessage("You need a stronger password");
    }
  };
  const backHome = () => {
    navigate("/");
  };
  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="container__form">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            checkForm();
            registerUser();
          }}
        >
          <h1>Register</h1>
          <div className={user ? 'correct' : 'wrong'}>{message}</div>
          <br />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email address"
          />
          <br />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
          <br />
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm Password"
          />
          <br />
          <button type="submit" value="Register">
            Register
          </button>
        </form>
      </div>
      <button onClick={backHome}>Home</button>
      <button onClick={goToLogin}>Login </button>
    </>
  );
}

export default Register;
