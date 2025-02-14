import React from 'react';
import { Clock, Award, CheckCircle } from 'lucide-react';

export default function AppliedScholarships() {
  const appliedScholarships = [
    {
      title: "STEM Excellence Scholarship",
      amount: 10000,
      deadline: "2024-05-15",
      status: "In Progress",
      progress: 75,
      submittedDate: "2024-02-10"
    },
    {
      title: "Creative Arts Grant",
      amount: 7500,
      deadline: "2024-05-30",
      status: "Submitted",
      progress: 100,
      submittedDate: "2024-02-01"
    },
    {
      title: "Future Leaders Scholarship",
      amount: 12000,
      deadline: "2024-06-15",
      status: "Under Review",
      progress: 100,
      submittedDate: "2024-01-25"
    }
  ];

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Stats Summary - Updated with 4 columns */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-4">
            {[
              { label: "Total Applied", value: "15", color: "primary" },
              { label: "Under Review", value: "3", color: "warning" },
              { label: "Accepted", value: "5", color: "success" },
              { label: "Rejected", value: "2", color: "error" }
            ].map((stat, i) => (
              <div key={i} className="bg-base-100 rounded-xl shadow-sm p-6">
                <div className="text-sm font-medium text-gray-500">{stat.label}</div>
                <div className={`mt-2 text-3xl font-semibold text-${stat.color}`}>{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Applied Scholarships List */}
          <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Applied Scholarships</h2>
              <div className="space-y-4">
                {appliedScholarships.map((scholarship, i) => (
                  <div key={i} className="bg-base-100 border border-base-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-primary">{scholarship.title}</h3>
                        <div className="mt-2 flex items-center text-sm text-gray-500 space-x-4">
                          <div className="flex items-center">
                            <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-secondary" />
                            <span>Due {new Date(scholarship.deadline).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center">
                            <Award className="flex-shrink-0 mr-1.5 h-4 w-4 text-secondary" />
                            <span>${scholarship.amount.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="flex-shrink-0 mr-1.5 h-4 w-4 text-secondary" />
                            <span>Submitted {new Date(scholarship.submittedDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          scholarship.status === "In Progress" ? "bg-primary/10 text-primary" :
                          scholarship.status === "Under Review" ? "bg-warning/10 text-warning" :
                          "bg-success/10 text-success"
                        }`}>
                          {scholarship.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 