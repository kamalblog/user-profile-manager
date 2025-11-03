import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear token
    navigate("/login"); // redirect to login
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="logo">User Profile Manager</h2>
      </div>

      <div className="navbar-center">
        <NavLink
          to="/users"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Users
        </NavLink>
         <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Profile
        </NavLink>
      
        <NavLink
          to="/edit-profile"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Edit Profile
        </NavLink>

        <NavLink
          to="/github"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          GitHub
        </NavLink>
      </div>

      <div className="navbar-right">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
