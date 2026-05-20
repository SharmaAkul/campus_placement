import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🎓 CampusConnect
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          {user && user.role === 'student' && (
            <>
              <li className="nav-item">
                <Link to="/student-dashboard" className="nav-link">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/jobs" className="nav-link">
                  Jobs
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/aptitude-test" className="nav-link">
                  Aptitude
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/my-interviews" className="nav-link">
                  Interviews
                </Link>
              </li>
            </>
          )}
          {user && user.role === 'company' && (
            <>
              <li className="nav-item">
                <Link to="/company-dashboard" className="nav-link">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/create-job" className="nav-link">
                  Post Job
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/schedule-interview" className="nav-link">
                  Schedule Interview
                </Link>
              </li>
            </>
          )}
          <li className="nav-item">
            <Link to="/results-dashboard" className="nav-link">
              Results
            </Link>
          </li>
          {user ? (
            <>
              <li className="nav-item user-info">
                <span>{user.name}</span>
              </li>
              <li className="nav-item">
                <button onClick={onLogout} className="btn-logout">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
