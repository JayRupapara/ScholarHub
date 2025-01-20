import { Scholarship } from './scholarship';

export type ApplicationStatus = 
  | 'draft'
  | 'in_progress'
  | 'submitted'
  | 'awarded'
  | 'rejected';

export interface ScholarshipApplication {
  id: string;
  scholarshipId: string;
  scholarship: Scholarship;
  userId: string;
  status: ApplicationStatus;
  submittedAt?: string;
  documents: {
    name: string;
    url: string;
    type: string;
  }[];
  essays?: {
    prompt: string;
    content: string;
    wordCount: number;
  }[];
  notes?: string;
  lastUpdated: string;
  deadline: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'deadline' | 'status_update' | 'new_match' | 'system';
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