import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { studentService } from '../services/api';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/LoadingSpinner';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    phone: '',
    department: '',
    graduationYear: '',
    cgpa: '',
    skills: '',
    resumeLink: '',
    enrollmentNumber: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await studentService.getProfile();
      setProfile(response.data.student);
      setFormData({
        phone: response.data.student.phone || '',
        department: response.data.student.department || '',
        graduationYear: response.data.student.graduationYear || '',
        cgpa: response.data.student.cgpa || '',
        skills: response.data.student.skills?.join(', ') || '',
        resumeLink: response.data.student.resumeLink || '',
        enrollmentNumber: response.data.student.enrollmentNumber || '',
      });
    } catch (error) {
      toast.error('Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        skills: formData.skills.split(',').map((s) => s.trim()),
        graduationYear: parseInt(formData.graduationYear),
        cgpa: parseFloat(formData.cgpa),
      };
      await studentService.updateProfile(data);
      setProfile(data);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
      fetchProfile();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Student Dashboard</h1>
        <p>Welcome, {user?.name}</p>
      </div>

      <div className="dashboard-content">
        <div className="profile-section">
          <div className="section-header">
            <h2>Your Profile</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`btn-edit ${isEditing ? 'btn-cancel' : ''}`}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {!isEditing ? (
            <div className="profile-view">
              <div className="profile-item">
                <label>Name:</label>
                <span>{user?.name}</span>
              </div>
              <div className="profile-item">
                <label>Email:</label>
                <span>{user?.email}</span>
              </div>
              <div className="profile-item">
                <label>Enrollment Number:</label>
                <span>{profile?.enrollmentNumber || 'Not set'}</span>
              </div>
              <div className="profile-item">
                <label>Phone:</label>
                <span>{profile?.phone || 'Not set'}</span>
              </div>
              <div className="profile-item">
                <label>Department:</label>
                <span>{profile?.department || 'Not set'}</span>
              </div>
              <div className="profile-item">
                <label>Graduation Year:</label>
                <span>{profile?.graduationYear || 'Not set'}</span>
              </div>
              <div className="profile-item">
                <label>CGPA:</label>
                <span>{profile?.cgpa?.toFixed(2) || 'Not set'}</span>
              </div>
              <div className="profile-item">
                <label>Skills:</label>
                <div className="skills-list">
                  {profile?.skills?.length > 0
                    ? profile.skills.map((skill, idx) => (
                        <span key={idx} className="skill-badge">
                          {skill}
                        </span>
                      ))
                    : 'Not set'}
                </div>
              </div>
              <div className="profile-item">
                <label>Resume Link:</label>
                <span>
                  {profile?.resumeLink ? (
                    <a href={profile.resumeLink} target="_blank" rel="noopener noreferrer">
                      View Resume
                    </a>
                  ) : (
                    'Not uploaded'
                  )}
                </span>
              </div>
              <div className="profile-item">
                <label>Placement Status:</label>
                <span className={`status-badge ${profile?.placementStatus}`}>
                  {profile?.placementStatus?.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <div className="profile-item">
                <label>Profile Completion:</label>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${profile?.profileCompletion || 0}%` }}
                  ></div>
                </div>
                <span>{profile?.profileCompletion || 0}%</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="enrollmentNumber">Enrollment Number</label>
                  <input
                    type="text"
                    id="enrollmentNumber"
                    name="enrollmentNumber"
                    value={formData.enrollmentNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="department">Department</label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                  >
                    <option value="">Select Department</option>
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                    <option value="ECE">ECE</option>
                    <option value="ME">ME</option>
                    <option value="CE">CE</option>
                    <option value="EE">EE</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="graduationYear">Graduation Year</label>
                  <input
                    type="number"
                    id="graduationYear"
                    name="graduationYear"
                    value={formData.graduationYear}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="cgpa">CGPA</label>
                  <input
                    type="number"
                    id="cgpa"
                    name="cgpa"
                    step="0.1"
                    min="0"
                    max="10"
                    value={formData.cgpa}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="skills">Skills (comma-separated)</label>
                  <input
                    type="text"
                    id="skills"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="e.g., JavaScript, React, Node.js"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="resumeLink">Resume Link</label>
                <input
                  type="url"
                  id="resumeLink"
                  name="resumeLink"
                  value={formData.resumeLink}
                  onChange={handleChange}
                  placeholder="https://example.com/resume.pdf"
                />
              </div>

              <button type="submit" className="btn-submit">
                Save Changes
              </button>
            </form>
          )}
        </div>

        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h3>Placement Status</h3>
              <p className={`status ${profile?.placementStatus}`}>
                {profile?.placementStatus?.replace('_', ' ').toUpperCase()}
              </p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💼</div>
            <div className="stat-info">
              <h3>Package</h3>
              <p>{profile?.package ? `₹${profile.package} LPA` : 'Not Yet'}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-info">
              <h3>CGPA</h3>
              <p>{profile?.cgpa?.toFixed(2) || '-'} / 10</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
