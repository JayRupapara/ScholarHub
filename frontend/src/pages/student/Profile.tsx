import React, { useState } from 'react';
import { Camera, Mail, Phone, School, BookOpen, DollarSign, Calendar, MapPin, CreditCard, User } from 'lucide-react';

interface BankDetails {
  accountNumber: string;
  ifsc: string;
  bankName: string;
  branch: string;
}

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
  dob: string;
  bankDetails: BankDetails;
  role: 'student' | 'organization' | 'admin';
  highestQualification: '10th' | '12th' | 'Diploma' | 'UG' | 'PG';
  gender: 'male' | 'female' | 'other';
  disability: 'yes' | 'no';
}

const Profile = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: 'John Doe',
    email: 'john@example.com',
    mobileNo: '9876543210',
    documents: [],
    caste: 'General',
    income: 300000,
    address: '123 Main St, City, State',
    dob: '2000-01-01',
    bankDetails: {
      accountNumber: '1234567890',
      ifsc: 'ABCD0123456',
      bankName: 'Sample Bank',
      branch: 'Main Branch'
    },
    role: 'student',
    highestQualification: 'UG',
    gender: 'male',
    disability: 'no'
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
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
              J
            </div>
          </div>
        </div>

        {/* Name and Username Section */}
        <div className="pt-20 px-8 pb-6">
          <h1 className="text-2xl font-bold">John Doe</h1>
          <p className="text-base-content/60">@john</p>
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
                  onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
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
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
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
                    onChange={(e) => setProfileData({...profileData, mobileNo: e.target.value})}
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
                    type="date"
                    disabled={!isEditing}
                    value={profileData.dob}
                    onChange={(e) => setProfileData({...profileData, dob: e.target.value})}
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
                  onChange={(e) => setProfileData({...profileData, gender: e.target.value as ProfileData['gender']})}
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
                  onChange={(e) => setProfileData({...profileData, caste: e.target.value as ProfileData['caste']})}
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
                    onChange={(e) => setProfileData({...profileData, income: Number(e.target.value)})}
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
                  onChange={(e) => setProfileData({...profileData, highestQualification: e.target.value as ProfileData['highestQualification']})}
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
                  onChange={(e) => setProfileData({...profileData, disability: e.target.value as ProfileData['disability']})}
                  className="select select-bordered w-full h-10 bg-base-200"
                >
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>

              {/* Address - Full Width */}
              <div className="col-span-2">
                <label className="text-sm font-medium text-base-content/70 mb-2 block">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-base-content/50" />
                  <textarea
                    disabled={!isEditing}
                    value={profileData.address}
                    onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                    className="textarea textarea-bordered w-full bg-base-200 pl-10"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Bank Details Section */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-6">Bank Details</h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                {/* Account Number */}
                <div>
                  <label className="text-sm font-medium text-base-content/70 mb-2 block">
                    Account Number
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-base-content/50" />
                    <input
                      type="text"
                      disabled={!isEditing}
                      value={profileData.bankDetails.accountNumber}
                      onChange={(e) => setProfileData({
                        ...profileData,
                        bankDetails: {...profileData.bankDetails, accountNumber: e.target.value}
                      })}
                      className="input input-bordered w-full h-10 bg-base-200 pl-10"
                    />
                  </div>
                </div>

                {/* IFSC Code */}
                <div>
                  <label className="text-sm font-medium text-base-content/70 mb-2 block">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={profileData.bankDetails.ifsc}
                    onChange={(e) => setProfileData({
                      ...profileData,
                      bankDetails: {...profileData.bankDetails, ifsc: e.target.value}
                    })}
                    className="input input-bordered w-full h-10 bg-base-200"
                  />
                </div>

                {/* Bank Name */}
                <div>
                  <label className="text-sm font-medium text-base-content/70 mb-2 block">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={profileData.bankDetails.bankName}
                    onChange={(e) => setProfileData({
                      ...profileData,
                      bankDetails: {...profileData.bankDetails, bankName: e.target.value}
                    })}
                    className="input input-bordered w-full h-10 bg-base-200"
                  />
                </div>

                {/* Branch */}
                <div>
                  <label className="text-sm font-medium text-base-content/70 mb-2 block">
                    Branch
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={profileData.bankDetails.branch}
                    onChange={(e) => setProfileData({
                      ...profileData,
                      bankDetails: {...profileData.bankDetails, branch: e.target.value}
                    })}
                    className="input input-bordered w-full h-10 bg-base-200"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile; 