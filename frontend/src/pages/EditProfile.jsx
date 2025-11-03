import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import "./EditProfile.css";
import Navbar from "../components/Navbar";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    name: "",
    fullname: "",
    email: "",
    phone: "",
    country: "",
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile/profile");
        setFormData(res.data.profile);
      } catch (err) {
        setMsg("Failed to load profile details.");
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put("/profile/profile", formData);
      setMsg(" Profile updated successfully!");
      setTimeout(() => navigate("/profile"), 1000);
    } catch (err) {
      setMsg(" Error updating profile.");
    }
  };

  return (
    <>
         <Navbar />
    <div className="edit-container">
      <div className="edit-box">
        

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
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
              placeholder="Enter email"
              required
            />
          </div>

          <div className="input-group">
            <label>Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="input-group">
            <label>Country</label>
            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Enter country"
              required
            />
          </div>

          {msg && <p className="message">{msg}</p>}

          <button type="submit" className="btn-save">Save Changes</button>
        </form>

        <button className="btn-cancel" onClick={() => navigate("/profile")}>
          ← Back to Profile
        </button>
      </div>
    </div>
    </>
  );
}
