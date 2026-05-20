import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = ({ user }) => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to CampusConnect</h1>
          <p>Your Complete University Placement Management Solution</p>
          {!user && (
            <div className="hero-buttons">
              <Link to="/register?role=student" className="btn btn-primary">
                Register as Student
              </Link>
              <Link to="/register?role=company" className="btn btn-secondary">
                Register as Company
              </Link>
            </div>
          )}
          {user && (
            <div className="hero-buttons">
              {user.role === 'student' && (
                <Link to="/student-dashboard" className="btn btn-primary">
                  Go to Dashboard
                </Link>
              )}
              {user.role === 'company' && (
                <Link to="/company-dashboard" className="btn btn-primary">
                  Go to Dashboard
                </Link>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="features">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">👤</div>
            <h3>Student Profiles</h3>
            <p>Create and manage your professional profile with resume and skills</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💼</div>
            <h3>Job Postings</h3>
            <p>Companies can post job openings and manage applications</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Aptitude Tests</h3>
            <p>Take online aptitude tests to showcase your skills</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Interview Scheduling</h3>
            <p>Easy interview scheduling for students and companies</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Analytics</h3>
            <p>Track placements and view detailed statistics</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Results Dashboard</h3>
            <p>Comprehensive results and placement tracking</p>
          </div>
        </div>
      </section>

      <section className="stats">
        <h2>By The Numbers</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <h3>10+</h3>
            <p>Active Students</p>
          </div>
          <div className="stat-card">
            <h3>5+</h3>
            <p>Partner Companies</p>
          </div>
          <div className="stat-card">
            <h3>40%</h3>
            <p>Placement Rate</p>
          </div>
          <div className="stat-card">
            <h3>₹14 LPA</h3>
            <p>Avg. Package</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
