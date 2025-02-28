import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/signup", {
        username,
        password,
      });
      setMessage(response.data.message);
      navigate("/login");
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Signup</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSignup}>
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
        <button className="btn btn-primary">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
