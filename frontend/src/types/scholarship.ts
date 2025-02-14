export interface Scholarship {
  id: string;
  title: string;
  amount: number;
  deadline: string;
  field: string;
  academicLevel: string;
  citizenship: string;
  description: string;
  requirements: string[];
  documents: string[];
  applicationLink: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  academicLevel: string;
  major: string;
  gpa: number;
  citizenship: string;
  savedScholarships: string[];
  appliedScholarships: string[];
}

export type AcademicLevel = 'High School' | 'Undergraduate' | 'Graduate' | 'PhD';
export type CitizenshipStatus = 'US Citizen' | 'International' | 'Permanent Resident';