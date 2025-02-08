'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { academicLevels, majors } from '@/app/data/education';

export default function BasicSearchPage() {
  const router = useRouter();
  const [basicInfo, setBasicInfo] = useState({
    academicLevel: '',
    major: '',
    citizenship: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams({
      academicLevel: basicInfo.academicLevel,
      major: basicInfo.major,
      citizenship: basicInfo.citizenship,
    });
    router.push(`/scholarships?${searchParams.toString()}`);
  };

  return (
    <div className="max-w-3xl mx-auto">
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
              className="w-full rounded-md border border-gray-300 p-2"
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
              className="w-full rounded-md border border-gray-300 p-2"
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
              className="w-full rounded-md border border-gray-300 p-2"
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
  );
} 