import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logos.png";


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(query)}&category=${category}`);
    setMenuOpen(false); 
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
    
      <div className="brand">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>


      <form className="search-box desktop-search" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search jobs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
        </select>
        <button type="submit">Search</button>
      </form>

     
      <button
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        ☰ 
      </button>

     
      <div className={`bar ${menuOpen ? "active" : ""}`}>
       
        <form className="search-box mobile-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search jobs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="All">All</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
          </select>
          <button type="submit">Search</button>
        </form>

        <Link to="/">Home</Link>

        {user && role === "admin" && <Link to="/admin-dashboard">Admin Dashboard</Link>}

        {user && role === "user" && <Link to="/dashboard">Dashboard</Link>}

        {!user && (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}

        {user && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}


