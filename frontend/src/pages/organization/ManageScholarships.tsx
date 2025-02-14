import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2 } from 'lucide-react';
import ApplicationModal from '../../components/common/ApplicationModal';

interface Scholarship {
  id: number;
  title: string;
  amount: number;
  deadline: string;
  applicants: number;
  status: 'active' | 'draft' | 'closed';
  field: string;
  description: string;
  requirements: string[];
}

// Add new interface for document requirements
interface DocumentRequirement {
  id: string;
  name: string;
  required: boolean;
  otherDetails?: string[];
}

const ManageScholarships = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
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
    { id: 'other', name: 'Other Documents', required: false, otherDetails: [] }
  ]);

  // Sample scholarships data
  const scholarships: Scholarship[] = [
    {
      id: 1,
      title: "STEM Excellence Scholarship",
      amount: 10000,
      deadline: "2024-05-15",
      applicants: 45,
      status: "active",
      field: "Engineering",
      description: "A scholarship for students in the field of engineering",
      requirements: ["GPA of 3.5 or higher", "Relevant engineering coursework"]
    },
    {
      id: 2,
      title: "Creative Arts Grant",
      amount: 7500,
      deadline: "2024-05-30",
      applicants: 28,
      status: "active",
      field: "Arts",
      description: "A scholarship for students in the field of arts",
      requirements: ["Portfolio submission", "Art history coursework"]
    },
    {
      id: 3,
      title: "Future Leaders Fund",
      amount: 15000,
      deadline: "2024-06-01",
      applicants: 0,
      status: "draft",
      field: "Business",
      description: "A scholarship for students in the field of business",
      requirements: ["Business administration coursework", "Leadership experience"]
    }
  ];

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

  const handleEdit = (scholarship: Scholarship) => {
    setSelectedScholarship(scholarship);
    setFormData({
      scholarshipName: scholarship.title,
      amount: scholarship.amount.toString(),
      maxIncome: '',
      disability: 'no',
      minPercentage: '',
      highestQualification: '',
      category: '',
      otherRequirements: scholarship.requirements?.join('\n') || '',
      description: scholarship.description || '',
      lastDate: scholarship.deadline,
      duration: '',
      sahayType: '',
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this scholarship?')) {
      // Handle delete logic here
      console.log('Deleting scholarship:', id);
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Manage Scholarships</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="btn btn-primary gap-2"
        >
          <Plus className="h-4 w-4" />
          Create New
        </button>
      </div>

      {/* Filters and Search */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search scholarships..."
            className="input input-bordered w-full"
          />
          <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
        </div>

        <select 
          className="select select-bordered w-full"
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
              <th>Field</th>
              <th>Applicants</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredScholarships.map((scholarship) => (
              <tr key={scholarship.id}>
                <td>{scholarship.title}</td>
                <td>${scholarship.amount.toLocaleString()}</td>
                <td>{new Date(scholarship.deadline).toLocaleDateString()}</td>
                <td>{scholarship.field}</td>
                <td>{scholarship.applicants}</td>
                <td>
                  <span className={`badge badge-${getStatusColor(scholarship.status)} badge-sm`}>
                    {scholarship.status}
                  </span>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button 
                      className="btn btn-ghost btn-sm"
                      onClick={() => handleEdit(scholarship)}
                      title="Edit"
                    >
                      <Edit className="h-4 w-4 text-primary" />
                    </button>
                    <button 
                      className="btn btn-ghost btn-sm"
                      onClick={() => handleDelete(scholarship.id)}
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4 text-error" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-500">
          Showing {filteredScholarships.length} of {scholarships.length} scholarships
        </div>
        <div className="join">
          <button className="join-item btn btn-sm">Previous</button>
          <button className="join-item btn btn-sm btn-active">1</button>
          <button className="join-item btn btn-sm">2</button>
          <button className="join-item btn btn-sm">3</button>
          <button className="join-item btn btn-sm">Next</button>
        </div>
      </div>

      {/* Create/Edit Scholarship Modal */}
      <ApplicationModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setIsEditing(false);
          setSelectedScholarship(null);
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
        }}
        title={isEditing ? 'Edit Scholarship' : 'Create New Scholarship'}
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
                  onChange={(e) => setFormData({...formData, scholarshipName: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Amount (₹)</label>
                <input
                  type="number"
                  className="input input-bordered input-sm w-full"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
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
                  onChange={(e) => setFormData({...formData, maxIncome: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Min Academic %</label>
                <input
                  type="number"
                  className="input input-bordered input-sm w-full"
                  value={formData.minPercentage}
                  onChange={(e) => setFormData({...formData, minPercentage: e.target.value})}
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
                  onChange={(e) => setFormData({...formData, highestQualification: e.target.value})}
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
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
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
                  onChange={(e) => setFormData({...formData, disability: e.target.value})}
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
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
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
                  onChange={(e) => setFormData({...formData, sahayType: e.target.value})}
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
                  onChange={(e) => setFormData({...formData, lastDate: e.target.value})}
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
                onChange={(e) => setFormData({...formData, otherRequirements: e.target.value})}
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