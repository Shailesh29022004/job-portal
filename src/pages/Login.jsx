import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    
    if (
      email === "shailesh1@gmail.com" &&
      password === "admin123"
    ) {
      const admin = { name: "Shailesh", email, role: "admin" };
      localStorage.setItem("user", JSON.stringify(admin));
      setMessage(" Admin login successful!");
      setTimeout(() => navigate("/admin-dashboard"), 1000);
      return;
    }

    
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      setMessage(" Invalid email or password");
      return;
    }

    
    localStorage.setItem("user", JSON.stringify(user));
    setMessage(" Login successful!");

    setTimeout(() => {
      if (user.role === "admin") navigate("/admin-dashboard");
      else navigate("/user-dashboard");
    }, 1000);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
