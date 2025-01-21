import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { academicLevels, majors } from '../data/education';

export function BasicSearch() {
  const navigate = useNavigate();
  const [basicInfo, setBasicInfo] = useState({
    academicLevel: '',
    major: '',
    citizenship: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store basic info in localStorage or state management
    localStorage.setItem('basicSearchInfo', JSON.stringify(basicInfo));
    navigate('/scholarships', { state: { filters: basicInfo } });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-6">Find Scholarships</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Academic Level
              </label>
              <select
                required
                value={basicInfo.academicLevel}
                onChange={(e) => setBasicInfo({ ...basicInfo, academicLevel: e.target.value })}
                className="w-full rounded-md border-gray-300"
              >
                <option value="">Select Level</option>
                {academicLevels.map((level) => (
                  <option key={level} value={level}>
                    {level.replace('_', ' ').toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Field of Study
              </label>
              <select
                required
                value={basicInfo.major}
                onChange={(e) => setBasicInfo({ ...basicInfo, major: e.target.value })}
                className="w-full rounded-md border-gray-300"
              >
                <option value="">Select Field</option>
                {majors.map((major) => (
                  <option key={major} value={major}>
                    {major}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Citizenship
              </label>
              <select
                required
                value={basicInfo.citizenship}
                onChange={(e) => setBasicInfo({ ...basicInfo, citizenship: e.target.value })}
                className="w-full rounded-md border-gray-300"
              >
                <option value="">Select Citizenship</option>
                <option value="US">United States</option>
                <option value="international">International</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
            >
              Find Scholarships
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 