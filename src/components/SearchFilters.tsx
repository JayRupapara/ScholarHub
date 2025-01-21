import React from 'react';
import { Search } from 'lucide-react';

export function SearchFilters() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Field of Study
          </label>
          <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option>All Fields</option>
            <option>Computer Science</option>
            <option>Engineering</option>
            <option>Business</option>
            <option>Arts & Humanities</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Academic Level
          </label>
          <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option>All Levels</option>
            <option>Undergraduate</option>
            <option>Graduate</option>
            <option>Doctoral</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
            <option>Anywhere</option>
            <option>United States</option>
            <option>International</option>
          </select>
        </div>
      </div>

      <button className="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center justify-center">
        <Search className="w-5 h-5 mr-2" />
        Search Scholarships
      </button>
    </div>
  );
}