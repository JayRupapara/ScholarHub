import React from 'react';
import { ScholarshipApplication, ApplicationStatus } from '../../types/dashboard';

const DUMMY_APPLICATIONS: ScholarshipApplication[] = [
  {
    id: '1',
    scholarshipId: '123',
    scholarship: {
      id: '123',
      title: 'STEM Excellence Scholarship',
      amount: 5000,
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
      description: 'For outstanding STEM students'
    },
    userId: '1',
    status: 'in_progress',
    documents: [],
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString()
  },
  {
    id: '2',
    scholarshipId: '456',
    scholarship: {
      id: '456',
      title: 'Future Leaders Grant',
      amount: 10000,
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10).toISOString(),
      description: 'Supporting future leaders'
    },
    userId: '1',
    status: 'submitted',
    documents: [
      { name: 'Resume', url: '#', type: 'pdf' },
      { name: 'Essay', url: '#', type: 'doc' }
    ],
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10).toISOString()
  }
];

export function Applications() {
  const [applications, setApplications] = React.useState<ScholarshipApplication[]>(DUMMY_APPLICATIONS);
  const [loading, setLoading] = React.useState(false);

  const statusColors: Record<ApplicationStatus, { bg: string; text: string }> = {
    draft: { bg: 'bg-gray-100', text: 'text-gray-800' },
    in_progress: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    submitted: { bg: 'bg-blue-100', text: 'text-blue-800' },
    awarded: { bg: 'bg-green-100', text: 'text-green-800' },
    rejected: { bg: 'bg-red-100', text: 'text-red-800' }
  };

  React.useEffect(() => {
    // TODO: Fetch applications
    setLoading(false);
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
        <p className="text-gray-600">Track and manage your scholarship applications</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading applications...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {applications.map((application) => (
            <div key={application.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {application.scholarship.title}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusColors[application.status].bg
                  } ${statusColors[application.status].text}`}
                >
                  {application.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Last updated: {new Date(application.lastUpdated).toLocaleDateString()}</span>
                <span>Deadline: {new Date(application.deadline).toLocaleDateString()}</span>
              </div>

              <div className="mt-4 flex justify-end space-x-4">
                <button className="text-indigo-600 hover:text-indigo-500">
                  View Details
                </button>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                  Continue Application
                </button>
              </div>
            </div>
          ))}
          {applications.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500">No applications yet</p>
              <a
                href="/search"
                className="mt-4 inline-block text-indigo-600 hover:text-indigo-500"
              >
                Find Scholarships
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 