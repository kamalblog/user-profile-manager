import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
    const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); 
  };
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">User Profile Manager</h1>
        <p className="home-subtitle">
          Manage users, profiles, and GitHub repositories with a simple and secure platform built using MERN Stack.
        </p>

        <div className="home-buttons">
          <Link to="/register" className="btn-primary">
            Get Started
          </Link>
          <Link to="/login" className="btn-outline">
            Login
          </Link>
          <Link to="/github" className="btn-outline">
            Github
          </Link>
          
          <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
        </div>
      </div>
    </div>
  );
}
