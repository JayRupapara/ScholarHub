export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
}

export interface Profile {
  userId: string;
  personalInfo: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    citizenship: string;
    gender: string;
  };
  education: {
    level: string;
    school: string;
    major: string;
    gpa: string;
    graduationYear: string;
  }[];
  achievements: {
    awards: string[];
    extracurricular: string[];
    volunteer: string[];
  };
  financialInfo: {
    needsBasedAid: boolean;
    householdIncome: string;
    dependents: string;
  };
} 