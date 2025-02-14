import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';

const Header = () => {
  const location = useLocation();

  // Don't show header on dashboard routes
  if (location.pathname.startsWith('/dashboard')) {
    return null;
  }

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex-1">
          <Link to="/" className="text-2xl font-bold text-primary">ScholarHub</Link>
        </div>

        <div className="flex-none hidden md:block">
          <div className="flex items-center space-x-4">
            <Link to="/" className="btn btn-ghost text-accent hover:text-primary">Home</Link>
            <Link to="/signin" className="btn btn-ghost text-accent hover:text-primary">Sign In</Link>
            <Link to="/signup" className="btn bg-primary text-neutral hover:bg-accent">Sign Up</Link>
          </div>
        </div>

        <div className="flex-none md:hidden">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <Menu className="h-6 w-6" />
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/signin">Sign In</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex-none">
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};

export default Header;