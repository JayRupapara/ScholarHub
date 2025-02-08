'use client';

import { ScholarshipCard } from '@/app/components/search/ScholarshipCard';
import type { Scholarship } from '@/app/types/scholarship';
import { useState } from 'react';

export default function BrowsePage() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Browse Scholarships</h1>
        <p className="text-gray-600">Explore available scholarship opportunities</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading scholarships...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {scholarships.map((scholarship) => (
            <ScholarshipCard
              key={scholarship.id}
              scholarship={scholarship}
              saved={false}
            />
          ))}
          {scholarships.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500">No scholarships available at the moment</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 