import React, { useState } from 'react';
import { Search, Filter, Download, Eye, CheckCircle, XCircle } from 'lucide-react';
import ApplicationModal from '../../components/common/ApplicationModal';

interface Application {
  id: number;
  studentName: string;
  scholarshipName: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  amount: number;
  studentDetails: {
    email: string;
    phone: string;
    qualification: string;
    income: number;
    caste: string;
  };
  documents: {
    name: string;
    status: 'verified' | 'pending' | 'rejected';
    url: string;
  }[];
}

const Applications = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  
  // Sample applications data
  const applications: Application[] = [
    {
      id: 1,
      studentName: "John Doe",
      scholarshipName: "STEM Excellence Scholarship",
      submittedDate: "2024-02-10",
      status: "pending",
      amount: 10000,
      studentDetails: {
        email: "john@example.com",
        phone: "1234567890",
        qualification: "12th",
        income: 250000,
        caste: "General"
      },
      documents: [
        { name: "10th Marksheet", status: "verified", url: "#" },
        { name: "12th Marksheet", status: "verified", url: "#" },
        { name: "Income Certificate", status: "pending", url: "#" },
        { name: "Caste Certificate", status: "pending", url: "#" }
      ]
    },
    {
      id: 2,
      studentName: "Jane Smith",
      scholarshipName: "Creative Arts Grant",
      submittedDate: "2024-02-08",
      status: "approved",
      amount: 7500,
      studentDetails: {
        email: "jane@example.com",
        phone: "0987654321",
        qualification: "10th",
        income: 150000,
        caste: "General"
      },
      documents: [
        { name: "10th Marksheet", status: "verified", url: "#" },
        { name: "12th Marksheet", status: "verified", url: "#" },
        { name: "Income Certificate", status: "verified", url: "#" },
        { name: "Caste Certificate", status: "verified", url: "#" }
      ]
    },
    {
      id: 3,
      studentName: "Mike Johnson",
      scholarshipName: "Global Leaders Fund",
      submittedDate: "2024-02-05",
      status: "rejected",
      amount: 15000,
      studentDetails: {
        email: "mike@example.com",
        phone: "5555555555",
        qualification: "12th",
        income: 300000,
        caste: "General"
      },
      documents: [
        { name: "10th Marksheet", status: "rejected", url: "#" },
        { name: "12th Marksheet", status: "rejected", url: "#" },
        { name: "Income Certificate", status: "rejected", url: "#" },
        { name: "Caste Certificate", status: "rejected", url: "#" }
      ]
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

  const handleViewDetails = (application: Application) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  const handleExportData = () => {
    // Convert applications data to CSV format
    const headers = [
      'Student Name',
      'Email',
      'Phone',
      'Scholarship',
      'Amount',
      'Submitted Date',
      'Status',
      'Qualification',
      'Income',
      'Category'
    ];

    const csvData = filteredApplications.map(app => [
      app.studentName,
      app.studentDetails.email,
      app.studentDetails.phone,
      app.scholarshipName,
      `₹${app.amount}`,
      new Date(app.submittedDate).toLocaleDateString(),
      app.status,
      app.studentDetails.qualification,
      `₹${app.studentDetails.income}`,
      app.studentDetails.caste
    ]);

    // Add headers to the beginning
    csvData.unshift(headers);

    // Convert to CSV string
    const csvString = csvData
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    // Create blob and download
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `scholarship_applications_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Scholarship Applications</h1>
      </div>

      {/* Status Filter */}
      <div className="flex gap-4 mb-6">
        <select 
          className="select select-bordered w-64"
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
                <td>₹{application.amount.toLocaleString()}</td>
                <td>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(application.status)}
                    <span className={`capitalize text-${getStatusColor(application.status)}`}>
                      {application.status}
                    </span>
                  </div>
                </td>
                <td>
                  <button 
                    className="btn btn-ghost btn-sm"
                    onClick={() => handleViewDetails(application)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Application Details Modal */}
      <ApplicationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Application Details"
      >
        {selectedApplication && (
          <div className="space-y-6">
            {/* Student Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Student Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{selectedApplication.studentName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{selectedApplication.studentDetails.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{selectedApplication.studentDetails.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Qualification</p>
                  <p className="font-medium">{selectedApplication.studentDetails.qualification}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Annual Income</p>
                  <p className="font-medium">₹{selectedApplication.studentDetails.income.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium">{selectedApplication.studentDetails.caste}</p>
                </div>
              </div>
            </div>

            {/* Documents Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Documents</h3>
              <div className="space-y-3">
                {selectedApplication.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                    <span className="font-medium">{doc.name}</span>
                    <div className="flex items-center gap-4">
                      <span className={`badge badge-sm ${
                        doc.status === 'verified' ? 'badge-success' :
                        doc.status === 'rejected' ? 'badge-error' :
                        'badge-warning'
                      }`}>
                        {doc.status}
                      </span>
                      <a 
                        href={doc.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-ghost btn-sm"
                      >
                        View
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2 mt-6">
              {selectedApplication.status === 'pending' && (
                <>
                  <button 
                    className="btn btn-error"
                    onClick={() => setShowModal(false)}
                  >
                    Reject
                  </button>
                  <button 
                    className="btn btn-success"
                    onClick={() => setShowModal(false)}
                  >
                    Approve
                  </button>
                </>
              )}
              <button 
                className="btn btn-ghost"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </ApplicationModal>
    </div>
  );
};

export default Applications;