import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/login", 
        { username, password }, 
        { withCredentials: true }  
      );
  
      if (response && response.data) {
        setIsAuthenticated(true);
        navigate("/");
      } else {
        setMessage("Unexpected error occurred. Please try again.");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Server error. Try again.");
    }
  };
  

  return (
    <div className="container mt-4">
      <h2>Login</h2>
      {message && <div className="alert alert-danger">{message}</div>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
