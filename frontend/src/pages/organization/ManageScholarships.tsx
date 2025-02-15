import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import ApplicationModal from '../../components/common/ApplicationModal';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Scholarship {
  id: number;
  title: string;
  amount: number | null;
  deadline: string;
  status: 'active' | 'draft' | 'closed';
  description: string;
  requirements: string[];
}

// Add new interface for document requirements
interface DocumentRequirement {
  id: string;
  name: string;
  required: boolean;
  otherDetails?: Array<any>;
}

const ManageScholarships = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    scholarshipName: '',
    amount: '',
    maxIncome: '',
    disability: 'no',
    minPercentage: '',
    highestQualification: '',
    category: '',
    otherRequirements: '',
    description: '',
    lastDate: '',
    duration: '',
    sahayType: '',
  });
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [documentRequirements, setDocumentRequirements] = useState<DocumentRequirement[]>([
    { id: '10th', name: '10th Result', required: false },
    { id: '12th', name: '12th Result', required: false },
    { id: 'income', name: 'Income Certificate', required: false },
    { id: 'ews', name: 'EWS Certificate', required: false },
    { id: 'caste', name: 'Caste Certificate', required: false },
    { id: 'aadhar', name: 'Aadhar Card', required: false },
    { id: 'pan', name: 'PAN Card', required: false },
    { id: 'other', name: 'Other Documents', required: false, otherDetails: [] },
  ]);
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/organization/getScholarships', { withCredentials: true });
        // Transform the data to ensure all required fields exist
        console.log(response.data)
        const transformedData = response.data.map((scholarship: any) => ({
          id: scholarship.id,
          title: scholarship.scholarshipID.scholarshipName || 'Untitled',
          amount: scholarship.scholarshipID.Amount || 0,
          deadline: scholarship.scholarshipID.deadline || new Date().toISOString(),
          status: scholarship.scholarshipID.status || 'draft',
          description: scholarship.description || '',
          requirements: scholarship.requirements || []
        }));
        setScholarships(transformedData);
      } catch (error) {
        toast.error('Failed to fetch scholarships. Please try again later.');
        console.error(error);
      }
    };

    fetchScholarships();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'draft':
        return 'warning';
      case 'closed':
        return 'error';
      default:
        return 'neutral';
    }
  };

  const filteredScholarships = selectedStatus === 'all'
    ? scholarships
    : scholarships.filter(s => s.status === selectedStatus);

  const handleCreateOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setShowDocumentModal(true);
  };

  const handleDocumentSubmit = () => {
    console.log('Selected documents:', documentRequirements.filter(doc => doc.required));
    setShowDocumentModal(false);
    setShowModal(false);
    setFormData({
      scholarshipName: '',
      amount: '',
      maxIncome: '',
      disability: 'no',
      minPercentage: '',
      highestQualification: '',
      category: '',
      otherRequirements: '',
      description: '',
      lastDate: '',
      duration: '',
      sahayType: '',
    });
    setIsEditing(false);
  };

  const handleDocumentChange = (id: string, checked: boolean) => {
    setDocumentRequirements(prev =>
      prev.map(doc =>
        doc.id === id ? { ...doc, required: checked } : doc
      )
    );
  };

  const handleOtherDetailsChange = (index: number, value: string) => {
    setDocumentRequirements(prev =>
      prev.map(doc =>
        doc.id === 'other'
          ? {
            ...doc,
            otherDetails: doc.otherDetails?.map((detail, i) =>
              i === index ? value : detail
            ) || []
          }
          : doc
      )
    );
  };

  const handleAddOtherDocument = () => {
    setDocumentRequirements(prev =>
      prev.map(doc =>
        doc.id === 'other'
          ? {
            ...doc,
            otherDetails: [...(doc.otherDetails || []), '']
          }
          : doc
      )
    );
  };

  const handleRemoveOtherDocument = (index: number) => {
    setDocumentRequirements(prev =>
      prev.map(doc =>
        doc.id === 'other'
          ? {
            ...doc,
            otherDetails: doc.otherDetails?.filter((_, i) => i !== index) || []
          }
          : doc
      )
    );
  };

    useEffect(() => {
        const fetchScholarshipDetails = async (id: string) => {
            try {
                const response = await axios.get(`http://localhost:5000/api/scholarship/${id}`, { withCredentials: true });
                const scholarshipData = response.data;
                setFormData({
                    scholarshipName: scholarshipData.scholarshipName,
                    amount: scholarshipData.amount?.toString() || '',
                    maxIncome: '',
                    disability: 'no',
                    minPercentage: '',
                    highestQualification: '',
                    category: '',
                    otherRequirements: scholarshipData.eligibilityRequirements?.join('\n') || '',
                    description: scholarshipData.description || '',
                    lastDate: scholarshipData.lastDate,
                    duration: scholarshipData.duration || '',
                    sahayType: scholarshipData.sahayType || '',
                });
            } catch (error) {
                console.error("Error fetching scholarship details:", error);
            }
        };
      });
 

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this scholarship?')) {
      // Handle delete logic here
      console.log('Deleting scholarship:', id);
    }
  };

  return (
    <div className="p-6">
      <ToastContainer />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Manage Scholarships</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            setIsEditing(false);
            setShowModal(true);
          }}
        >
          <Plus className="h-4 w-4" />
          Create New
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search scholarships..."
            className="input input-bordered w-full pr-10"
          />
          <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
        </div>
        <select
          className="select select-bordered w-64"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Scholarships Table */}
      <div className="bg-base-100 rounded-xl shadow-sm overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredScholarships.map((scholarship) => (
              <tr key={scholarship.id}>
                <td>{scholarship.title || 'Untitled'}</td>
                <td>
                  {typeof scholarship.amount === 'number'
                    ? `₹${scholarship.amount.toLocaleString()}`
                    : '₹0'}
                </td>
                <td>
                  {scholarship.deadline
                    ? new Date(scholarship.deadline).toLocaleDateString()
                    : 'No deadline'}
                </td>
                <td>
                  <span className={`badge badge-${getStatusColor(scholarship.status || 'draft')}`}>
                    {scholarship.status || 'draft'}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => handleEdit(scholarship)}
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      className="btn btn-ghost btn-sm text-error"
                      onClick={() => handleDelete(scholarship.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create/Edit Scholarship Modal */}
      <ApplicationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={isEditing ? "Edit Scholarship" : "Create New Scholarship"}
      >
        <form onSubmit={handleCreateOrUpdate} className="space-y-4">
          <div className="space-y-4">
            {/* Row 1: Name and Amount */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Scholarship Name</label>
                <input
                  type="text"
                  className="input input-bordered input-sm w-full"
                  value={formData.scholarshipName}
                  onChange={(e) => setFormData({ ...formData, scholarshipName: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Amount (₹)</label>
                <input
                  type="number"
                  className="input input-bordered input-sm w-full"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Row 2: Income and Percentage */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Max Family Income (₹)</label>
                <input
                  type="number"
                  className="input input-bordered input-sm w-full"
                  value={formData.maxIncome}
                  onChange={(e) => setFormData({ ...formData, maxIncome: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Min Academic %</label>
                <input
                  type="number"
                  className="input input-bordered input-sm w-full"
                  value={formData.minPercentage}
                  onChange={(e) => setFormData({ ...formData, minPercentage: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Row 3: Qualification, Category and Disability */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm mb-1">Qualification</label>
                <select
                  className="select select-bordered select-sm w-full"
                  value={formData.highestQualification}
                  onChange={(e) => setFormData({ ...formData, highestQualification: e.target.value })}
                  required
                >
                  <option value="">Select</option>
                  <option value="10th">10th</option>
                  <option value="12th">12th</option>
                  <option value="ug">UG</option>
                  <option value="pg">PG</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Category</label>
                <select
                  className="select select-bordered select-sm w-full"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                >
                  <option value="">Select</option>
                  <option value="general">General</option>
                  <option value="sc">SC</option>
                  <option value="st">ST</option>
                  <option value="obc">OBC</option>
                  <option value="ews">EWS</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Disability</label>
                <select
                  className="select select-bordered select-sm w-full"
                  value={formData.disability}
                  onChange={(e) => setFormData({ ...formData, disability: e.target.value })}
                  required
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
            </div>

            {/* Row 4: Duration, Type and Last Date */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm mb-1">Duration</label>
                <select
                  className="select select-bordered select-sm w-full"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  required
                >
                  <option value="">Select</option>
                  <option value="onetime">One Time</option>
                  <option value="renewable">Renewable</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Sahay Type</label>
                <select
                  className="select select-bordered select-sm w-full"
                  value={formData.sahayType}
                  onChange={(e) => setFormData({ ...formData, sahayType: e.target.value })}
                  required
                >
                  <option value="">Select</option>
                  <option value="lumpsum">Lumpsum</option>
                  <option value="installments">Installments</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-1">Last Date</label>
                <input
                  type="date"
                  className="input input-bordered input-sm w-full"
                  value={formData.lastDate}
                  onChange={(e) => setFormData({ ...formData, lastDate: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Row 5: Other Requirements */}
            <div>
              <label className="block text-sm mb-1">Other Requirements</label>
              <textarea
                className="textarea textarea-bordered w-full h-16 text-sm"
                value={formData.otherRequirements}
                onChange={(e) => setFormData({ ...formData, otherRequirements: e.target.value })}
                placeholder="Enter any additional requirements"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-sm btn-primary">
              {isEditing ? 'Update' : 'Create'} Scholarship
            </button>
          </div>
        </form>
      </ApplicationModal>

      {/* Document Selection Modal */}
      <ApplicationModal
        isOpen={showDocumentModal}
        onClose={() => setShowDocumentModal(false)}
        title="Select Required Documents"
      >
        <div className="p-4">
          <p className="text-sm text-gray-600 mb-4">
            Select the documents that students need to upload for this scholarship:
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {documentRequirements.map(doc => (
              <div key={doc.id} className="flex flex-col">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={doc.required}
                    onChange={(e) => handleDocumentChange(doc.id, e.target.checked)}
                  />
                  <span className="text-sm">{doc.name}</span>
                </label>
                {doc.id === 'other' && doc.required && (
                  <div className="mt-2 space-y-2">
                    {doc.otherDetails?.map((detail, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          className="input input-bordered input-sm flex-1"
                          placeholder="Specify other document"
                          value={detail}
                          onChange={(e) => handleOtherDetailsChange(index, e.target.value)}
                        />
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm btn-square text-error"
                          onClick={() => handleRemoveOtherDocument(index)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm text-primary"
                      onClick={handleAddOtherDocument}
                    >
                      + Add Another Document
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => setShowDocumentModal(false)}
            >
              Back
            </button>
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={handleDocumentSubmit}
            >
              Save Requirements
            </button>
          </div>
        </div>
      </ApplicationModal>
    </div>
  );
};

export default ManageScholarships;