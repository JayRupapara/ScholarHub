import { AcademicLevel, Major } from './education';

export interface SearchFilters {
  major: Major | '';
  academicLevel: AcademicLevel[];
  citizenship: 'US' | 'international' | '';
  financialNeed: boolean;
  disability: boolean;
  location: string;
  deadline: string;
  minAmount: string;
  maxAmount: string;
}

export interface SavedSearch {
  id: string;
  name: string;
  filters: SearchFilters;
  createdAt: string;
  notificationsEnabled: boolean;
}

export interface SearchResult {
  totalCount: number;
  page: number;
  pageSize: number;
  results: Scholarship[];
} 