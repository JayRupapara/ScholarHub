import { Users, Award, BarChart2, } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
    }
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

  // Analytics data
  const analyticsData = [
    { name: 'Jan', applications: 65 },
    { name: 'Feb', applications: 85 },
    { name: 'Mar', applications: 72 },
    { name: 'Apr', applications: 99 },
    { name: 'May', applications: 87 },
    { name: 'Jun', applications: 105 },
  ];

  return (
    <div className="p-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2">
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
                    <span className={`badge badge-sm ${
                      application.status === 'approved' ? 'badge-success' :
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

        {/* Analytics Chart */}
        <div className="bg-base-100 rounded-xl shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Application Trends</h2>
              <div className="flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-500">Last 6 months</span>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="applications" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrgDashboard;