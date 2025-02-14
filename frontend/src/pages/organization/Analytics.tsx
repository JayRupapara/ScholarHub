import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Award, DollarSign } from 'lucide-react';

const Analytics = () => {
  // Sample data for charts
  const applicationData = [
    { month: 'Jan', applications: 65 },
    { month: 'Feb', applications: 85 },
    { month: 'Mar', applications: 73 },
    { month: 'Apr', applications: 95 },
    { month: 'May', applications: 120 },
    { month: 'Jun', applications: 102 },
  ];

  const stats = [
    {
      title: "Total Applications",
      value: "1,284",
      change: "+12.5%",
      icon: Users,
      color: "primary"
    },
    {
      title: "Acceptance Rate",
      value: "68%",
      change: "+4.2%",
      icon: TrendingUp,
      color: "success"
    },
    {
      title: "Active Scholarships",
      value: "24",
      change: "+2",
      icon: Award,
      color: "warning"
    },
    {
      title: "Total Awarded",
      value: "$284K",
      change: "+$24K",
      icon: DollarSign,
      color: "info"
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

      {/* Applications Chart */}
      <div className="bg-base-100 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-6">Application Trends</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={applicationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="applications" fill="#226597" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Analytics Sections */}
      <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-2">
        {/* Demographics */}
        <div className="bg-base-100 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Applicant Demographics</h2>
          {/* Add demographic charts/stats here */}
        </div>

        {/* Popular Scholarships */}
        <div className="bg-base-100 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Popular Scholarships</h2>
          {/* Add popular scholarships list here */}
        </div>
      </div>
    </div>
  );
};

export default Analytics;