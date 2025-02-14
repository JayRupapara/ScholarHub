import React, { useState } from 'react';
import { Building2, Mail, Phone, Globe, MapPin, Edit, Camera } from 'lucide-react';

interface OrganizationProfile {
  name: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  description: string;
  foundedYear: number;
  type: string;
  totalScholarships: number;
  totalAwarded: number;
}

const OrgProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<OrganizationProfile>({
    name: "Global Education Foundation",
    email: "contact@globaledu.org",
    phone: "+1 (555) 123-4567",
    website: "www.globaledu.org",
    address: "123 Education Street, Academic City, ST 12345",
    description: "A leading non-profit organization dedicated to making education accessible to students worldwide through scholarships and grants.",
    foundedYear: 1995,
    type: "Non-Profit Organization",
    totalScholarships: 150,
    totalAwarded: 2500000
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // Add API call to update profile
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
          
          <p className="text-base-content/70">{profileData.description}</p>

          <div className="stats shadow mt-4">
            <div className="stat">
              <div className="stat-title">Total Scholarships</div>
              <div className="stat-value text-primary">{profileData.totalScholarships}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Total Awarded</div>
              <div className="stat-value text-secondary">${(profileData.totalAwarded / 1000000).toFixed(1)}M</div>
            </div>
            <div className="stat">
              <div className="stat-title">Founded</div>
              <div className="stat-value text-accent">{profileData.foundedYear}</div>
            </div>
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
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
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
                  onChange={(e) => setProfileData({...profileData, type: e.target.value})}
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
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
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
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Website</span>
                </label>
                <div className="input-group">
                  <span><Globe className="h-5 w-5" /></span>
                  <input
                    type="url"
                    disabled={!isEditing}
                    value={profileData.website}
                    onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <div className="input-group">
                  <span><MapPin className="h-5 w-5" /></span>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={profileData.address}
                    onChange={(e) => setProfileData({...profileData, address: e.target.value})}
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