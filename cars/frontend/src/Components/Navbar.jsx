import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/cars?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <nav className="custom-navbar">
      <div className="container d-flex align-items-center justify-content-between">
        {/* Logo */}
        <Link to="/" className="brand">
          BMD RENTALS
        </Link>

        {/* Desktop Links */}
        <ul className="nav-links d-none d-md-flex">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/cars">Cars</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/admindashboard">Dashboard</Link></li>
          <li><Link to="/imageuploader">IMAGE</Link></li>
   

        </ul>

        {/* Search Bar (desktop only) */}
        <form className="search-bar d-none d-md-flex" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search cars..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">🔍</button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
