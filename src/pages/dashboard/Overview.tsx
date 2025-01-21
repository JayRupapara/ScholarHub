import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { FileText, BookMarked, Clock } from 'lucide-react';

const DUMMY_STATS = {
  applications: 2,
  saved: 5,
  deadlines: 3
};

const DUMMY_RECENT_ACTIVITY = [
  {
    id: '1',
    type: 'application',
    title: 'STEM Excellence Scholarship',
    action: 'submitted',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
  },
  {
    id: '2',
    type: 'saved',
    title: 'Future Leaders Grant',
    action: 'saved',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString()
  }
];

export function Overview() {
  const { user } = useAuth();
  const [stats, setStats] = React.useState(DUMMY_STATS);
  const [recentActivity, setRecentActivity] = React.useState(DUMMY_RECENT_ACTIVITY);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome back, {user?.name || 'User'}</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Applications</h3>
            <FileText className="h-6 w-6 text-indigo-600" />
          </div>
          <p className="text-3xl font-bold text-indigo-600">{stats.applications}</p>
          <p className="text-sm text-gray-500">Total applications submitted</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Saved</h3>
            <BookMarked className="h-6 w-6 text-indigo-600" />
          </div>
          <p className="text-3xl font-bold text-indigo-600">{stats.saved}</p>
          <p className="text-sm text-gray-500">Saved scholarships</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">Deadlines</h3>
            <Clock className="h-6 w-6 text-indigo-600" />
          </div>
          <p className="text-3xl font-bold text-indigo-600">{stats.deadlines}</p>
          <p className="text-sm text-gray-500">Upcoming deadlines</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/basic-search"
              className="flex items-center p-4 border rounded-lg hover:bg-gray-50"
            >
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Find Scholarships</h3>
                <p className="text-sm text-gray-500">Browse available opportunities</p>
              </div>
            </Link>
            <Link
              to="/dashboard/applications"
              className="flex items-center p-4 border rounded-lg hover:bg-gray-50"
            >
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">Track Applications</h3>
                <p className="text-sm text-gray-500">Manage your submissions</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Activity</h2>
          {recentActivity.length > 0 ? (
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">
                      {activity.action.charAt(0).toUpperCase() + activity.action.slice(1)}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(activity.date).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              No recent activity to show
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 