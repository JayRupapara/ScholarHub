import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import StudentLayout from './layouts/StudentLayout';
import OrganizationLayout from './layouts/OrganizationLayout';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// Common Pages
import HomePage from './pages/common/HomePage';
import SignInStudent from './pages/common/SignInStudent';
import SignUpStudent from './pages/common/SignUpStudent';
import SignInOrganization from './pages/common/SignInOrganization';
import SignUpOrganization from './pages/common/SignUpOrganization';

// Student Pages
import Dashboard from './pages/student/Dashboard';
import ScholarshipsPage from './pages/student/ScholarshipsPage';
import SavedScholarships from './pages/student/SavedScholarships';
import AppliedScholarships from './pages/student/AppliedScholarships';
import Calendar from './pages/student/Calendar';
import Profile from './pages/student/Profile';

// Organization Pages
import OrgDashboard from './pages/organization/OrgDashboard';
import ManageScholarships from './pages/organization/ManageScholarships';
import Applications from './pages/organization/Applications';
import Analytics from './pages/organization/Analytics';
import OrgProfile from './pages/organization/OrgProfile';

// Auth helpers
const getIsAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

const getUserType = () => {
  return localStorage.getItem('userType'); // 'student' or 'organization'
};

// Route Guards
interface PrivateRouteProps {
  children: React.ReactNode;
  allowedUserType: 'student' | 'organization';
}

const PrivateRoute = ({ children, allowedUserType }: PrivateRouteProps) => {
  const isAuth = getIsAuthenticated();
  const userType = getUserType();
  
  if (!isAuth) {
    return <Navigate to={`/signin/${allowedUserType}`} replace />;
  }
  
  if (userType !== allowedUserType) {
    return <Navigate to={`/${userType}/dashboard`} replace />;
  }
  
  return <>{children}</>;
};

// Public Layout (for home, signin, signup pages)
const PublicLayout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname.includes('/signin') || location.pathname.includes('/signup');
  
  // Don't show header/footer on auth pages
  if (isAuthPage) {
    return <Outlet />;
  }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          {/* Landing Page */}
          <Route path="/" element={<HomePage />} />
          
          {/* Auth Routes */}
          <Route path="/signin/student" element={<SignInStudent />} />
          <Route path="/signin/organization" element={<SignInOrganization />} />
          <Route path="/signup/student" element={<SignUpStudent />} />
          <Route path="/signup/organization" element={<SignUpOrganization />} />
        </Route>

        {/* Student Dashboard Routes */}
        <Route
          path="/student/*"
          element={
            <PrivateRoute allowedUserType="student">
              <StudentLayout>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="scholarships" element={<ScholarshipsPage />} />
                  <Route path="applied" element={<AppliedScholarships />} />
                  <Route path="saved" element={<SavedScholarships />} />
                  <Route path="calendar" element={<Calendar />} />
                  <Route path="profile" element={<Profile />} />
                </Routes>
              </StudentLayout>
            </PrivateRoute>
          }
        />

        {/* Organization Dashboard Routes */}
        <Route
          path="/organization/*"
          element={
            <PrivateRoute allowedUserType="organization">
              <OrganizationLayout>
                <Routes>
                  <Route path="dashboard" element={<OrgDashboard />} />
                  <Route path="manage-scholarships" element={<ManageScholarships />} />
                  <Route path="applications" element={<Applications />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="profile" element={<OrgProfile />} />
                </Routes>
              </OrganizationLayout>
            </PrivateRoute>
          }
        />

        {/* Catch all route - Redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;