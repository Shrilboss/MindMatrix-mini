
import { StringToBoolean } from 'class-variance-authority/types';
import { Module, Mentor } from './program';

export type UserRole = 'college-credit-student' | 'independent-student' | 'professional' | 'independent' | 'college-access' | 'looking-for-job' | 'admin' | null;

export interface CollegeDetails {
  state: string;
  university: string;
  college: string;
  enrollmentNumber: string;
}

export interface UserProfile {
  name: string;
  email: string;
  role: UserRole;
  bio?: string;
  phone?: string
  education?: EducationExperience[];
  professional?: ProfessionalExperience[];
  skills?: Skill[];
  careerInterests?: string[];
  profileImage?: string;
  bannerImage?: string;
  mmCoins?: number;
  engagement?: {
    daily: number;
    weekly: number;
    monthly: number;
    streak: number;
  };
  collegeDetails?: CollegeDetails;
}

export interface EducationExperience {
  institution: string;
  degree?: string;
  field?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  description?: string;
}

export interface ProfessionalExperience {
  company: string;
  position?: string;
  startDate?: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

export interface Skill {
  name: string;
  rating: number; // Out of 100
  category: 'technical' | 'soft';
  trending?: 'up' | 'down' | 'stable'; // Added trending property
}

export interface Program {
  id: string;
  title: string;
  type: 'AEC' | 'MinorDegree' | 'Certification' | 'LiveSession' | 'LifeSkill' | 'Industry';
  description: string;
  progress?: number;
  completed?: boolean;
  image: string;
  instructors?: string[];
  credits?: number;
  duration?: string;
  popularity?: number;
  price?: number;
  skills?: string[];
  startDate?: string;
  endDate?: string;
  recommendationReason?: string;
  enrolledLearners?: number;
  // Additional properties for LiveSession
  date?: string;
  time?: string;
  speaker?: string;
  // Additional properties for LifeSkill
  category?: string;
  difficulty?: string;
  timeCommitment?: string;
  // Additional properties for upcoming programs
  launchDate?: string;
  earlyBirdPrice?: number;
  regularPrice?: number;
  // Additional properties for other program types
  instructor?: string;
  // Added module and mentor types
  modules?: Module[];
  mentors?: Mentor[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  programId: string;
  programTitle: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'fulltime' | 'parttime' | 'internship' | 'contract';
  description: string;
  requirements: string[];
  salaryRange?: string;
  postedDate: string;
  applicationDeadline?: string;
  industry: string;
  skills: {
    technical: string[];
    nonTechnical: string[];
  };
  image?: string;
  popularity?: number;
}
