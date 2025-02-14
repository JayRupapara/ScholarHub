import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  HomeIcon,
  AcademicCapIcon,
  BookmarkIcon,
  Cog6ToothIcon as CogIcon,
  UserIcon,
  ArrowRightOnRectangleIcon as LogoutIcon,
  CalendarIcon,
  BellIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Layout, Home, BookOpen, Heart, User, Calendar, LogOut } from 'lucide-react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = localStorage.getItem('userEmail') || '';

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    navigate('/signin');
  };

  const isActive = (path: string) => {
    return location.pathname === `/dashboard${path}`;
  };

  const getUserInitial = () => {
    return userEmail.charAt(0).toUpperCase();
  };

  const sidebarLinks = [
    { name: 'Dashboard', icon: HomeIcon, path: '/dashboard' },
    { name: 'Scholarships', icon: AcademicCapIcon, path: '/dashboard/scholarships' },
    { name: 'Saved', icon: BookmarkIcon, path: '/dashboard/saved' },
    { name: 'Calendar', icon: CalendarIcon, path: '/dashboard/calendar' },
    { name: 'Profile', icon: UserIcon, path: '/dashboard/profile' },
  ];

  const quickActions = [
    { name: 'New Application', action: () => navigate('/dashboard/scholarships') },
    { name: 'Update Profile', action: () => navigate('/dashboard/profile') },
    { name: 'View Calendar', action: () => navigate('/dashboard/calendar') },
  ];

  return (
    <div className="min-h-screen bg-neutral">
      <div className="drawer lg:drawer-open">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
        
        <div className="drawer-content">
          {/* Top Navbar */}
          <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
              <div className="lg:hidden">
                <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
                  <Layout className="h-6 w-6" />
                </label>
              </div>
            </div>
            
            {/* User Profile Section */}
            <div className="flex-none gap-2">
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-5 w-5 text-accent" />
              </button>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost gap-2">
                  <div className="avatar placeholder">
                    <div className="bg-primary text-neutral rounded-full w-8">
                      <span>{getUserInitial()}</span>
                    </div>
                  </div>
                  <span className="text-accent">{userEmail}</span>
                </label>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                  <li>
                    <Link to="/dashboard/profile" className="text-accent hover:bg-neutral">
                      <UserIcon className="h-4 w-4" />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleSignOut} className="text-error hover:bg-neutral">
                      <LogoutIcon className="h-4 w-4" />
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            {children}
          </div>
        </div>

        {/* Sidebar */}
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <div className="w-64 min-h-full bg-base-100 text-base-content flex flex-col">
            <div className="p-4">
              <Link to="/" className="text-2xl font-bold text-primary">ScholarHub</Link>
            </div>
            
            {/* Navigation Menu */}
            <ul className="menu p-4 flex-1 space-y-2">
              <li>
                <Link 
                  to="/dashboard"
                  className={`${isActive('') ? 'bg-primary text-neutral' : 'text-accent hover:bg-neutral'}`}
                >
                  <HomeIcon className="h-5 w-5" /> Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard/scholarships"
                  className={`${isActive('/scholarships') ? 'bg-primary text-neutral' : 'text-accent hover:bg-neutral'}`}
                >
                  <AcademicCapIcon className="h-5 w-5" /> Scholarships
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard/saved"
                  className={`${isActive('/saved') ? 'bg-primary text-neutral' : 'text-accent hover:bg-neutral'}`}
                >
                  <BookmarkIcon className="h-5 w-5" /> Saved
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard/profile"
                  className={`${isActive('/profile') ? 'bg-primary text-neutral' : 'text-accent hover:bg-neutral'}`}
                >
                  <UserIcon className="h-5 w-5" /> Profile
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard/calendar"
                  className={`${isActive('/calendar') ? 'bg-primary text-neutral' : 'text-accent hover:bg-neutral'}`}
                >
                  <CalendarIcon className="h-5 w-5" /> Calendar
                </Link>
              </li>
            </ul>

            {/* Sign Out Button at Bottom */}
            <div className="p-4 border-t border-base-200">
              <button 
                onClick={handleSignOut}
                className="btn btn-ghost w-full text-error hover:bg-neutral justify-start"
              >
                <LogoutIcon className="h-5 w-5 mr-2" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout; 