import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ChatBot } from './components/ChatBot';
import { LandingPage } from './pages/LandingPage';
import { BasicSearch } from './pages/BasicSearch';
import { ScholarshipList } from './pages/ScholarshipList';
import { ScholarshipDetails } from './pages/ScholarshipDetails';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { AdvancedProfile } from './pages/AdvancedProfile';
import { AdvancedSearch } from './pages/AdvancedSearch';
import { Dashboard } from './pages/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ProfileSettings } from './pages/ProfileSettings';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/basic-search" element={<BasicSearch />} />
              <Route path="/scholarships" element={<ScholarshipList />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              
              {/* Protected Routes */}
              <Route
                path="/scholarships/:id"
                element={
                  <ProtectedRoute>
                    <ScholarshipDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/advanced-profile"
                element={
                  <ProtectedRoute>
                    <AdvancedProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/advanced-search"
                element={
                  <ProtectedRoute>
                    <AdvancedSearch />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/*"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile-settings"
                element={
                  <ProtectedRoute>
                    <ProfileSettings />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
          <ChatBot />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;