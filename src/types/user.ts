export interface Education {
  level: 'high_school' | 'undergraduate' | 'graduate' | 'phd';
  school: string;
  major?: string;
  gpa?: number;
  graduationYear: number;
}

export interface UserProfile {
  id: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    citizenship: string;
    gender?: string;
  };
  contactInfo: {
    email: string;
    phone?: string;
    address?: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
  education: Education[];
  achievements?: {
    awards?: string[];
    extracurricular?: string[];
    volunteer?: string[];
  };
  financialInfo?: {
    needsBasedAid: boolean;
    householdIncome?: string;
    dependents?: number;
  };
} 