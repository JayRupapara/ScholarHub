import React, { useState } from 'react';
import { scholarships } from '../../data/dummyData';
import AnimatedScholarshipCard from '../../components/student/AnimatedScholarshipCard';
import ApplicationModal from '../../components/common/ApplicationModal';
import { Bookmark } from 'lucide-react';

interface Scholarship {
  id: number;
  title: string;
  amount: number;
  deadline: string;
  description: string;
  requirements: string[];
  field: string;
  status: string;
  progress: number;
  university: string;
  location: string;
}

const SavedScholarships = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);

  // For demo, we'll show first 3 scholarships as saved
  const savedScholarships = scholarships.slice(0, 3);

  const handleApply = (scholarship: Scholarship) => {
    setSelectedScholarship(scholarship);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Saved Scholarships</h1>
        <div className="bg-base-100 shadow-sm rounded-lg px-4 py-2">
          <span className="text-4xl font-bold text-primary mr-2">
            {savedScholarships.length}
          </span>
          <span className="text-base-content/70">
            Out of {scholarships.length} available
          </span>
        </div>
      </div>

      {savedScholarships.length === 0 ? (
        <div className="text-center py-12">
          <div className="flex flex-col items-center gap-4">
            <Bookmark className="h-16 w-16 text-gray-400" />
            <p className="text-gray-500">You haven't saved any scholarships yet.</p>
            <button className="btn btn-primary">
              Browse Scholarships
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {savedScholarships.map((scholarship) => (
            <AnimatedScholarshipCard
              key={scholarship.id}
              {...scholarship}
              onApply={() => handleApply(scholarship)}
            />
          ))}
        </div>
      )}

      {/* Application Modal */}
      <ApplicationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedScholarship?.title || ''}
      >
        <div className="space-y-4">
          <p>{selectedScholarship?.description}</p>
          <div className="divider">Requirements</div>
          <ul className="list-disc list-inside">
            {selectedScholarship?.requirements?.map((req, idx) => (
              <li key={idx}>{req}</li>
            ))}
          </ul>
          <div className="mt-4 flex justify-end">
            <button 
              className="btn btn-primary"
              onClick={() => setShowModal(false)}
            >
              Start Application
            </button>
          </div>
        </div>
      </ApplicationModal>
    </div>
  );
};

export default SavedScholarships; 