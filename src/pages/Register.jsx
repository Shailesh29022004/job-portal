import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
  e.preventDefault();

  if (!name || !email || !password || !role) {
    setMessage(" All fields required");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users",)) || [];

  const userExists = users.find(u => u.email === email);
  if (userExists) {
    setMessage(" User with this email already exists");
    return;
  }

  if (role === "admin") {
    const adminExists = users.find(u => u.role === "admin");
    if (adminExists) {
      setMessage(" Admin already exists");
      return;
    }

    if (name !== "Shailesh" || email !== "shailesh1@gmail.com" || password !== "admin123") {
      setMessage("🚫 Access denied! Only admin can log in here.");
      return;
    }
    
  }

  const newUser = { name, email, password, role };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  
  localStorage.setItem(
    "user",
    JSON.stringify({ name, email, role })
  );

  setMessage("Registered successfully!");
  setTimeout(() => {
    if (role === "admin") navigate("/admin-dashboard");
    else navigate("/user-dashboard");
  }, 1000);
};


  return (
    <div className="register-container">
      <h2>Register</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <select value={role} onChange={e => setRole(e.target.value)} required>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;



