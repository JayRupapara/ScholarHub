export const academicLevels = [
  'high_school',
  'undergraduate',
  'graduate',
  'phd'
] as const;

export const majors = [
  'Computer Science',
  'Engineering',
  'Business',
  'Medicine',
  'Arts',
  'Law',
  'Education',
  'Sciences',
  'Social Sciences',
  'Mathematics'
] as const;

export type AcademicLevel = typeof academicLevels[number];
export type Major = typeof majors[number]; 