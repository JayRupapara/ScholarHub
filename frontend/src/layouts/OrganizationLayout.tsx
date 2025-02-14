import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  HomeIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  UserIcon,
  ArrowRightOnRectangleIcon as LogoutIcon,
} from '@heroicons/react/24/outline';
import { Layout } from 'lucide-react';

interface OrganizationLayoutProps {
  children: React.ReactNode;
}

const OrganizationLayout = ({ children }: OrganizationLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail') || '';

  // Check authentication on mount
  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    const userType = localStorage.getItem('userType');
    
    if (!isAuth || userType !== 'organization') {
      navigate('/signin/organization');
    }
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userType');
    localStorage.removeItem('userEmail');
    navigate('/signin/organization');
  };

  const getUserInitial = () => {
    return userEmail.charAt(0).toUpperCase();
  };

  const sidebarLinks = [
    { 
      name: 'Dashboard', 
      icon: HomeIcon, 
      path: '/organization/dashboard' 
    },
    { 
      name: 'Manage Scholarships', 
      icon: DocumentTextIcon, 
      path: '/organization/manage-scholarships' 
    },
    { 
      name: 'Applications', 
      icon: ClipboardDocumentListIcon, 
      path: '/organization/applications' 
    },
    { 
      name: 'Profile', 
      icon: UserIcon, 
      path: '/organization/profile' 
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-neutral">
      <div className="drawer lg:drawer-open">
        <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
        
        <div className="drawer-content flex flex-col">
          {/* Sticky Top Navbar */}
          <div className="sticky top-0 z-50">
            <div className="navbar bg-base-100 shadow-sm">
              <div className="flex-1">
                <div className="lg:hidden">
                  <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost">
                    <Layout className="h-6 w-6" />
                  </label>
                </div>
                {/* Page Title */}
                <h1 className="text-xl font-bold text-primary ml-4">
                  {location.pathname === '/organization/dashboard' ? 'Dashboard' :
                   location.pathname === '/organization/manage-scholarships' ? 'Manage Scholarships' :
                   location.pathname === '/organization/applications' ? 'Applications' :
                   location.pathname === '/organization/profile' ? 'Profile' : ''}
                </h1>
              </div>
              
              {/* User Profile Section */}
              <div className="flex-none">
                <div className="dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost gap-2">
                    <span className="text-accent">{userEmail}</span>
                    <div className="avatar placeholder">
                      <div className="bg-primary text-neutral rounded-full w-8">
                        <span>{getUserInitial()}</span>
                      </div>
                    </div>
                  </label>
                  <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                    <li>
                      <Link to="/organization/profile" className="text-accent hover:bg-neutral">
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
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
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
              {sidebarLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className={`${
                      isActive(link.path) 
                        ? 'bg-primary text-neutral' 
                        : 'text-accent hover:bg-neutral'
                    }`}
                  >
                    <link.icon className="h-5 w-5" /> {link.name}
                  </Link>
                </li>
              ))}
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

export default OrganizationLayout;