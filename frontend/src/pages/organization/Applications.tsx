import React, { useState } from 'react';
import { Search, Filter, Download, Eye, CheckCircle, XCircle } from 'lucide-react';

interface Application {
  id: number;
  studentName: string;
  scholarshipName: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  amount: number;
}

const Applications = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  // Sample applications data
  const applications: Application[] = [
    {
      id: 1,
      studentName: "John Doe",
      scholarshipName: "STEM Excellence Scholarship",
      submittedDate: "2024-02-10",
      status: "pending",
      amount: 10000
    },
    {
      id: 2,
      studentName: "Jane Smith",
      scholarshipName: "Creative Arts Grant",
      submittedDate: "2024-02-08",
      status: "approved",
      amount: 7500
    },
    {
      id: 3,
      studentName: "Mike Johnson",
      scholarshipName: "Global Leaders Fund",
      submittedDate: "2024-02-05",
      status: "rejected",
      amount: 15000
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'warning';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-error" />;
      default:
        return <Eye className="h-5 w-5 text-warning" />;
    }
  };

  const filteredApplications = selectedStatus === 'all'
    ? applications
    : applications.filter(app => app.status === selectedStatus);

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Scholarship Applications</h1>
        <button className="btn btn-outline btn-primary gap-2">
          <Download className="h-4 w-4" />
          Export Data
        </button>
      </div>

      {/* Filters and Search */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search applications..."
            className="input input-bordered w-full"
          />
          <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
        </div>

        <select 
          className="select select-bordered w-full"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Applications Table */}
      <div className="bg-base-100 rounded-xl shadow-sm overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Student</th>
              <th>Scholarship</th>
              <th>Submitted</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((application) => (
              <tr key={application.id}>
                <td>{application.studentName}</td>
                <td>{application.scholarshipName}</td>
                <td>{new Date(application.submittedDate).toLocaleDateString()}</td>
                <td>${application.amount.toLocaleString()}</td>
                <td>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(application.status)}
                    <span className={`capitalize text-${getStatusColor(application.status)}`}>
                      {application.status}
                    </span>
                  </div>
                </td>
                <td>
                  <button className="btn btn-ghost btn-sm">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-500">
          Showing {filteredApplications.length} of {applications.length} applications
        </div>
        <div className="join">
          <button className="join-item btn btn-sm">Previous</button>
          <button className="join-item btn btn-sm btn-active">1</button>
          <button className="join-item btn btn-sm">2</button>
          <button className="join-item btn btn-sm">3</button>
          <button className="join-item btn btn-sm">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Applications;