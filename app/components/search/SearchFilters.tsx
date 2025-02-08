'use client';

import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { academicLevels, majors } from '@/app/data/education';
import type { SearchFilters as SearchFiltersType } from '@/app/types/search';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  setFilters: React.Dispatch<React.SetStateAction<SearchFiltersType>>;
  onSearch: () => void;
}

export function SearchFilters({ filters, setFilters, onSearch }: SearchFiltersProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFilters({
        ...filters,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFilters({
        ...filters,
        [name]: value,
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Mobile filter button */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="w-full flex items-center justify-center px-4 py-2 bg-white rounded-md shadow text-gray-700 hover:bg-gray-50"
        >
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </button>
      </div>

      {/* Filters panel */}
      <div className={`space-y-6 ${isFiltersOpen ? 'block' : 'hidden md:block'}`}>
        {/* Filter fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Field of Study
          </label>
          <select
            name="major"
            value={filters.major}
            onChange={handleChange}
            className="w-full rounded-md border-gray-300 p-2"
          >
            <option value="">All Fields</option>
            {majors.map((major) => (
              <option key={major} value={major}>
                {major}
              </option>
            ))}
          </select>
        </div>

        {/* More filter fields... */}

        <button
          onClick={onSearch}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
} 