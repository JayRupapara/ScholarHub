export type ApplicationStatus = 'draft' | 'in_progress' | 'submitted' | 'awarded' | 'rejected';

export interface ScholarshipApplication {
  id: string;
  scholarshipId: string;
  scholarship: {
    id: string;
    title: string;
    amount: number;
    deadline: string;
    description: string;
  };
  userId: string;
  status: ApplicationStatus;
  documents: Array<{ name: string; url: string; type: string }>;
  lastUpdated: string;
  deadline: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'deadline' | 'status_update' | 'new_match';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  scholarshipId?: string;
  applicationId?: string;
  action?: {
    label: string;
    url: string;
  };
} 