import React from 'react';
import { academicLevels, majors, AcademicLevel, Major } from '../../data/education';
import { SearchFilters as SearchFiltersType } from '../../types/search';
import { Filter, X } from 'lucide-react';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  setFilters: React.Dispatch<React.SetStateAction<SearchFiltersType>>;
  onSearch: () => void;
}

export function SearchFilters({ filters, setFilters, onSearch }: SearchFiltersProps) {
  const [isFiltersOpen, setIsFiltersOpen] = React.useState(false);

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

  const handleAcademicLevelChange = (level: AcademicLevel, checked: boolean) => {
    setFilters({
      ...filters,
      academicLevel: checked
        ? [...filters.academicLevel, level]
        : filters.academicLevel.filter((l) => l !== level),
    });
  };

  return (
    <div className="relative">
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

      {/* Filter backdrop for mobile */}
      {isFiltersOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 md:hidden"
          onClick={() => setIsFiltersOpen(false)}
        />
      )}

      {/* Filters panel */}
      <div className={`
        md:block
        ${isFiltersOpen ? 'fixed inset-y-0 right-0 z-30 w-full max-w-xs' : 'hidden'}
        bg-white rounded-lg shadow p-6
      `}>
        <div className="flex items-center justify-between md:hidden mb-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button onClick={() => setIsFiltersOpen(false)}>
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Major/Field of Study */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Field of Study
            </label>
            <select
              name="major"
              value={filters.major}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300"
            >
              <option value="">All Fields</option>
              {majors.map((major) => (
                <option key={major} value={major}>
                  {major}
                </option>
              ))}
            </select>
          </div>

          {/* Academic Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Academic Level
            </label>
            {academicLevels.map((level) => (
              <div key={level} className="flex items-center">
                <input
                  type="checkbox"
                  id={level}
                  checked={filters.academicLevel.includes(level)}
                  onChange={(e) => handleAcademicLevelChange(level, e.target.checked)}
                  className="h-4 w-4 text-indigo-600 rounded"
                />
                <label htmlFor={level} className="ml-2 text-sm text-gray-600">
                  {level.replace('_', ' ').toUpperCase()}
                </label>
              </div>
            ))}
          </div>

          {/* Citizenship */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Citizenship
            </label>
            <select
              name="citizenship"
              value={filters.citizenship}
              onChange={handleChange}
              className="w-full rounded-md border-gray-300"
            >
              <option value="">All</option>
              <option value="US">United States</option>
              <option value="international">International</option>
            </select>
          </div>

          {/* Amount Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Award Amount
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                name="minAmount"
                placeholder="Min"
                value={filters.minAmount}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300"
              />
              <input
                type="number"
                name="maxAmount"
                placeholder="Max"
                value={filters.maxAmount}
                onChange={handleChange}
                className="w-full rounded-md border-gray-300"
              />
            </div>
          </div>

          {/* Other Filters */}
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="financialNeed"
                name="financialNeed"
                checked={filters.financialNeed}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 rounded"
              />
              <label htmlFor="financialNeed" className="ml-2 text-sm text-gray-600">
                Need-Based
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="disability"
                name="disability"
                checked={filters.disability}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 rounded"
              />
              <label htmlFor="disability" className="ml-2 text-sm text-gray-600">
                Disability Support
              </label>
            </div>
          </div>

          <button
            onClick={onSearch}
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
} 