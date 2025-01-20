import React from 'react';
import { Scholarship } from '../../types/scholarship';

interface ScholarshipCardProps {
  scholarship: Scholarship;
  saved: boolean;
}

export function ScholarshipCard({ scholarship, saved }: ScholarshipCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {scholarship.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {scholarship.description}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {/* ... tags ... */}
          </div>
        </div>
        <div className="flex flex-col sm:items-end gap-2">
          <p className="text-xl font-bold text-indigo-600">
            ${scholarship.amount.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">
            Deadline: {new Date(scholarship.deadline).toLocaleDateString()}
          </p>
          <div className="flex gap-2 mt-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Apply Now
            </button>
            <button className="flex-1 sm:flex-none px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 