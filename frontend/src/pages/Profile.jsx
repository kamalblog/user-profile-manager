import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import "./Profile.css";
import Navbar from "../components/Navbar";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile/profile");
        setProfile(res.data.profile);
      } catch (err) {
        setMsg("Failed to load profile. Please try again.");
      }
    };
    fetchProfile();
  }, []);

  if (!profile)
    return (
      <div className="profile-loading">
        <div className="loader"></div>
        <p>Loading your profile...</p>
      </div>
    );

  return (
    <>
     <Navbar />
   
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar-circle">
            {profile.fullname ? profile.fullname[0].toUpperCase() : "U"}
          </div>
          <h2>{profile.fullname}</h2>
          <p className="profile-email">{profile.email}</p>
        </div>

        <div className="profile-details">
          <div className="detail-item">
            <span className="label">Username:</span>
            <span className="value">{profile.name}</span>
          </div>
          <div className="detail-item">
            <span className="label">Phone:</span>
            <span className="value">{profile.phone}</span>
          </div>
          <div className="detail-item">
            <span className="label">Country:</span>
            <span className="value">{profile.country}</span>
          </div>
        </div>

        {msg && <p className="profile-msg">{msg}</p>}

        <button className="edit-btn" onClick={() => (window.location.href = "/edit-profile")}>
          ✏️ Edit Profile
        </button>
      </div>
    </div>
     </>
  );
}
