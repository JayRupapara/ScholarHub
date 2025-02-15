import axios from 'axios';
import { Users, Award, BarChart2, } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const OrgDashboard = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/organization/applications");
  }
  // Sample data

  // const [totalApplication, setTotalApplication] = useState(0);
  // const [activeScholarships, setActiveScholarships] = useState(0);
  const [stats, setStats] = useState([
    {
      title: "Total Applications",
      value: 0,
      icon: Users,
      color: "primary"
    },
    {
      title: "Active Scholarships",
      value: 0,
      icon: Award,
      color: "secondary"
    }
  ]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [analyticsData, setAnalyticsData] = useState([{ name: 'Jan', applications: 65 },
  { name: 'Feb', applications: 85 },
  { name: 'Mar', applications: 72 },
  { name: 'Apr', applications: 99 },
  { name: 'May', applications: 87 },
  { name: 'Jun', applications: 105 },]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const statsResponse = await axios.get('http://localhost:5000/api/organization/getDashboard', { withCredentials: true });
        console.log(statsResponse);
        const statsData = statsResponse.data;
        setRecentApplications(statsData.recentApplications);
        setAnalyticsData(analyticsData);
        setActiveScholarships(statsData.activeScholarships)
        setTotalApplication(statsData.totalApplication);

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 mb-6 sm:grid-cols-2">
        {stats.map((stat, index) => (
          <div key={index} className="bg-base-100 rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className={`p-2 rounded-lg bg-${stat.color}-200`}>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold">{stat.value}</p>
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
              <button className="btn btn-ghost btn-sm" onClick={handleClick}>View All</button>
            </div>
            <div className="space-y-4">
              {recentApplications && recentApplications.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500 text-center">No recent applications available</p>
                </div>
              ) : (
                recentApplications && recentApplications.map((application) => (
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
                ))
              )}
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