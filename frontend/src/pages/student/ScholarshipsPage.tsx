import React, { useState } from 'react';
import { Search, SlidersHorizontal, Heart } from 'lucide-react';
import { scholarships } from '../../data/dummyData';
import AnimatedScholarshipCard from '../../components/student/AnimatedScholarshipCard';
import ApplicationModal from '../../components/common/ApplicationModal';
import AlertMessage from '../../components/common/AlertMessage';
import { useToast } from '../../hooks/useToast';

interface Scholarship {
  id: number;
  title: string;
  amount: number;
  deadline: string;
  description: string;
  requirements: string[];
  eligibility: {
    maxIncome?: number;
    caste?: string[];
    minGPA?: number;
  };
}

const ScholarshipsPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [filters, setFilters] = useState({
    amount: '',
    deadline: '',
    income: '',
    caste: '',
  });
  const { showToast } = useToast();
  const [savedScholarships, setSavedScholarships] = useState<number[]>([]);

  const handleApply = (scholarship: Scholarship) => {
    setSelectedScholarship(scholarship);
    setShowModal(true);
  };

  const handleSaveScholarship = (scholarshipId: number) => {
    if (savedScholarships.includes(scholarshipId)) {
      setSavedScholarships(prev => prev.filter(id => id !== scholarshipId));
      showToast('Scholarship removed from saved', 'info');
    } else {
      setSavedScholarships(prev => [...prev, scholarshipId]);
      showToast('Scholarship saved successfully', 'success');
    }
  };

  // Filter options
  const amountRanges = [
    { label: 'Any', value: '' },
    { label: 'Under ₹10,000', value: '0-10000' },
    { label: '₹10,000 - ₹50,000', value: '10000-50000' },
    { label: '₹50,000 - ₹1,00,000', value: '50000-100000' },
    { label: 'Above ₹1,00,000', value: '100000-above' }
  ];

  const deadlineRanges = [
    { label: 'Any', value: '' },
    { label: 'Next 7 days', value: '7days' },
    { label: 'Next 30 days', value: '30days' },
    { label: 'Next 3 months', value: '3months' },
    { label: 'Next 6 months', value: '6months' }
  ];

  const incomeRanges = [
    { label: 'Any', value: '' },
    { label: 'Below ₹1,00,000', value: '0-100000' },
    { label: '₹1,00,000 - ₹2,50,000', value: '100000-250000' },
    { label: '₹2,50,000 - ₹5,00,000', value: '250000-500000' },
    { label: '₹5,00,000 - ₹8,00,000', value: '500000-800000' },
    { label: 'Above ₹8,00,000', value: '800000-above' }
  ];

  const casteCategories = [
    { label: 'Any', value: '' },
    { label: 'General', value: 'general' },
    { label: 'OBC', value: 'obc' },
    { label: 'SC', value: 'sc' },
    { label: 'ST', value: 'st' },
    { label: 'EWS', value: 'ews' }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Available Scholarships</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="btn btn-outline gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-base-100 rounded-xl p-4 mb-6">
        {/* Search Bar */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search scholarships..."
            className="input input-bordered w-full pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute right-3 top-3 h-5 w-5 text-base-content/50" />
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Amount Filter */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Amount</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={filters.amount}
              onChange={(e) => setFilters({ ...filters, amount: e.target.value })}
            >
              {amountRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* Deadline Filter */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Deadline</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={filters.deadline}
              onChange={(e) => setFilters({ ...filters, deadline: e.target.value })}
            >
              {deadlineRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* Income Filter */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Family Income</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={filters.income}
              onChange={(e) => setFilters({ ...filters, income: e.target.value })}
            >
              {incomeRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* Caste Filter */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={filters.caste}
              onChange={(e) => setFilters({ ...filters, caste: e.target.value })}
            >
              {casteCategories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Scholarship Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scholarships.map((scholarship) => (
          <AnimatedScholarshipCard
            key={scholarship.id}
            {...scholarship}
            onApply={() => handleApply(scholarship)}
          />
        ))}
      </div>

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

          <div className="divider">Eligibility</div>
          <div className="grid grid-cols-2 gap-4">
            {selectedScholarship?.eligibility?.maxIncome && (
              <div>
                <span className="text-sm font-medium">Maximum Family Income:</span>
                <p>₹{selectedScholarship.eligibility.maxIncome.toLocaleString()}</p>
              </div>
            )}
            {selectedScholarship?.eligibility?.minGPA && (
              <div>
                <span className="text-sm font-medium">Minimum GPA:</span>
                <p>{selectedScholarship.eligibility.minGPA}</p>
              </div>
            )}
            {selectedScholarship?.eligibility?.caste && (
              <div>
                <span className="text-sm font-medium">Eligible Categories:</span>
                <p>{selectedScholarship.eligibility.caste.join(', ')}</p>
              </div>
            )}
          </div>

          {/* Save and Apply Buttons */}
          <div className="mt-6 flex justify-between items-center">
            <button 
              className={`btn hover:bg-primary hover:text-white group ${
                savedScholarships.includes(selectedScholarship?.id || 0) 
                  ? 'btn-primary text-white' 
                  : 'btn-outline text-primary hover:border-primary'
              } gap-2`}
              onClick={() => selectedScholarship && handleSaveScholarship(selectedScholarship.id)}
            >
              <Heart 
                className={`h-5 w-5 ${
                  savedScholarships.includes(selectedScholarship?.id || 0) 
                    ? 'fill-white' 
                    : 'fill-none stroke-primary group-hover:stroke-white'
                }`}
              />
              {savedScholarships.includes(selectedScholarship?.id || 0) 
                ? 'Saved' 
                : 'Save Scholarship'}
            </button>
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

export default ScholarshipsPage; 