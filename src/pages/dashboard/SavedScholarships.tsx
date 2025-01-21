import React from 'react';
import { ScholarshipCard } from '../../components/search/ScholarshipCard';
import { Scholarship } from '../../types/scholarship';

export function SavedScholarships() {
  const [savedScholarships, setSavedScholarships] = React.useState<Scholarship[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // TODO: Fetch saved scholarships
    setLoading(false);
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Saved Scholarships</h1>
        <p className="text-gray-600">Track scholarships you're interested in</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading saved scholarships...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {savedScholarships.map((scholarship) => (
            <ScholarshipCard
              key={scholarship.id}
              scholarship={scholarship}
              saved
            />
          ))}
          {savedScholarships.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-500">No saved scholarships yet</p>
              <a
                href="/search"
                className="mt-4 inline-block text-indigo-600 hover:text-indigo-500"
              >
                Browse Scholarships
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 