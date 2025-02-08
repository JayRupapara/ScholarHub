'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { academicLevels, majors } from '@/app/data/education';
import { SearchFilters } from '@/app/components/search/SearchFilters';
import { ScholarshipCard } from '@/app/components/search/ScholarshipCard';
import type { Scholarship } from '@/app/types/scholarship';

export default function SearchPage() {
  const [filters, setFilters] = useState({
    major: '',
    academicLevel: [] as string[],
    citizenship: '',
    financialNeed: false,
    disability: false,
    location: '',
    deadline: '',
    minAmount: '',
    maxAmount: '',
  });

  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      // TODO: Implement API call with filters
      // const response = await searchScholarships(filters);
      // setScholarships(response.data);
    } catch (error) {
      console.error('Failed to fetch scholarships', error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-6">
        {/* Filters Sidebar */}
        <div className="w-64 flex-shrink-0">
          <SearchFilters filters={filters} setFilters={setFilters} onSearch={handleSearch} />
        </div>

        {/* Results */}
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Scholarships</h1>
            <p className="text-gray-600">
              {scholarships.length} opportunities found
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading scholarships...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {scholarships.map((scholarship) => (
                <ScholarshipCard
                  key={scholarship.id}
                  scholarship={scholarship}
                  saved={false}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 