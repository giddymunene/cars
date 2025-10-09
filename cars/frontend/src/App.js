// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Cars from "./Components/Cars";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Register from "./Components/Register";
import Login from "./Components/Login";
import AdminDashboard from "./Components/AdminDashboard";
import Footer from "./Components/Footer";
import Booking from "./Components/Booking";
import ImageUploader from "./Components/ImageUploader";
import "./App.css";

// 🔹 This component checks the current route and redirects if needed
function RedirectHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");

    // If app reloads on /admin without a token → redirect to /
    if (location.pathname === "/admin" && !adminToken) {
      navigate("/");
    }
  }, [location, navigate]);

  return null;
}

function App() {
  return (
    <Router>
      {/* Runs on every route change */}
      <RedirectHandler />

      {/* Navbar always visible */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/imageuploader" element={<ImageUploader />} />

        {/* 404 fallback */}
        <Route
          path="*"
          element={<h2 className="text-center mt-5">404 - Page Not Found</h2>}
        />
      </Routes>

      {/* Footer always visible */}
      <Footer />
    </Router>
  );
}

export default App;