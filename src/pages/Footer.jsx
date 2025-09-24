import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Footer({ companyName = " Job-Finder" }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
   const navigate = useNavigate();

 
  useEffect(() => {
    const savedEmail = localStorage.getItem("subscriberEmail");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setMessage("Please enter a valid email.");
    } else {
      
      localStorage.setItem("subscriberEmail", email);

      setMessage("Thanks for subscribing!");
      setEmail(""); 
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="grid">
          <div className="column">
            <h2>{companyName}</h2>
            <p>Connecting talent with opportunity.</p>
          </div>

          <div className="links">
            <div>
              <h3>Quick Links</h3>
              <ul>
                <li  onClick={() => {  navigate("/");
                     window.scrollTo({ top: 0, behavior: "smooth" });}}>Home</li>
                <li>Browse Jobs</li>
                <li>Post a Job</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>

          <div className="newsletter">
            <h3>Stay Updated</h3>
            <form onSubmit={handleSubmit} className="newsletter-form">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">Subscribe</button>
            </form>

            
            {message && (
              <p className={message.includes("Thanks") ? "success" : "error"}>
                {message}
              </p>
            )}
          </div>

         
          <div className="social">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="bottom">
          <p>
            © {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

