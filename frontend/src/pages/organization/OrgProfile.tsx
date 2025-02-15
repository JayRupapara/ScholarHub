import React, { useEffect, useState } from 'react';
import { Building2, Mail, Phone, Camera } from 'lucide-react';
import axios from 'axios';

interface OrganizationProfile {
  name: string;
  email: string;
  contactNumber: string;
  type: string;
}

const OrgProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<OrganizationProfile>({
    name: "",
    email: "",
    contactNumber: "",
    type: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/organization/getOrg', { withCredentials: true });
        console.log(response.data);
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching organization profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);

  };

  return (
    <div className="p-6">
      {/* Profile Header */}
      <div className="card bg-base-100 shadow-xl">
        <div className="relative h-32 bg-primary rounded-t-xl">
          <div className="absolute -bottom-12 left-8">
            <div className="relative">
              <div className="avatar placeholder">
                <div className="bg-base-100 text-neutral-content rounded-full w-24 ring ring-base-100">
                  <Building2 className="w-14 h-14" />
                </div>
              </div>
              <button className="btn btn-circle btn-sm absolute bottom-0 right-0">
                <Camera className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="card-body pt-16">
          <div className="flex items-center justify-between">
            <h2 className="card-title text-2xl">
              {profileData.name}
            </h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn btn-outline btn-primary"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>


        </div>
      </div>

      {/* Organization Information */}
      <div className="card bg-base-100 shadow-xl mt-6">
        <div className="card-body">
          <h2 className="card-title">Organization Information</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Organization Name</span>
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  className="input input-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Organization Type</span>
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={profileData.type}
                  onChange={(e) => setProfileData({ ...profileData, type: e.target.value })}
                  className="input input-bordered"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <div className="input-group">
                  <span><Mail className="h-5 w-5" /></span>
                  <input
                    type="email"
                    disabled={!isEditing}
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone</span>
                </label>
                <div className="input-group">
                  <span><Phone className="h-5 w-5" /></span>
                  <input
                    type="tel"
                    disabled={!isEditing}
                    value={profileData.contactNumber}
                    onChange={(e) => setProfileData({ ...profileData, contactNumber: e.target.value })}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>




            </div>

            {isEditing && (
              <div className="card-actions justify-end">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrgProfile;