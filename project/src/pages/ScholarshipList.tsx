import React from 'react';
import { useLocation } from 'react-router-dom';
import { ScholarshipCard } from '../components/search/ScholarshipCard';
import { SearchFilters } from '../components/search/SearchFilters';
import { Scholarship } from '../types/scholarship';
import { AcademicLevel } from '../data/education';

interface LocationState {
  filters: {
    academicLevel: string;
    major: string;
    citizenship: string;
  };
}

export function ScholarshipList() {
  const location = useLocation();
  const { filters } = (location.state as LocationState) || { 
    filters: { academicLevel: '', major: '', citizenship: '' }
  };

  const [scholarships, setScholarships] = React.useState<Scholarship[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [searchFilters, setSearchFilters] = React.useState({
    major: filters.major || '',
    academicLevel: [] as AcademicLevel[],
    citizenship: filters.citizenship || '',
    financialNeed: false,
    disability: false,
    location: '',
    deadline: '',
    minAmount: '',
    maxAmount: '',
  });

  const handleSearch = async () => {
    setLoading(true);
    try {
      // TODO: Implement API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setScholarships([]); // Replace with actual API response
    } catch (error) {
      console.error('Failed to fetch scholarships', error);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          <div className="w-64 flex-shrink-0">
            <SearchFilters 
              filters={searchFilters} 
              setFilters={setSearchFilters} 
              onSearch={handleSearch} 
            />
          </div>

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
                  />
                ))}
                {scholarships.length === 0 && !loading && (
                  <div className="text-center py-12 text-gray-500">
                    No scholarships found matching your criteria
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 