export interface Scholarship {
  id: string;
  title: string;
  provider: string;
  amount: {
    min: number;
    max: number;
    type: 'fixed' | 'variable' | 'full_tuition';
  };
  deadline: string;
  eligibility: {
    academicLevel: ('high_school' | 'undergraduate' | 'graduate' | 'phd')[];
    majors: string[];
    citizenship: string[];
    gpaRequirement?: number;
    financialNeed: boolean;
    disabilities?: boolean;
    location?: {
      country: string;
      state?: string;
      region?: string;
    };
  };
  requirements: {
    documents: string[];
    essays?: {
      topic: string;
      wordLimit: number;
    }[];
    letters?: number;
    other?: string[];
  };
  applicationUrl: string;
  description: string;
  reviews?: {
    id: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    appliedDate: string;
    status: 'pending' | 'awarded' | 'rejected';
  }[];
} 