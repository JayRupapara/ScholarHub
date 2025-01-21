import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Layout, LayoutGrid, BookMarked, FileText, Bell, Menu } from 'lucide-react';
import { SavedScholarships } from './dashboard/SavedScholarships';
import { Applications } from './dashboard/Applications';
import { Notifications } from './dashboard/Notifications';
import { Overview } from './dashboard/Overview';

export function Dashboard() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/dashboard', icon: LayoutGrid, label: 'Dashboard', exact: true },
    { path: '/dashboard/saved', icon: BookMarked, label: 'Saved Scholarships' },
    { path: '/dashboard/applications', icon: FileText, label: 'Applications' },
    { path: '/dashboard/notifications', icon: Bell, label: 'Notifications' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Sidebar - Only visible on desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow p-4 space-y-1">
              {navItems.map(({ path, icon: Icon, label, exact }) => (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                    (exact ? path === location.pathname : location.pathname.startsWith(path))
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/saved" element={<SavedScholarships />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/notifications" element={<Notifications />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
} 