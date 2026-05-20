import React, { useState, useEffect } from 'react';
import { resultService } from '../services/api';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import LoadingSpinner from '../components/LoadingSpinner';
import './ResultsDashboard.css';

const ResultsDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await resultService.getDashboardStats();
      setStats(response.data.stats);
    } catch (error) {
      console.error('Failed to fetch stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  const COLORS = ['#3498db', '#2ecc71', '#f39c12', '#e74c3c', '#9b59b6', '#1abc9c'];

  const departmentData = stats.departmentStats.map(dept => ({
    name: dept._id || 'Unknown',
    placed: dept.placed,
    total: dept.total,
    placement: Math.round((dept.placed / dept.total) * 100)
  }));

  const companyData = stats.placementStats.map(item => ({
    name: item.company[0]?.companyName || 'Unknown',
    students: item.count
  }));

  return (
    <div className="results-dashboard">
      <div className="dashboard-header">
        <h1>📊 Placement Statistics Dashboard</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-box">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <p>Total Students</p>
            <h2>{stats.totalStudents}</h2>
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <p>Placed Students</p>
            <h2>{stats.placedStudents}</h2>
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-icon">💼</div>
          <div className="stat-content">
            <p>Companies</p>
            <h2>{stats.companies}</h2>
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <p>Upcoming Interviews</p>
            <h2>{stats.upcomingInterviews}</h2>
          </div>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-box">
          <h3>Students Placed Per Company</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={companyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#3498db" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Department-wise Placement Rate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
              <Bar dataKey="placement" name="Placement %" fill="#2ecc71" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Overall Placement Status</h3>
          <div className="pie-chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Placed', value: stats.placedStudents },
                    { name: 'Not Placed', value: stats.totalStudents - stats.placedStudents }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  <Cell fill="#2ecc71" />
                  <Cell fill="#e74c3c" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="table-section">
        <h3>Department Statistics</h3>
        <table className="stats-table">
          <thead>
            <tr>
              <th>Department</th>
              <th>Total Students</th>
              <th>Placed</th>
              <th>Placement Rate</th>
            </tr>
          </thead>
          <tbody>
            {departmentData.map((dept, idx) => (
              <tr key={idx}>
                <td>{dept.name}</td>
                <td>{dept.total}</td>
                <td>{dept.placed}</td>
                <td>
                  <span className={`placement-badge ${dept.placement >= 50 ? 'high' : 'low'}`}>
                    {dept.placement}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsDashboard;
