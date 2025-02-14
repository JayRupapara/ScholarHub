import React, { useState } from 'react';
import { Camera, Mail, Phone, School, BookOpen, DollarSign } from 'lucide-react';
import { userProfile } from "../../data/dummyData";

const Profile = () => {
  const [profileData, setProfileData] = useState(userProfile);
  const [isEditing, setIsEditing] = useState(false);

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
                  <span className="text-2xl">{profileData.firstName[0]}{profileData.lastName[0]}</span>
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
              {profileData.firstName} {profileData.lastName}
            </h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn btn-outline btn-primary"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
          
          <p className="text-base-content/70">{profileData.bio}</p>

          <div className="stats shadow mt-4">
            <div className="stat">
              <div className="stat-title">Applied</div>
              <div className="stat-value text-primary">{profileData.appliedScholarships}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Saved</div>
              <div className="stat-value text-secondary">{profileData.savedScholarships}</div>
            </div>
            <div className="stat">
              <div className="stat-title">Completed</div>
              <div className="stat-value text-accent">{profileData.completedApplications}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="card bg-base-100 shadow-xl mt-6">
        <div className="card-body">
          <h2 className="card-title">Profile Information</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={profileData.firstName}
                  onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                  className="input input-bordered"
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={profileData.lastName}
                  onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                  className="input input-bordered"
                />
              </div>

              <div className="form-control sm:col-span-2">
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

              <div className="form-control sm:col-span-2">
                <label className="label">
                  <span className="label-text">School</span>
                </label>
                <div className="input-group">
                  <span><School className="h-5 w-5" /></span>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={profileData.school}
                    onChange={(e) => setProfileData({...profileData, school: e.target.value})}
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

export default Profile; 