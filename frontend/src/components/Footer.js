import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>CampusConnect</h3>
          <p>A comprehensive platform for university placement management.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: info@campusconnect.com</p>
          <p>Phone: +91-9876543210</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 CampusConnect. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
