import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Mail, Phone, DollarSign, Calendar, Upload } from 'lucide-react';
import { toast } from 'react-hot-toast';
import ApplicationModal from '../../components/common/ApplicationModal';

// interface BankDetails {
//   accountNumber: string;
//   ifsc: string;
//   bankName: string;
//   branch: string;
// }

interface Document {
  id: string;
  docType: 'aadhar' | 'pan' | 'income' | 'caste' | 'ews' | '10th' | '12th' | 'other';
  status: 'pending' | 'verified' | 'rejected';
  url: string;
}

interface ProfileData {
  fullName: string;
  email: string;
  mobileNo: string;
  documents: Document[];
  caste: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS';
  income: number;
  address: string;
  DOB: string;
  // bankDetails: BankDetails;
  role: 'student' | 'organization' | 'admin';
  highestQualification: '10th' | '12th' | 'Diploma' | 'UG' | 'PG';
  gender: 'male' | 'female' | 'other';
  disability: 'yes' | 'no';
}

interface DocumentUpload {
  type: 'aadhar' | 'pan' | 'income' | 'caste' | '10th' | '12th';
  file: File | null;
  status: 'pending' | 'verified' | 'rejected';
  aadharNumber?: string;
}

const Profile = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: '',
    email: '',
    mobileNo: '',
    documents: [],
    caste: 'General',
    income: 0,
    address: '',
    DOB: '',
    // bankDetails: {
    //   accountNumber: '',
    //   ifsc: '',
    //   bankName: '',
    //   branch: ''
    // },
    role: 'student',
    highestQualification: '10th',
    gender: 'other',
    disability: 'no'
  });

  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [documents, setDocuments] = useState<DocumentUpload[]>([
    { type: 'aadhar', file: null, status: 'pending', aadharNumber: '' },
    { type: 'pan', file: null, status: 'pending' },
    { type: '10th', file: null, status: 'pending' },
    { type: '12th', file: null, status: 'pending' },
    { type: 'income', file: null, status: 'pending' },
    { type: 'caste', file: null, status: 'pending' },
  ]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users/getProfile', { withCredentials: true }); // Adjust the endpoint as necessary
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const handleFileChange = (type: DocumentUpload['type'], file: File) => {
    setDocuments(prev => 
      prev.map(doc => 
        doc.type === type ? { ...doc, file, status: 'pending' } : doc
      )
    );
  };

  const handleAadharNumberChange = (value: string) => {
    setDocuments(prev => 
      prev.map(doc => 
        doc.type === 'aadhar' ? { ...doc, aadharNumber: value } : doc
      )
    );
  };

  const handleUploadDocuments = async () => {
    try {
      const formData = new FormData();
      documents.forEach(doc => {
        if (doc.file) {
          formData.append(doc.type, doc.file);
        }
      });

      await axios.post('http://localhost:5000/api/users/uploadDocuments', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Documents uploaded successfully');
      setShowDocumentModal(false);
    } catch (error) {
      console.error('Error uploading documents:', error);
      toast.error('Failed to upload documents');
    }
  };

  return (
    <div className="p-6">
      {/* Profile Header */}
      <div className="card bg-base-100">
        {/* Blue Banner */}
        <div className="h-48 bg-primary rounded-t-xl relative">
          {/* Edit Profile Button */}
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn btn-outline border-white text-white hover:bg-white hover:text-primary"
            >
              Edit Profile
            </button>
          </div>
          
          {/* Profile Avatar */}
          <div className="absolute -bottom-16 left-8">
            <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center text-4xl font-bold text-primary shadow-lg">
              {profileData.fullName[0]}
            </div>
          </div>
        </div>

        {/* Name and Username Section */}
        <div className="pt-20 px-8 pb-6">
          <h1 className="text-2xl font-bold">{profileData.fullName}</h1>
        </div>
      </div>

      {/* Personal Information Card */}
      <div className="card bg-base-100 mt-6">
        <div className="card-body">
          <h3 className="text-lg font-semibold mb-6">Personal Information</h3>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {/* Full Name */}
              <div>
                <label className="text-sm font-medium text-base-content/70 mb-2 block">
                  Full Name
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={profileData.fullName}
                  onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                  className="input input-bordered w-full h-10 bg-base-200"
                />
              </div>
              
              {/* Email */}
              <div>
                <label className="text-sm font-medium text-base-content/70 mb-2 block">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-base-content/50" />
                  <input
                    type="email"
                    disabled={!isEditing}
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="input input-bordered w-full h-10 bg-base-200 pl-10"
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="text-sm font-medium text-base-content/70 mb-2 block">
                  Mobile Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-5 w-5 text-base-content/50" />
                  <input
                    type="tel"
                    disabled={!isEditing}
                    value={profileData.mobileNo}
                    onChange={(e) => setProfileData({ ...profileData, mobileNo: e.target.value })}
                    className="input input-bordered w-full h-10 bg-base-200 pl-10"
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="text-sm font-medium text-base-content/70 mb-2 block">
                  Date of Birth
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-base-content/50" />
                  <input
                    type="string"
                    disabled={!isEditing}
                    value={profileData.DOB.substring(0, 10)}
                    onChange={(e) => setProfileData({ ...profileData, DOB: e.target.value })}
                    className="input input-bordered w-full h-10 bg-base-200 pl-10"
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="text-sm font-medium text-base-content/70 mb-2 block">
                  Gender
                </label>
                <select
                  disabled={!isEditing}
                  value={profileData.gender}
                  onChange={(e) => setProfileData({ ...profileData, gender: e.target.value as ProfileData['gender'] })}
                  className="select select-bordered w-full h-10 bg-base-200"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Caste Category */}
              <div>
                <label className="text-sm font-medium text-base-content/70 mb-2 block">
                  Caste Category
                </label>
                <select
                  disabled={!isEditing}
                  value={profileData.caste}
                  onChange={(e) => setProfileData({ ...profileData, caste: e.target.value as ProfileData['caste'] })}
                  className="select select-bordered w-full h-10 bg-base-200"
                >
                  <option value="General">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                  <option value="EWS">EWS</option>
                </select>
              </div>

              {/* Annual Family Income */}
              <div>
                <label className="text-sm font-medium text-base-content/70 mb-2 block">
                  Annual Family Income
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-base-content/50" />
                  <input
                    type="number"
                    disabled={!isEditing}
                    value={profileData.income}
                    onChange={(e) => setProfileData({ ...profileData, income: Number(e.target.value) })}
                    className="input input-bordered w-full h-10 bg-base-200 pl-10"
                  />
                </div>
              </div>

              {/* Highest Qualification */}
              <div>
                <label className="text-sm font-medium text-base-content/70 mb-2 block">
                  Highest Qualification
                </label>
                <select
                  disabled={!isEditing}
                  value={profileData.highestQualification}
                  onChange={(e) => setProfileData({ ...profileData, highestQualification: e.target.value as ProfileData['highestQualification'] })}
                  className="select select-bordered w-full h-10 bg-base-200"
                >
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="10th">10th</option>
                  <option value="12th">12th</option>
                  <option value="Diploma">Diploma</option>
                  <option value="PG">Postgraduate</option>
                </select>
              </div>

              {/* Disability Status */}
              <div>
                <label className="text-sm font-medium text-base-content/70 mb-2 block">
                  Disability Status
                </label>
                <select
                  disabled={!isEditing}
                  value={profileData.disability}
                  onChange={(e) => setProfileData({ ...profileData, disability: e.target.value as ProfileData['disability'] })}
                  className="select select-bordered w-full h-10 bg-base-200"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>

              {/* Upload Documents Button */}
              <div>
                <label className="text-sm font-medium text-base-content/70 mb-2 block">
                  Documents
                </label>
                <button
                  type="button"
                  onClick={() => setShowDocumentModal(true)}
                  className="btn btn-primary w-full h-10 gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Upload Documents
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Document Upload Modal */}
      <ApplicationModal
        isOpen={showDocumentModal}
        onClose={() => setShowDocumentModal(false)}
        title="Upload Documents"
      >
        <div className="p-4 space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            Please upload the following documents in PDF or image format:
          </p>

          <div className="space-y-4">
            {documents.map((doc) => (
              <div key={doc.type} className="flex flex-col gap-2">
                <label className="text-sm font-medium">
                  {doc.type === '10th' ? '10th Marksheet' :
                   doc.type === '12th' ? '12th Marksheet' :
                   doc.type === 'aadhar' ? 'Aadhar Card' :
                   doc.type === 'pan' ? 'PAN Card' :
                   doc.type === 'income' ? 'Income Certificate' :
                   'Caste Certificate'}
                </label>
                <div className="flex items-center gap-2">
                  {doc.type === 'aadhar' && (
                    <input
                      type="text"
                      placeholder="Enter Aadhar Number"
                      value={doc.aadharNumber}
                      onChange={(e) => handleAadharNumberChange(e.target.value)}
                      className="input input-bordered input-sm w-64"
                      maxLength={12}
                    />
                  )}
                  <div className="flex-1">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileChange(doc.type, file);
                      }}
                      className="file-input file-input-bordered file-input-sm w-full"
                    />
                  </div>
                  {doc.type === 'aadhar' && (
                    <button 
                      className="btn btn-primary btn-sm"
                      disabled={!doc.file || !doc.aadharNumber || doc.aadharNumber.length !== 12}
                      onClick={() => {
                        // Add verification logic here
                        toast.success('Aadhar verification initiated');
                      }}
                    >
                      Verify
                    </button>
                  )}
                </div>
                {doc.file && (
                  <span className="text-sm text-success">File selected</span>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => setShowDocumentModal(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleUploadDocuments}
            >
              Upload All Documents
            </button>
          </div>
        </div>
      </ApplicationModal>
    </div>
  );
};

export default Profile; 