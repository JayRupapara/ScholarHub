export interface Scholarship {
  id: string;
  title: string;
  description: string;
  amount: number;
  deadline: string;
  requirements: {
    academicLevel: string[];
    major?: string[];
    gpa?: number;
    citizenship?: string[];
  };
  provider: {
    name: string;
    website?: string;
  };
  applicationUrl: string;
  createdAt: string;
  updatedAt: string;
} 