// Route: /scholarships/[id]
'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import type { Scholarship } from '@/app/types/scholarship';

export default function ScholarshipDetailsPage() {
  const params = useParams();
  const [scholarship, setScholarship] = useState<Scholarship | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        // TODO: Implement API call
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch scholarship details', error);
        setLoading(false);
      }
    };

    fetchScholarship();
  }, [params.id]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading scholarship details...</p>
      </div>
    );
  }

  if (!scholarship) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Scholarship not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">{scholarship.title}</h1>
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Award Amount</h2>
            <p className="text-indigo-600 text-xl font-bold">
              ${scholarship.amount.toLocaleString()}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{scholarship.description}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Deadline</h2>
            <p className="text-gray-600">
              {new Date(scholarship.deadline).toLocaleDateString()}
            </p>
          </div>

          <div className="flex justify-end space-x-4">
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              Save for Later
            </button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 