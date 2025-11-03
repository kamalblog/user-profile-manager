import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axiosConfig";
import "./Register.css";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    fullname: "",
    email: "",
    phone: "",
    country: "",
    password: "",
  });

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", formData);
      setMsg("Registration successful!");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setMsg("Something went wrong. Try again.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
       

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter username"
              required
            />
          </div>

          <div className="input-group">
            <label>Full Name</label>
            <input
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="input-group">
            <label>Country</label>
            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Enter your country"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {msg && <p className="message">{msg}</p>}

          <button type="submit" className="btn-register">
            Register
          </button>
        </form>

        <p className="login-text">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
