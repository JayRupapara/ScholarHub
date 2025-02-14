import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react';
import ApplicationModal from '../../components/common/ApplicationModal';

interface Scholarship {
  id: number;
  title: string;
  amount: number;
  deadline: string;
  applicants: number;
  status: 'active' | 'draft' | 'closed';
  field: string;
}

const ManageScholarships = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Sample scholarships data
  const scholarships: Scholarship[] = [
    {
      id: 1,
      title: "STEM Excellence Scholarship",
      amount: 10000,
      deadline: "2024-05-15",
      applicants: 45,
      status: "active",
      field: "Engineering"
    },
    {
      id: 2,
      title: "Creative Arts Grant",
      amount: 7500,
      deadline: "2024-05-30",
      applicants: 28,
      status: "active",
      field: "Arts"
    },
    {
      id: 3,
      title: "Future Leaders Fund",
      amount: 15000,
      deadline: "2024-06-01",
      applicants: 0,
      status: "draft",
      field: "Business"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'draft':
        return 'warning';
      case 'closed':
        return 'error';
      default:
        return 'neutral';
    }
  };

  const filteredScholarships = selectedStatus === 'all'
    ? scholarships
    : scholarships.filter(s => s.status === selectedStatus);

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Manage Scholarships</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="btn btn-primary gap-2"
        >
          <Plus className="h-4 w-4" />
          Create New
        </button>
      </div>

      {/* Filters and Search */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search scholarships..."
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
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Scholarships Table */}
      <div className="bg-base-100 rounded-xl shadow-sm overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Deadline</th>
              <th>Field</th>
              <th>Applicants</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredScholarships.map((scholarship) => (
              <tr key={scholarship.id}>
                <td>{scholarship.title}</td>
                <td>${scholarship.amount.toLocaleString()}</td>
                <td>{new Date(scholarship.deadline).toLocaleDateString()}</td>
                <td>{scholarship.field}</td>
                <td>{scholarship.applicants}</td>
                <td>
                  <span className={`badge badge-${getStatusColor(scholarship.status)} badge-sm`}>
                    {scholarship.status}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button className="btn btn-ghost btn-sm">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="btn btn-ghost btn-sm">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="btn btn-ghost btn-sm text-error">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-500">
          Showing {filteredScholarships.length} of {scholarships.length} scholarships
        </div>
        <div className="join">
          <button className="join-item btn btn-sm">Previous</button>
          <button className="join-item btn btn-sm btn-active">1</button>
          <button className="join-item btn btn-sm">2</button>
          <button className="join-item btn btn-sm">3</button>
          <button className="join-item btn btn-sm">Next</button>
        </div>
      </div>

      {/* Create/Edit Scholarship Modal */}
      <ApplicationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Create New Scholarship"
      >
        <div className="p-4">
          {/* Add scholarship form here */}
          <p>Scholarship form will go here</p>
        </div>
      </ApplicationModal>
    </div>
  );
};

export default ManageScholarships;