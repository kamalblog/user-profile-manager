import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Navbar from "../components/Navbar"; 
import "./AllUsers.css";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/auth/getAllUsers");
        setUsers(res.data.users || []);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.fullname.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar /> {/* ✅ optional navbar on top */}

      <div className="users-container">
        <div className="users-box">
          <h2 className="users-title">👥 All Registered Users</h2>

          <div className="search-bar">
            <input
              type="text"
              placeholder="🔍 Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {filteredUsers.length === 0 ? (
            <p className="no-users">No users found.</p>
          ) : (
            <div className="users-grid">
              {filteredUsers.map((user) => (
                <div className="user-card" key={user.id}>
                  <div className="user-avatar">
                    {user.fullname ? user.fullname[0].toUpperCase() : "U"}
                  </div>

                  <div className="user-info">
                    <h3>{user.fullname}</h3>
                    <p>{user.email}</p>
                    <span>{user.country}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
