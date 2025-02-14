import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { scholarships } from '../data/dummyData';
import AnimatedScholarshipCard from '../components/AnimatedScholarshipCard';
import ApplicationModal from '../components/ApplicationModal';
import AlertMessage from '../components/AlertMessage';

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

const ScholarshipsPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [filters, setFilters] = useState({
    amount: 'all',
    field: 'all',
    deadline: 'all',
  });

  const handleApply = (scholarship: Scholarship) => {
    setSelectedScholarship(scholarship);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Available Scholarships</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="btn btn-ghost gap-2"
        >
          <SlidersHorizontal className="h-5 w-5" />
          Filters
        </button>
      </div>

      {/* Updated Search Section */}
      <div className="mt-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search scholarships..."
            className="input input-bordered w-full pr-16"
          />
          <button className="btn btn-primary absolute top-0 right-0 rounded-l-none">
            <Search className="h-5 w-5" />
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <select
              value={filters.amount}
              onChange={(e) => setFilters({...filters, amount: e.target.value})}
              className="select select-bordered w-full"
            >
              <option value="all">Amount (Any)</option>
              <option value="0-5000">$0 - $5,000</option>
              <option value="5000-10000">$5,000 - $10,000</option>
              <option value="10000+">$10,000+</option>
            </select>

            <select
              value={filters.field}
              onChange={(e) => setFilters({...filters, field: e.target.value})}
              className="select select-bordered w-full"
            >
              <option value="all">Field of Study (Any)</option>
              <option value="engineering">Engineering</option>
              <option value="business">Business</option>
              <option value="arts">Arts</option>
              <option value="medicine">Medicine</option>
              <option value="computer-science">Computer Science</option>
            </select>

            <select
              value={filters.deadline}
              onChange={(e) => setFilters({...filters, deadline: e.target.value})}
              className="select select-bordered w-full"
            >
              <option value="all">Deadline (Any)</option>
              <option value="1month">Within 1 month</option>
              <option value="3months">Within 3 months</option>
              <option value="6months">Within 6 months</option>
            </select>
          </div>
        )}
      </div>

      {/* Scholarship Cards */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
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

export default ScholarshipsPage; 