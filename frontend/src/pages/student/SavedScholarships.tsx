import React, { useState, useEffect } from 'react';
import AnimatedScholarshipCard from '../../components/student/AnimatedScholarshipCard';
import ApplicationModal from '../../components/common/ApplicationModal';
import { Bookmark, Trash2 } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import axios from 'axios';

interface Scholarship {
  _id: string;
  scholarshipName: string;
  Amount: number;
  PaymentMethods: string;
  duration: string;
  eligibilityRequirements: {
    academic: any;
    maxIncome: number;
    disability: boolean;
    category: string[];
    otherRequirements: string;
  };
  lastDate: string;
  sahayType: string;
}

const SavedScholarships = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [savedScholarships, setSavedScholarships] = useState<Scholarship[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchSavedScholarships = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/savedScholarships', { withCredentials: true });
        setSavedScholarships(response.data.savedScholarships || []); // Fallback to empty array if undefined
      } catch (error) {
        console.error('Error fetching saved scholarships:', error);
      }
    };

    fetchSavedScholarships();
  }, []);

  const handleApply = (scholarship: Scholarship) => {
    setSelectedScholarship(scholarship);
    setShowModal(true);
  };

  const handleRemoveScholarship = (scholarshipId: string) => {
    setSavedScholarships(prev => prev.filter(s => s._id !== scholarshipId));
    setShowModal(false);
    showToast('Scholarship removed from saved', 'info');
  };

  return (
    <div className="p-6">
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
              key={scholarship._id}
              title={scholarship.scholarshipName}
              amount={scholarship.Amount}
              deadline={new Date(scholarship.lastDate).toLocaleDateString()}
              onApply={() => handleApply(scholarship)}
              description={scholarship.eligibilityRequirements.otherRequirements}
              requirements={scholarship.eligibilityRequirements}
            />
          ))}
        </div>
      )}

      {/* Application Modal */}
      <ApplicationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedScholarship?.scholarshipName || ''}
      >
        <div className="space-y-4">
          <p>Amount: ₹{selectedScholarship?.Amount}</p>
          <p>Payment Methods: {selectedScholarship?.PaymentMethods}</p>
          <p>Duration: {selectedScholarship?.duration}</p>
          <p>Sahay Type: {selectedScholarship?.sahayType}</p>

          <div className="divider">Eligibility Requirements</div>
          <ul className="list-disc list-inside">
            <li>Max Income: ₹{selectedScholarship?.eligibilityRequirements.maxIncome}</li>
            <li>Disability: {selectedScholarship?.eligibilityRequirements.disability ? 'Yes' : 'No'}</li>
            <li>Categories: {selectedScholarship?.eligibilityRequirements.category.join(', ')}</li>
            <li>Other: {selectedScholarship?.eligibilityRequirements.otherRequirements}</li>
          </ul>

          {/* Delete Button */}
          <div className="mt-6 flex justify-between items-center">
            <button
              className="btn hover:bg-primary hover:text-white btn-outline text-primary hover:border-primary gap-2"
              onClick={() => selectedScholarship && handleRemoveScholarship(selectedScholarship._id)}
            >
              <Trash2 className="h-5 w-5" />
              Remove from Saved
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </ApplicationModal>
    </div>
  );
};

export default SavedScholarships; 