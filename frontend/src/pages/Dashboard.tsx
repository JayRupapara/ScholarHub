import React from 'react';
import { BookOpen, Clock, Star, CheckCircle, Bell, TrendingUp, AlertCircle, Award } from 'lucide-react';

export default function Dashboard() {
  const scholarships = [
    {
      title: "STEM Excellence Scholarship",
      amount: 10000,
      deadline: "2024-05-15",
      status: "In Progress",
      progress: 75,
      color: "indigo"
    },
    {
      title: "Global Leaders Fund",
      amount: 15000,
      deadline: "2024-06-01",
      status: "Not Started",
      progress: 0,
      color: "gray"
    },
    {
      title: "Creative Arts Grant",
      amount: 7500,
      deadline: "2024-05-30",
      status: "Submitted",
      progress: 100,
      color: "green"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, Student!</h1>
          <p className="mt-2 text-gray-600">Here's what's happening with your scholarship applications.</p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: BookOpen, label: "Active Applications", value: "5", color: "blue", trend: "+2 this week" },
            { icon: Clock, label: "Upcoming Deadlines", value: "3", color: "yellow", trend: "Next: 3 days" },
            { icon: Star, label: "Saved Scholarships", value: "12", color: "purple", trend: "4 new matches" },
            { icon: CheckCircle, label: "Completed", value: "8", color: "green", trend: "75% success rate" }
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 p-3 rounded-lg bg-${stat.color}-100`}>
                    <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{stat.label}</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                        <div className="ml-2 text-sm text-gray-600">{stat.trend}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Applications and Notifications Grid */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Applications Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Your Applications</h2>
                  <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    View All
                  </button>
                </div>
                <div className="space-y-6">
                  {scholarships.map((scholarship, i) => (
                    <div key={i} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-indigo-600">{scholarship.title}</h3>
                          <div className="mt-2 flex items-center text-sm text-gray-500 space-x-4">
                            <div className="flex items-center">
                              <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                              <span>Due {new Date(scholarship.deadline).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center">
                              <Award className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                              <span>${scholarship.amount.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center">
                            <div className="w-48 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full bg-${scholarship.color}-600`}
                                style={{ width: `${scholarship.progress}%` }}
                              ></div>
                            </div>
                            <span className={`ml-3 text-sm font-medium text-${scholarship.color}-600`}>
                              {scholarship.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Notifications Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Updates</h2>
                  <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      icon: AlertCircle,
                      color: "red",
                      title: "Application Deadline",
                      message: "STEM Excellence Scholarship due in 3 days",
                      time: "2 hours ago"
                    },
                    {
                      icon: TrendingUp,
                      color: "green",
                      title: "New Match Found",
                      message: "New scholarship matching your profile",
                      time: "1 day ago"
                    },
                    {
                      icon: CheckCircle,
                      color: "blue",
                      title: "Application Update",
                      message: "Creative Arts Grant application received",
                      time: "2 days ago"
                    }
                  ].map((notification, i) => (
                    <div key={i} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-150">
                      <div className={`flex-shrink-0 p-2 rounded-lg bg-${notification.color}-100`}>
                        <notification.icon className={`h-5 w-5 text-${notification.color}-600`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                        <p className="text-sm text-gray-500">{notification.message}</p>
                        <span className="text-xs text-gray-400">{notification.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}