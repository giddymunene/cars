// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ManageCars from "../components/ManageCars";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [adminEmail, setAdminEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin-login");
    } else {
      setAdminEmail("Admin"); // optionally fetch from backend
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <div className="admin-dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, {adminEmail}</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>

      <main className="dashboard-content">
        <ManageCars />
      </main>
    </div>
  );
};

export default AdminDashboard;
