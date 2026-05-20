import React, { useState, useEffect } from 'react';
import { interviewService } from '../services/api';
import { toast } from 'react-toastify';
import LoadingSpinner from '../components/LoadingSpinner';
import './MyInterviews.css';

const MyInterviews = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      const response = await interviewService.getMyInterviews();
      setInterviews(response.data.interviews);
    } catch (error) {
      toast.error('Failed to fetch interviews');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'scheduled';
      case 'completed':
        return 'completed';
      case 'cancelled':
        return 'cancelled';
      default:
        return 'pending';
    }
  };

  const upcomingInterviews = interviews.filter(
    (i) => new Date(i.interviewDate) > new Date() && i.status === 'scheduled'
  );
  const completedInterviews = interviews.filter((i) => i.status === 'completed');

  return (
    <div className="interviews-container">
      <div className="interviews-header">
        <h1>📅 My Interviews</h1>
      </div>

      {interviews.length === 0 ? (
        <div className="no-interviews">
          <p>No interviews scheduled yet.</p>
        </div>
      ) : (
        <>
          {upcomingInterviews.length > 0 && (
            <div className="interviews-section">
              <h2>Upcoming Interviews ({upcomingInterviews.length})</h2>
              <div className="interviews-grid">
                {upcomingInterviews.map((interview) => (
                  <div key={interview._id} className="interview-card upcoming">
                    <div className="interview-header">
                      <h3>{interview.jobId?.jobTitle || 'Interview'}</h3>
                      <span className={`status-badge ${getStatusBadgeColor(interview.status)}`}>
                        {interview.status?.toUpperCase()}
                      </span>
                    </div>
                    <p className="company-name">{interview.companyId?.companyName}</p>
                    <div className="interview-details">
                      <p>
                        <strong>📅 Date:</strong>{' '}
                        {new Date(interview.interviewDate).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>⏰ Time:</strong> {interview.interviewTime}
                      </p>
                      <p>
                        <strong>📍 Mode:</strong> {interview.interviewMode?.toUpperCase()}
                      </p>
                      {interview.interviewMode === 'online' && interview.meetingLink && (
                        <p>
                          <strong>🔗 Link:</strong>{' '}
                          <a href={interview.meetingLink} target="_blank" rel="noopener noreferrer">
                            Join Meeting
                          </a>
                        </p>
                      )}
                      {interview.interviewMode === 'offline' && interview.location && (
                        <p>
                          <strong>📌 Location:</strong> {interview.location}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {completedInterviews.length > 0 && (
            <div className="interviews-section">
              <h2>Completed Interviews ({completedInterviews.length})</h2>
              <div className="interviews-grid">
                {completedInterviews.map((interview) => (
                  <div key={interview._id} className="interview-card completed">
                    <div className="interview-header">
                      <h3>{interview.jobId?.jobTitle || 'Interview'}</h3>
                      <span className={`status-badge ${getStatusBadgeColor(interview.status)}`}>
                        {interview.status?.toUpperCase()}
                      </span>
                    </div>
                    <p className="company-name">{interview.companyId?.companyName}</p>
                    <div className="interview-details">
                      <p>
                        <strong>📅 Date:</strong>{' '}
                        {new Date(interview.interviewDate).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>📊 Result:</strong>{' '}
                        <span className={`result-badge ${interview.result}`}>
                          {interview.result?.toUpperCase()}
                        </span>
                      </p>
                      {interview.remarks && (
                        <p>
                          <strong>📝 Remarks:</strong> {interview.remarks}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyInterviews;
