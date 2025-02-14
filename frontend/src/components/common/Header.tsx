import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const Header = () => {
  const location = useLocation();

  // Don't show header on dashboard routes
  if (location.pathname.startsWith('/student') || 
      location.pathname.startsWith('/organization')) {
    return null;
  }

  return (
    <div className="bg-white shadow-sm">
      <div className="navbar container mx-auto">
        <div className="flex-1">
          <Link to="/" className="text-2xl font-bold text-primary">ScholarHub</Link>
        </div>

        <div className="flex-none gap-4">
          {/* Sign In Dropdown */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost">
              Sign In
              <ChevronDown className="h-4 w-4 ml-1" />
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link to="/signin/student">Sign in as Student</Link></li>
              <li><Link to="/signin/organization">Sign in as Organization</Link></li>
            </ul>
          </div>

          {/* Sign Up Dropdown */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-primary">
              Create Account
              <ChevronDown className="h-4 w-4 ml-1" />
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link to="/signup/student">Sign up as Student</Link></li>
              <li><Link to="/signup/organization">Sign up as Organization</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;