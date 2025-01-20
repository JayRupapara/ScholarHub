import React from 'react';
import { useParams } from 'react-router-dom';

export function ScholarshipDetails() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4">Scholarship Details</h1>
          <p className="text-gray-600">Loading scholarship {id}...</p>
        </div>
      </div>
    </div>
  );
} 