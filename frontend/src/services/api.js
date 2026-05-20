import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: (name, email, password, role) =>
    api.post('/auth/register', { name, email, password, role }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  getMe: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
};

export const studentService = {
  getProfile: () => api.get('/students/profile'),
  updateProfile: (data) => api.put('/students/profile', data),
  getAllStudents: (filters) => api.get('/students', { params: filters }),
  getStudent: (id) => api.get(`/students/${id}`),
};

export const companyService = {
  getProfile: () => api.get('/companies/profile'),
  updateProfile: (data) => api.put('/companies/profile', data),
  getAllCompanies: () => api.get('/companies'),
  getCompany: (id) => api.get(`/companies/${id}`),
};

export const jobService = {
  createJob: (data) => api.post('/jobs', data),
  getAllJobs: (filters) => api.get('/jobs', { params: filters }),
  getJob: (id) => api.get(`/jobs/${id}`),
  updateJob: (id, data) => api.put(`/jobs/${id}`, data),
  deleteJob: (id) => api.delete(`/jobs/${id}`),
  applyForJob: (jobId) => api.post(`/jobs/${jobId}/apply`),
};

export const interviewService = {
  scheduleInterview: (data) => api.post('/interviews', data),
  getAllInterviews: (filters) => api.get('/interviews', { params: filters }),
  getMyInterviews: () => api.get('/interviews/my-interviews/list'),
  getCompanyInterviews: () => api.get('/interviews/company-interviews/list'),
  updateInterview: (id, data) => api.put(`/interviews/${id}`, data),
  cancelInterview: (id) => api.delete(`/interviews/${id}`),
};

export const aptitudeService = {
  getAllQuestions: () => api.get('/aptitude/questions'),
  getRandomQuestions: (count) => api.get('/aptitude/questions/random', { params: { count } }),
  startTest: () => api.post('/aptitude/start'),
  submitTest: (testId, answers) => api.post('/aptitude/submit', { testId, answers }),
  getTestResult: (testId) => api.get(`/aptitude/result/${testId}`),
  getMyTests: () => api.get('/aptitude/my-tests'),
};

export const resultService = {
  createResult: (data) => api.post('/results', data),
  getAllResults: (filters) => api.get('/results', { params: filters }),
  getMyResults: () => api.get('/results/my-results'),
  getDashboardStats: () => api.get('/results/stats/dashboard'),
  updateResult: (id, data) => api.put(`/results/${id}`, data),
};

export default api;
