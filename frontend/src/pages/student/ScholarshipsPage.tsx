import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Heart } from 'lucide-react';
import AnimatedScholarshipCard from '../../components/student/AnimatedScholarshipCard';
import ApplicationModal from '../../components/common/ApplicationModal';
import { useToast } from '../../hooks/useToast';
import axios from 'axios';
import toast from 'react-hot-toast';

interface ApplicationFormData {
  fullName: string;
  email: string;
  phone: string;
  qualification: string;
  income: number;
  caste: string;
  documents: {
    name: string;
    isSelected: boolean;
  }[];
}

interface Scholarship {
  _id: string;
  scholarshipName: string;
  Amount: number;
  PaymentMethods: string;
  duration: string;
  eligibilityRequirements: {
    academic: any; // Define this based on your actual data structure
    maxIncome: number;
    disability: boolean;
    category: string[];
    otherRequirements: string;
  };
  lastDate: string;
  sahayType: string;
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
  const [savedScholarships, setSavedScholarships] = useState<string[]>([]);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationData, setApplicationData] = useState<ApplicationFormData>({
    fullName: '',
    email: '',
    phone: '',
    qualification: '',
    income: 0,
    caste: '',
    documents: [
      { name: '10th Marksheet', isSelected: false },
      { name: '12th Marksheet', isSelected: false },
      { name: 'Income Certificate', isSelected: false },
      { name: 'Caste Certificate', isSelected: false },
      { name: 'Aadhar Card', isSelected: false }
    ]
  });
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/getScholarships?page=${currentPage}`, { withCredentials: true });
        setScholarships(response.data.scholarships); // Assuming the response contains an object with scholarships
        setTotalPages(response.data.totalPages); // Assuming the response contains total pages
      } catch (error) {
        console.error('Error fetching scholarships:', error);
      }
    };

    fetchScholarships();
  }, [currentPage]);

  const handleApply = (scholarship: Scholarship) => {
    setSelectedScholarship(scholarship);
    setShowModal(true);
  };

  const handleSaveScholarship = (scholarshipId: string) => {
    if (savedScholarships.includes(scholarshipId)) {
      setSavedScholarships(prev => prev.filter(id => id !== scholarshipId));
      showToast('Scholarship removed from saved', 'info');
    } else {
      setSavedScholarships(prev => [...prev, scholarshipId]);
      showToast('Scholarship saved successfully', 'success');
    }
  };

  const handleStartApplication = (p0: Scholarship) => {
    const requiredDocs = [
      { name: '10th Marksheet', isSelected: false },
      { name: '12th Marksheet', isSelected: false },
      { name: 'Income Certificate', isSelected: false },
      { name: 'Caste Certificate', isSelected: false },
      { name: 'Aadhar Card', isSelected: false }
    ];

    setApplicationData(prev => ({
      ...prev,
      documents: requiredDocs
    }));
    setShowApplicationModal(true);
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedDocuments = applicationData.documents.filter(doc => doc.isSelected).map(doc => doc.name);
    // console.log('Submitting application:', { ...applicationData, documents: selectedDocuments });
    try {
      const response = await axios.post('http://localhost:5000/api/users/applyScholarship', {
        scholarshipId: selectedScholarship?._id,
        documents: selectedDocuments
      }, { withCredentials: true });

      if(response.data.success) {
        setShowApplicationModal(false);
        showToast("Applied successfully");
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      showToast('Failed to submit application. Please try again.', 'error');
    }
    setShowApplicationModal(false);
    showToast('Application submitted successfully!', 'success');
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

  // Function to filter scholarships based on search query and filters
  const filteredScholarships = scholarships.filter((scholarship) => {
    const matchesSearchQuery = scholarship.scholarshipName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesAmountFilter = filters.amount
      ? scholarship.Amount >= parseInt(filters.amount.split('-')[0]) &&
      (filters.amount.split('-')[1] === 'above' || scholarship.Amount <= parseInt(filters.amount.split('-')[1]))
      : true;

    const matchesDeadlineFilter = filters.deadline
      ? new Date(scholarship.lastDate) <= new Date(Date.now() + parseInt(filters.deadline) * 24 * 60 * 60 * 1000)
      : true;

    const matchesIncomeFilter = filters.income
      ? scholarship.eligibilityRequirements.maxIncome >= parseInt(filters.income.split('-')[0]) &&
      (filters.income.split('-')[1] === 'above' || scholarship.eligibilityRequirements.maxIncome <= parseInt(filters.income.split('-')[1]))
      : true;

    const matchesCasteFilter = filters.caste
      ? scholarship.eligibilityRequirements.category.includes(filters.caste)
      : true;

    return (
      matchesSearchQuery &&
      matchesAmountFilter &&
      matchesDeadlineFilter &&
      matchesIncomeFilter &&
      matchesCasteFilter
    );
  });

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
        {filteredScholarships.map((scholarship) => (
          <><AnimatedScholarshipCard
            key={scholarship._id}
            title={scholarship.scholarshipName}
            amount={scholarship.Amount}
            deadline={new Date(scholarship.lastDate).toLocaleDateString()}
            onApply={async () => {
              await axios.post('http://localhost:5000/api/users/addScholarshipToUser', { scholarshipId: scholarship._id }, { withCredentials: true });
              handleApply(scholarship);
            }}
            description={''}
            requirements={scholarship.eligibilityRequirements}
          /><ApplicationModal
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

                {/* Save and Apply Buttons */}
                <div className="mt-6 flex justify-between items-center">
                  <button
                    className={`btn hover:bg-primary hover:text-white group ${savedScholarships.includes(selectedScholarship?._id || '')
                      ? 'btn-primary text-white'
                      : 'btn-outline text-primary hover:border-primary'} gap-2`}
                    onClick={() => selectedScholarship && handleSaveScholarship(selectedScholarship._id)}
                  >
                    <Heart
                      className={`h-5 w-5 ${savedScholarships.includes(selectedScholarship?._id || '')
                        ? 'fill-white'
                        : 'fill-none stroke-primary group-hover:stroke-white'}`} />
                    {savedScholarships.includes(selectedScholarship?._id || '')
                      ? 'Saved'
                      : 'Save Scholarship'}
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleStartApplication(selectedScholarship!)}
                  >
                    Start Application
                  </button>
                </div>
              </div>
            </ApplicationModal></>
        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center mt-6">
        <button
          className="btn btn-outline mr-2"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="self-center">Page {currentPage} of {totalPages}</span>
        <button
          className="btn btn-outline ml-2"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Application Form Modal */}
      <ApplicationModal
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
        title="Scholarship Application"
      >
        <form onSubmit={handleSubmitApplication}>
          {/* Personal Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={applicationData.fullName}
                  onChange={(e) => setApplicationData(prev => ({
                    ...prev,
                    fullName: e.target.value
                  }))}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  value={applicationData.email}
                  onChange={(e) => setApplicationData(prev => ({
                    ...prev,
                    email: e.target.value
                  }))}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="tel"
                  className="input input-bordered w-full"
                  value={applicationData.phone}
                  onChange={(e) => setApplicationData(prev => ({
                    ...prev,
                    phone: e.target.value
                  }))}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Highest Qualification</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={applicationData.qualification}
                  onChange={(e) => setApplicationData(prev => ({
                    ...prev,
                    qualification: e.target.value
                  }))}
                  required
                >
                  <option value="">Select Qualification</option>
                  <option value="10th">10th</option>
                  <option value="12th">12th</option>
                  <option value="UG">Undergraduate</option>
                  <option value="PG">Postgraduate</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Annual Family Income</span>
                </label>
                <input
                  type="number"
                  className="input input-bordered w-full"
                  value={applicationData.income}
                  onChange={(e) => setApplicationData(prev => ({
                    ...prev,
                    income: Number(e.target.value)
                  }))}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Category</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={applicationData.caste}
                  onChange={(e) => setApplicationData(prev => ({
                    ...prev,
                    caste: e.target.value
                  }))}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="EWS">EWS</option>
                </select>
              </div>
            </div>
          </div>

          {/* Document Selection Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Required Documents</h3>
            <div className="grid grid-cols-2 gap-4">
              {applicationData.documents.map((doc, index) => (
                <div key={index} className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">{doc.name}</span>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      checked={doc.isSelected}
                      onChange={(e) => {
                        const newDocs = [...applicationData.documents];
                        newDocs[index] = {
                          ...newDocs[index],
                          isSelected: e.target.checked
                        };
                        setApplicationData(prev => ({
                          ...prev,
                          documents: newDocs
                        }));
                      }}
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => setShowApplicationModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-sm"
            >
              Submit Application
            </button>
          </div>
        </form>
      </ApplicationModal>
    </div>
  );
};

export default ScholarshipsPage; 