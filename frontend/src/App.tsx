import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import DashboardLayout from './components/DashboardLayout';
import ScholarshipsPage from './pages/ScholarshipsPage';
import SavedScholarships from './pages/SavedScholarships';
import Profile from './pages/Profile';
import Calendar from './pages/Calendar';

// Auth helper
const getIsAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

function PrivateRoute({ children }: { children: React.ReactNode }) {
  return getIsAuthenticated() ? <>{children}</> : <Navigate to="/signin" />;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <HomePage />
                <Footer />
              </>
            } 
          />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/scholarships" element={<ScholarshipsPage />} />
                    <Route path="/saved" element={<SavedScholarships />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/calendar" element={<Calendar />} />
                  </Routes>
                </DashboardLayout>
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;