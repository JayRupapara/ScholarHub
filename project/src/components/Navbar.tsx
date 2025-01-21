import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { GraduationCap, Menu, X, Bell, LayoutGrid, BookMarked, FileText } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const profileMenuRef = React.useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out');
    }
  };

  const isActive = (path: string) => location.pathname === path;

  const isLandingPage = location.pathname === '/';
  const isAuthPage = ['/signin', '/signup'].includes(location.pathname);

  // Add dashboard navigation items
  const dashboardItems = [
    { path: '/dashboard', icon: LayoutGrid, label: 'Overview' },
    { path: '/dashboard/saved', icon: BookMarked, label: 'Saved Scholarships' },
    { path: '/dashboard/applications', icon: FileText, label: 'Applications' },
    { path: '/dashboard/notifications', icon: Bell, label: 'Notifications' }
  ];

  const isDashboardPage = location.pathname.startsWith('/dashboard');

  // Close profile menu when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <GraduationCap className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-lg sm:text-xl font-bold text-gray-900">ScholarMatch</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {!isLandingPage && !isAuthPage && user && (
              <Link 
                to="/basic-search" 
                className={`text-gray-700 hover:text-indigo-600 ${
                  isActive('/basic-search') ? 'text-indigo-600' : ''
                }`}
              >
                Search
              </Link>
            )}
            
            {user ? (
              <>
                <Link 
                  to="/advanced-search" 
                  className={`text-gray-700 hover:text-indigo-600 ${
                    isActive('/advanced-search') ? 'text-indigo-600' : ''
                  }`}
                >
                  Advanced Search
                </Link>

                <div className="relative" ref={profileMenuRef}>
                  <button 
                    className="flex items-center space-x-1"
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                  >
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-600 font-semibold">
                        {user.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/profile-settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Profile Settings
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsProfileOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              isLandingPage ? (
                <div className="flex items-center space-x-4">
                  <Link 
                    to="/signup" 
                    className="text-gray-700 hover:text-indigo-600"
                  >
                    Sign Up
                  </Link>
                  <Link 
                    to="/signin" 
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                  >
                    Sign In
                  </Link>
                </div>
              ) : (
                <Link 
                  to="/signin" 
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Sign In
                </Link>
              )
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - Combined Navigation */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu panel */}
          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white">
            <div className="h-full flex flex-col">
              {/* Close button */}
              <div className="px-4 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <GraduationCap className="h-8 w-8 text-indigo-600" />
                  <span className="ml-2 text-xl font-bold text-gray-900">ScholarMatch</span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-md p-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Menu items */}
              <div className="flex-1 px-2 py-4 overflow-y-auto">
                {user ? (
                  <>
                    {/* User info */}
                    <div className="px-4 py-4 border-b border-gray-200">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <span className="text-indigo-600 font-semibold">
                            {user.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-3">
                          <p className="text-base font-medium text-gray-700">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Navigation items */}
                    <div className="mt-4 space-y-1">
                      {!isDashboardPage && (
                        <Link 
                          to="/basic-search" 
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Search
                        </Link>
                      )}

                      {/* Dashboard items */}
                      {dashboardItems.map(({ path, icon: Icon, label }) => (
                        <Link
                          key={path}
                          to={path}
                          className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                            location.pathname === path
                              ? 'bg-indigo-50 text-indigo-600'
                              : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <Icon className="h-5 w-5 mr-3" />
                          {label}
                        </Link>
                      ))}

                      {/* Profile and logout */}
                      <Link
                        to="/profile-settings"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Profile Settings
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-1">
                    {isLandingPage && (
                      <Link 
                        to="/signup" 
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    )}
                    <Link 
                      to="/signin" 
                      className="block px-3 py-2 rounded-md text-base font-medium bg-indigo-600 text-white hover:bg-indigo-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}