'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AdvancedProfileData {
  skills: string[];
  languages: string[];
  interests: string[];
  publications: string[];
  certifications: string[];
  workExperience: {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
}

export default function AdvancedProfilePage() {
  const router = useRouter();
  const [profileData, setProfileData] = useState<AdvancedProfileData>({
    skills: [''],
    languages: [''],
    interests: [''],
    publications: [''],
    certifications: [''],
    workExperience: [{
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    }]
  });

  const handleAddField = (field: keyof AdvancedProfileData) => {
    if (Array.isArray(profileData[field])) {
      setProfileData({
        ...profileData,
        [field]: [...profileData[field], '']
      });
    }
  };

  const handleRemoveField = (field: keyof AdvancedProfileData, index: number) => {
    if (Array.isArray(profileData[field])) {
      const newArray = [...profileData[field]];
      newArray.splice(index, 1);
      setProfileData({
        ...profileData,
        [field]: newArray
      });
    }
  };

  const handleFieldChange = (field: keyof AdvancedProfileData, index: number, value: string) => {
    if (Array.isArray(profileData[field])) {
      const newArray = [...profileData[field]];
      newArray[index] = value;
      setProfileData({
        ...profileData,
        [field]: newArray
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: Submit profile data to backend
      router.push('/profile');
    } catch (error) {
      console.error('Failed to save advanced profile', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Advanced Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dynamic Fields */}
          {(['skills', 'languages', 'interests', 'publications', 'certifications'] as const).map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 capitalize mb-2">
                {field}
              </label>
              {profileData[field].map((value, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleFieldChange(field, index, e.target.value)}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveField(field, index)}
                    className="px-2 py-1 text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddField(field)}
                className="text-sm text-indigo-600 hover:text-indigo-700"
              >
                + Add {field.slice(0, -1)}
              </button>
            </div>
          ))}

          {/* Work Experience */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Work Experience</h2>
            {profileData.workExperience.map((exp, index) => (
              <div key={index} className="border p-4 rounded-md mb-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => {
                      const newExp = [...profileData.workExperience];
                      newExp[index] = { ...exp, company: e.target.value };
                      setProfileData({ ...profileData, workExperience: newExp });
                    }}
                    className="rounded-md border-gray-300"
                  />
                  <input
                    type="text"
                    placeholder="Position"
                    value={exp.position}
                    onChange={(e) => {
                      const newExp = [...profileData.workExperience];
                      newExp[index] = { ...exp, position: e.target.value };
                      setProfileData({ ...profileData, workExperience: newExp });
                    }}
                    className="rounded-md border-gray-300"
                  />
                </div>
                <textarea
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) => {
                    const newExp = [...profileData.workExperience];
                    newExp[index] = { ...exp, description: e.target.value };
                    setProfileData({ ...profileData, workExperience: newExp });
                  }}
                  className="w-full rounded-md border-gray-300 mb-4"
                  rows={3}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => setProfileData({
                ...profileData,
                workExperience: [...profileData.workExperience, {
                  company: '',
                  position: '',
                  startDate: '',
                  endDate: '',
                  description: ''
                }]
              })}
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              + Add work experience
            </button>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 