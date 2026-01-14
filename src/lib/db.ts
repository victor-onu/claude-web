// Simple in-memory database for the mentorship platform
// This can be replaced with Prisma/PostgreSQL when needed

import { User, MenteeProgress, MentorMenteeRelation, Assignment, Program } from "@/types";
import { tracks } from "@/data/tracks";

// In-memory storage (in production, replace with actual database)
let users: User[] = [];
let progress: MenteeProgress[] = [];
let relations: MentorMenteeRelation[] = [];
let assignments: Assignment[] = [];
let programs: Program[] = [
  {
    id: "program-2025-q1",
    name: "From Campus to Tech Careers 2025",
    description: "3-month mentorship program for young African tech enthusiasts",
    startDate: "2025-01-01",
    endDate: "2025-03-31",
    status: "active",
    tracks: [
      "software-development",
      "ui-ux-design",
      "mobile-development",
      "product-management",
      "quality-assurance",
      "data",
      "cybersecurity",
    ],
  },
];

// Helper to generate IDs
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// User operations
export const userDb = {
  create: (userData: Omit<User, "id" | "createdAt" | "updatedAt">): User => {
    const user: User = {
      ...userData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    users.push(user);
    return user;
  },

  findByEmail: (email: string): User | undefined => {
    return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  },

  findById: (id: string): User | undefined => {
    return users.find((u) => u.id === id);
  },

  update: (id: string, data: Partial<User>): User | undefined => {
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return undefined;
    users[index] = {
      ...users[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return users[index];
  },

  findMentorsByTrack: (trackId: string): User[] => {
    return users.filter((u) => u.role === "mentor" && u.trackId === trackId);
  },

  findMenteesByTrack: (trackId: string): User[] => {
    return users.filter((u) => u.role === "mentee" && u.trackId === trackId);
  },

  findAll: (): User[] => {
    return [...users];
  },

  findByRole: (role: string): User[] => {
    return users.filter((u) => u.role === role);
  },
};

// Progress operations
export const progressDb = {
  create: (progressData: Omit<MenteeProgress, "id" | "updatedAt">): MenteeProgress => {
    const newProgress: MenteeProgress = {
      ...progressData,
      id: generateId(),
      updatedAt: new Date().toISOString(),
    };
    progress.push(newProgress);
    return newProgress;
  },

  findByMentee: (menteeId: string): MenteeProgress[] => {
    return progress.filter((p) => p.menteeId === menteeId);
  },

  findByMenteeAndTrack: (menteeId: string, trackId: string): MenteeProgress[] => {
    return progress.filter((p) => p.menteeId === menteeId && p.trackId === trackId);
  },

  update: (id: string, data: Partial<MenteeProgress>): MenteeProgress | undefined => {
    const index = progress.findIndex((p) => p.id === id);
    if (index === -1) return undefined;
    progress[index] = {
      ...progress[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return progress[index];
  },

  findOrCreate: (
    menteeId: string,
    trackId: string,
    milestoneId: string,
    taskId: string
  ): MenteeProgress => {
    let existing = progress.find(
      (p) =>
        p.menteeId === menteeId &&
        p.trackId === trackId &&
        p.milestoneId === milestoneId &&
        p.taskId === taskId
    );
    if (!existing) {
      existing = progressDb.create({
        menteeId,
        trackId,
        milestoneId,
        taskId,
        status: "not-started",
      });
    }
    return existing;
  },

  getCompletionPercentage: (menteeId: string, trackId: string): number => {
    const track = tracks.find((t) => t.id === trackId);
    if (!track) return 0;

    const totalTasks = track.milestones.reduce(
      (sum, m) => sum + m.tasks.length,
      0
    );
    if (totalTasks === 0) return 0;

    const completedTasks = progress.filter(
      (p) =>
        p.menteeId === menteeId &&
        p.trackId === trackId &&
        p.status === "completed"
    ).length;

    return Math.round((completedTasks / totalTasks) * 100);
  },
};

// Mentor-Mentee relations
export const relationDb = {
  create: (
    relationData: Omit<MentorMenteeRelation, "id">
  ): MentorMenteeRelation => {
    const relation: MentorMenteeRelation = {
      ...relationData,
      id: generateId(),
    };
    relations.push(relation);
    return relation;
  },

  findByMentor: (mentorId: string): MentorMenteeRelation[] => {
    return relations.filter((r) => r.mentorId === mentorId && r.status === "active");
  },

  findByMentee: (menteeId: string): MentorMenteeRelation[] => {
    return relations.filter((r) => r.menteeId === menteeId && r.status === "active");
  },

  getMenteesForMentor: (mentorId: string): User[] => {
    const menteeIds = relations
      .filter((r) => r.mentorId === mentorId && r.status === "active")
      .map((r) => r.menteeId);
    return users.filter((u) => menteeIds.includes(u.id));
  },
};

// Assignment operations
export const assignmentDb = {
  create: (assignmentData: Omit<Assignment, "id" | "createdAt">): Assignment => {
    const assignment: Assignment = {
      ...assignmentData,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    assignments.push(assignment);
    return assignment;
  },

  findByTrack: (trackId: string): Assignment[] => {
    return assignments.filter((a) => a.trackId === trackId);
  },

  findByWeek: (trackId: string, week: number): Assignment[] => {
    return assignments.filter((a) => a.trackId === trackId && a.week === week);
  },

  findAll: (): Assignment[] => {
    return [...assignments];
  },

  update: (id: string, data: Partial<Assignment>): Assignment | undefined => {
    const index = assignments.findIndex((a) => a.id === id);
    if (index === -1) return undefined;
    assignments[index] = { ...assignments[index], ...data };
    return assignments[index];
  },

  delete: (id: string): boolean => {
    const index = assignments.findIndex((a) => a.id === id);
    if (index === -1) return false;
    assignments.splice(index, 1);
    return true;
  },
};

// Program operations
export const programDb = {
  findAll: (): Program[] => {
    return [...programs];
  },

  findActive: (): Program | undefined => {
    return programs.find((p) => p.status === "active");
  },

  findById: (id: string): Program | undefined => {
    return programs.find((p) => p.id === id);
  },
};

// Initialize with some demo data (for development)
export function initializeDemoData() {
  // Check if data already exists
  if (users.length > 0) return;

  // Create admin user
  userDb.create({
    email: "admin@tektonxlabs.org",
    name: "Admin User",
    role: "admin",
  });

  // Create some demo mentors
  const mentorTracks = [
    { email: "mentor.dev@tektonxlabs.org", name: "John Developer", track: "software-development" },
    { email: "mentor.design@tektonxlabs.org", name: "Jane Designer", track: "ui-ux-design" },
    { email: "mentor.mobile@tektonxlabs.org", name: "Mike Mobile", track: "mobile-development" },
  ];

  mentorTracks.forEach((m) => {
    userDb.create({
      email: m.email,
      name: m.name,
      role: "mentor",
      trackId: m.track,
      bio: `Experienced ${m.track.replace("-", " ")} professional`,
    });
  });

  // Create some demo mentees
  const menteeTracks = [
    { email: "mentee1@example.com", name: "Alice Student", track: "software-development" },
    { email: "mentee2@example.com", name: "Bob Learner", track: "ui-ux-design" },
    { email: "mentee3@example.com", name: "Carol Coder", track: "software-development" },
  ];

  menteeTracks.forEach((m) => {
    const mentee = userDb.create({
      email: m.email,
      name: m.name,
      role: "mentee",
      trackId: m.track,
    });

    // Find a mentor for this track and create relation
    const mentor = users.find((u) => u.role === "mentor" && u.trackId === m.track);
    if (mentor) {
      relationDb.create({
        mentorId: mentor.id,
        menteeId: mentee.id,
        trackId: m.track,
        startDate: new Date().toISOString(),
        status: "active",
      });
    }
  });
}

// Export tracks data
export { tracks };
