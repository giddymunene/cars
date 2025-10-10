// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [showWeekly, setShowWeekly] = useState(true);

  // ✅ Protect route
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin-login"); // redirect if not logged in
    }
  }, [navigate]);

  // Example data
  useEffect(() => {
    setWeeklyData([
      { day: "Mon", bookings: 8 },
      { day: "Tue", bookings: 12 },
      { day: "Wed", bookings: 7 },
      { day: "Thu", bookings: 15 },
      { day: "Fri", bookings: 9 },
      { day: "Sat", bookings: 20 },
      { day: "Sun", bookings: 10 },
    ]);

    setMonthlyData([
      { week: "Week 1", bookings: 45 },
      { week: "Week 2", bookings: 52 },
      { week: "Week 3", bookings: 40 },
      { week: "Week 4", bookings: 63 },
    ]);
  }, []);

  const handleToggle = () => setShowWeekly(!showWeekly);

  // ✅ Logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/"); // redirect to homepage or login
  };

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li onClick={() => navigate("/admin-dashboard")}>Dashboard</li>
          <li onClick={() => navigate("/admin/manage-cars")}>Manage Cars</li>
          <li onClick={() => navigate("/admin/messages")}>Messages</li>
          <li onClick={() => navigate("/admin/car-bookings")}>Car Bookings</li>
        </ul>

        {/* ✅ Logout button */}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="dashboard-content">
        <h1>Admin Dashboard</h1>

        <div className="chart-section">
          <div className="chart-header">
            <h3>{showWeekly ? "Weekly Bookings" : "Monthly Bookings"}</h3>
            <button onClick={handleToggle} className="toggle-btn">
              {showWeekly ? "View Monthly" : "View Weekly"}
            </button>
          </div>

          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={showWeekly ? weeklyData : monthlyData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={showWeekly ? "day" : "week"} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="bookings" fill="#007bff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
