import React from 'react';
import { Users, Award, } from 'lucide-react';

const OrgDashboard = () => {
  // Sample data
  const stats = [
    {
      title: "Total Applications",
      value: "1,284",
      change: "+12.5%",
      icon: Users,
      color: "primary"
    },
    {
      title: "Active Scholarships",
      value: "24",
      change: "+2",
      icon: Award,
      color: "secondary"
    },
  ];

  const recentApplications = [
    {
      id: 1,
      studentName: "John Doe",
      scholarship: "STEM Excellence Scholarship",
      date: "2024-02-14",
      status: "pending"
    },
    {
      id: 2,
      studentName: "Jane Smith",
      scholarship: "Creative Arts Grant",
      date: "2024-02-13",
      status: "approved"
    },
    {
      id: 3,
      studentName: "Mike Johnson",
      scholarship: "Future Leaders Fund",
      date: "2024-02-12",
      status: "rejected"
    }
  ];

  return (
    <div className="p-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-base-100 rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg bg-${stat.color}/10`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <p className={`ml-2 text-sm text-${stat.color}`}>{stat.change}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Applications */}
        <div className="bg-base-100 rounded-xl shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Applications</h2>
              <button className="btn btn-ghost btn-sm">View All</button>
            </div>
            <div className="space-y-4">
              {recentApplications.map((application) => (
                <div key={application.id} className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                  <div>
                    <p className="font-medium">{application.studentName}</p>
                    <p className="text-sm text-gray-500">{application.scholarship}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{new Date(application.date).toLocaleDateString()}</p>
                    <span className={`badge badge-sm ${application.status === 'approved' ? 'badge-success' :
                      application.status === 'rejected' ? 'badge-error' :
                        'badge-warning'
                      }`}>
                      {application.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default OrgDashboard;