'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, BookMarked, FileText, Bell } from 'lucide-react';

const navItems = [
  { path: '/dashboard', icon: LayoutGrid, label: 'Dashboard', exact: true },
  { path: '/dashboard/saved', icon: BookMarked, label: 'Saved Scholarships' },
  { path: '/dashboard/applications', icon: FileText, label: 'Applications' },
  { path: '/dashboard/notifications', icon: Bell, label: 'Notifications' }
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow p-4 space-y-1">
              {navItems.map(({ path, icon: Icon, label, exact }) => (
                <Link
                  key={path}
                  href={path}
                  className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                    (exact ? path === pathname : pathname.startsWith(path))
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
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 