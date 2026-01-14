export type UserRole = "admin" | "mentor" | "mentee";

export type TrackType =
  | "software-development"
  | "ui-ux-design"
  | "mobile-development"
  | "product-management"
  | "quality-assurance"
  | "data"
  | "cybersecurity";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  trackId?: string;
  avatarUrl?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Track {
  id: TrackType;
  name: string;
  description: string;
  icon: string;
  color: string;
  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  trackId: string;
  title: string;
  description: string;
  weekStart: number;
  weekEnd: number;
  tasks: Task[];
}

export interface Task {
  id: string;
  milestoneId: string;
  title: string;
  description: string;
  resourceLinks: ResourceLink[];
  week: number;
}

export interface ResourceLink {
  id: string;
  title: string;
  url: string;
  type: "video" | "article" | "documentation" | "tutorial" | "other";
}

export interface Assignment {
  id: string;
  trackId: string;
  milestoneId: string;
  taskId: string;
  title: string;
  description: string;
  resourceLinks: ResourceLink[];
  dueDate: string;
  week: number;
  createdAt: string;
}

export interface MenteeProgress {
  id: string;
  menteeId: string;
  trackId: string;
  milestoneId: string;
  taskId: string;
  status: "not-started" | "in-progress" | "completed";
  submissionLink?: string;
  submittedAt?: string;
  feedback?: string;
  feedbackBy?: string;
  feedbackAt?: string;
  updatedAt: string;
}

export interface MentorMenteeRelation {
  id: string;
  mentorId: string;
  menteeId: string;
  trackId: string;
  startDate: string;
  endDate?: string;
  status: "active" | "completed" | "inactive";
}

export interface Program {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "upcoming" | "active" | "completed";
  tracks: TrackType[];
}
