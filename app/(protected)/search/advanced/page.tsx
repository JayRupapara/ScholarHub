'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SearchFilters } from '@/app/components/search/SearchFilters';
import type { SearchFilters as SearchFiltersType } from '@/app/types/search';

export default function AdvancedSearchPage() {
  const router = useRouter();
  const [filters, setFilters] = useState<SearchFiltersType>({
    major: '',
    academicLevel: [],
    citizenship: '',
    financialNeed: false,
    disability: false,
    location: '',
    deadline: '',
    minAmount: '',
    maxAmount: '',
  });

  const handleSearch = () => {
    // Store filters in localStorage or state management
    localStorage.setItem('advancedSearchFilters', JSON.stringify(filters));
    router.push('/scholarships');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Advanced Search</h1>
        <SearchFilters 
          filters={filters} 
          setFilters={setFilters} 
          onSearch={handleSearch} 
        />
      </div>
    </div>
  );
} 