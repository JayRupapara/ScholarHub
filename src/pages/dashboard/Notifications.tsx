import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Clock, Award, Info } from 'lucide-react';
import { Notification } from '../../types/dashboard';

const DUMMY_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    userId: '1',
    type: 'deadline',
    title: 'Application Deadline Approaching',
    message: 'The deadline for "STEM Excellence Scholarship" is in 3 days.',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    scholarshipId: '123',
    action: {
      label: 'View Application',
      url: '/dashboard/applications'
    }
  },
  {
    id: '2',
    userId: '1',
    type: 'status_update',
    title: 'Application Status Updated',
    message: 'Your application for "Future Leaders Grant" has been reviewed.',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    applicationId: '456',
    action: {
      label: 'View Status',
      url: '/dashboard/applications'
    }
  },
  {
    id: '3',
    userId: '1',
    type: 'new_match',
    title: 'New Scholarship Match',
    message: 'We found a new scholarship that matches your profile!',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    scholarshipId: '789',
    action: {
      label: 'View Scholarship',
      url: '/scholarships/789'
    }
  }
];

export function Notifications() {
  const [notifications, setNotifications] = React.useState<Notification[]>(DUMMY_NOTIFICATIONS);
  const [loading, setLoading] = React.useState(false);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'deadline':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'status_update':
        return <Award className="h-5 w-5 text-green-500" />;
      case 'new_match':
        return <Bell className="h-5 w-5 text-blue-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const markAsRead = async (id: string) => {
    try {
      // TODO: Implement mark as read API call
      setNotifications(notifications.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      ));
    } catch (error) {
      console.error('Failed to mark notification as read', error);
    }
  };

  React.useEffect(() => {
    // TODO: Fetch notifications
    setLoading(false);
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <p className="text-gray-600">Stay updated with your scholarship opportunities</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading notifications...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-lg shadow p-4 ${
                !notification.read ? 'border-l-4 border-indigo-600' : ''
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">
                      {notification.title}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
                  {notification.action && (
                    <Link
                      to={notification.action.url}
                      className="mt-2 inline-block text-sm text-indigo-600 hover:text-indigo-500"
                    >
                      {notification.action.label}
                    </Link>
                  )}
                </div>
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            </div>
          ))}
          {notifications.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No notifications yet</p>
              <Link
                to="/basic-search"
                className="mt-4 inline-block text-indigo-600 hover:text-indigo-500"
              >
                Browse Scholarships
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 