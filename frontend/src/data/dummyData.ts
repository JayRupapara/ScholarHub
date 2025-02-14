export const scholarships = [
  {
    id: 1,
    title: "STEM Excellence Scholarship",
    amount: 10000,
    deadline: "2024-05-15",
    field: "Engineering",
    description: "For outstanding students in STEM fields with demonstrated academic excellence and leadership potential.",
    requirements: ["3.5+ GPA", "STEM Major", "US Citizen"],
    status: "In Progress",
    progress: 75,
    university: "MIT",
    location: "Massachusetts, USA"
  },
  {
    id: 2,
    title: "Global Leaders Fund",
    amount: 15000,
    deadline: "2024-06-01",
    field: "Business",
    description: "Supporting future business leaders with international perspective and entrepreneurial spirit.",
    requirements: ["3.0+ GPA", "Business Major", "Leadership Experience"],
    status: "Not Started",
    progress: 0,
    university: "Harvard Business School",
    location: "Massachusetts, USA"
  },
  {
    id: 3,
    title: "Creative Arts Grant",
    amount: 7500,
    deadline: "2024-05-30",
    field: "Arts",
    description: "Supporting talented artists in pursuing their creative endeavors and academic goals.",
    requirements: ["Portfolio", "Arts Major", "Exhibition Experience"],
    status: "Submitted",
    progress: 100,
    university: "Rhode Island School of Design",
    location: "Rhode Island, USA"
  },
  {
    id: 4,
    title: "Future Doctors Scholarship",
    amount: 20000,
    deadline: "2024-07-15",
    field: "Medicine",
    description: "Supporting aspiring medical professionals in their journey to become healthcare leaders.",
    requirements: ["3.8+ GPA", "Pre-Med", "Healthcare Experience"],
    status: "In Progress",
    progress: 50,
    university: "Johns Hopkins University",
    location: "Maryland, USA"
  },
  {
    id: 5,
    title: "Tech Innovation Award",
    amount: 12500,
    deadline: "2024-06-15",
    field: "Computer Science",
    description: "For students pushing the boundaries of technology and innovation.",
    requirements: ["GitHub Portfolio", "CS Major", "Hackathon Experience"],
    status: "Not Started",
    progress: 0,
    university: "Stanford University",
    location: "California, USA"
  }
];

export const notifications = [
  {
    id: 1,
    title: "Application Deadline",
    message: "STEM Excellence Scholarship due in 3 days",
    type: "warning",
    time: "2 hours ago"
  },
  {
    id: 2,
    title: "New Match Found",
    message: "New scholarship matching your profile",
    type: "info",
    time: "1 day ago"
  },
  {
    id: 3,
    title: "Application Update",
    message: "Creative Arts Grant application received",
    type: "success",
    time: "2 days ago"
  },
  {
    id: 4,
    title: "Document Required",
    message: "Please upload your transcript for Tech Innovation Award",
    type: "error",
    time: "3 days ago"
  }
];

export const userProfile = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  school: "University of Technology",
  major: "Computer Science",
  gpa: "3.8",
  graduationYear: "2025",
  interests: ["Technology", "Research", "Leadership"],
  bio: "Passionate student pursuing Computer Science with interests in AI and machine learning.",
  appliedScholarships: 8,
  savedScholarships: 12,
  completedApplications: 5,
  profileCompletion: 85
};

export const upcomingDeadlines = [
  {
    id: 1,
    title: "STEM Excellence Scholarship",
    deadline: "2024-05-15",
    daysLeft: 3
  },
  {
    id: 2,
    title: "Creative Arts Grant",
    deadline: "2024-05-30",
    daysLeft: 18
  },
  {
    id: 3,
    title: "Global Leaders Fund",
    deadline: "2024-06-01",
    daysLeft: 20
  }
];

export const applicationSteps = [
  {
    title: "Personal Information",
    description: "Basic details and contact info",
    status: "completed"
  },
  {
    title: "Academic History",
    description: "Educational background",
    status: "current"
  },
  {
    title: "Documents Upload",
    description: "Transcripts and certificates",
    status: "upcoming"
  },
  {
    title: "Essay Submission",
    description: "Personal statement",
    status: "upcoming"
  },
  {
    title: "Review & Submit",
    description: "Final check and submission",
    status: "upcoming"
  }
];

export const dashboardStats = [
  {
    title: "Active Applications",
    value: "5",
    trend: "+2 this week",
    color: "primary"
  },
  {
    title: "Upcoming Deadlines",
    value: "3",
    trend: "Next: 3 days",
    color: "warning"
  },
  {
    title: "Saved Scholarships",
    value: "12",
    trend: "4 new matches",
    color: "info"
  },
  {
    title: "Completed",
    value: "8",
    trend: "75% success rate",
    color: "success"
  }
];

export const savedSearchFilters = [
  {
    name: "STEM Opportunities",
    criteria: {
      field: "STEM",
      amount: ">$10,000",
      deadline: "Next 3 months"
    }
  },
  {
    name: "Local Scholarships",
    criteria: {
      location: "Within 50 miles",
      amount: "Any",
      type: "Merit-based"
    }
  },
  {
    name: "Art & Design",
    criteria: {
      field: "Arts",
      amount: ">$5,000",
      type: "Portfolio-based"
    }
  }
];

export const recentActivity = [
  {
    type: "application",
    title: "Started application for STEM Excellence Scholarship",
    date: "2024-03-10",
    status: "in-progress"
  },
  {
    type: "document",
    title: "Uploaded transcript for Global Leaders Fund",
    date: "2024-03-09",
    status: "completed"
  },
  {
    type: "deadline",
    title: "Deadline reminder: Creative Arts Grant",
    date: "2024-03-08",
    status: "pending"
  }
]; 