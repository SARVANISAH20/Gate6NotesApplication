import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post("http://localhost:5001/logout", {}, { withCredentials: true });
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img 
            src="/gate6.png" 
            alt="Logo" 
            width="70" 
            height="30" 
            className="d-inline-block align-text-top me-2"
          />
              Notes App
        </Link>
        <div>
          {isAuthenticated ? (
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link className="btn btn-light me-2" to="/login">Login</Link>
              <Link className="btn btn-primary" to="/signup">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
