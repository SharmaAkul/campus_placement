import React, { useState, useEffect } from 'react';
import { jobService } from '../services/api';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/LoadingSpinner';
import './Jobs.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDept, setFilterDept] = useState('');

  useEffect(() => {
    fetchJobs();
  }, [filterDept]);

  const fetchJobs = async () => {
    try {
      const response = await jobService.getAllJobs({ department: filterDept });
      setJobs(response.data.jobs);
    } catch (error) {
      toast.error('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (jobId) => {
    try {
      await jobService.applyForJob(jobId);
      toast.success('Applied successfully!');
      fetchJobs();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to apply');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="jobs-container">
      <div className="jobs-header">
        <h1>Available Job Openings</h1>
        <div className="filter-section">
          <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)} className="filter-select">
            <option value="">All Departments</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
            <option value="ME">ME</option>
          </select>
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="no-jobs">
          <p>No jobs available at the moment.</p>
        </div>
      ) : (
        <div className="jobs-grid">
          {jobs.map((job) => (
            <div key={job._id} className="job-card">
              <div className="job-header">
                <h3>{job.jobTitle}</h3>
                <span className="package-badge">₹{job.package} LPA</span>
              </div>
              <p className="company-name">{job.companyId.companyName}</p>
              <p className="location">📍 {job.location}</p>
              <div className="job-details">
                <p><strong>CGPA Requirement:</strong> {job.minCGPA} - {job.maxCGPA}</p>
                <p><strong>Mode:</strong> {job.interviewMode?.toUpperCase()}</p>
                <p><strong>Interview Date:</strong> {new Date(job.interviewDate).toLocaleDateString()}</p>
              </div>
              <div className="skills-section">
                <p><strong>Required Skills:</strong></p>
                <div className="skills-list">
                  {job.requiredSkills.map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
              <button onClick={() => handleApply(job._id)} className="btn-apply">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
