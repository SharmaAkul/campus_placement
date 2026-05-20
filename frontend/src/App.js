import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import Home from './pages/Home';
import { Login, Register } from './pages/Auth';
import StudentDashboard from './pages/StudentDashboard';
import Jobs from './pages/Jobs';
import AptitudeTest from './pages/AptitudeTest';
import MyInterviews from './pages/MyInterviews';
import ResultsDashboard from './pages/ResultsDashboard';
import './App.css';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, isAuthenticated, loading } = useContext(AuthContext);

  if (loading) return <LoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (requiredRole && user?.role !== requiredRole) return <Navigate to="/" />;

  return children;
};

function AppContent() {
  const { user, logout, loading } = useContext(AuthContext);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="app">
      <Navbar user={user} onLogout={logout} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoute requiredRole="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jobs"
            element={
              <ProtectedRoute requiredRole="student">
                <Jobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/aptitude-test"
            element={
              <ProtectedRoute requiredRole="student">
                <AptitudeTest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-interviews"
            element={
              <ProtectedRoute requiredRole="student">
                <MyInterviews />
              </ProtectedRoute>
            }
          />
          <Route path="/results-dashboard" element={<ResultsDashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
        <ToastContainer position="bottom-right" autoClose={3000} />
      </AuthProvider>
    </Router>
  );
}

export default App;
