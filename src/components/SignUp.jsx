import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postSignup from "../api/post-signup.js";
import {useAuth} from "../hooks/use-auth.js";

function SignUp() {
  const navigate = useNavigate();
  const {auth, setAuth} = useAuth(); 
  const [credentials, setCredentials] = useState({
      "signup-username": "",
      "signup-password": "",
      "signup-email": "",
  });

  const handleChange = (event) => {
      const { id, value } = event.target;
      console.log(event)
      setCredentials((prevCredentials) => ({
          ...prevCredentials,
          [id]: value,
      }));
  };
  
  const handleSubmit = (event) => {
      event.preventDefault();
      if (credentials["signup-username"] && credentials["signup-password"] && credentials["signup-email"]) {
          postSignup(
              credentials["signup-username"],
              credentials["signup-password"],
              credentials["signup-email"]
          ).then((response) => {
              window.localStorage.setItem("token", response.token);
              setAuth({
                token: response.token,
              });  
              navigate("/");
          });
      }
  };
  return (
    <form>
      <div>
        <label htmlFor="username">Username:</label>
        <input
                  type="text"
                  id="signup-username"
                  placeholder="Enter username"
                  onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
                  type="password"
                  id="signup-password"
                  placeholder="Password"
                  onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
                  type="email"
                  id="signup-email"
                  placeholder="Enter email"
                  onChange={handleChange}
        />
      </div>
      <button type="submit" onClick={handleSubmit}>
              Sign Up
      </button>
    </form>
  );
}

export default SignUp;