"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { tracks } from "@/data/tracks";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowRight,
  Trophy,
  Users,
  Target,
} from "lucide-react";

interface ProgressData {
  progress: Array<{
    id: string;
    taskId: string;
    status: string;
  }>;
  completionPercentage: number;
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const role = session?.user?.role || "mentee";
  const trackId = (session?.user as { trackId?: string })?.trackId;
  const track = trackId ? tracks.find((t) => t.id === trackId) : null;

  useEffect(() => {
    const fetchProgress = async () => {
      if (!trackId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/progress?trackId=${trackId}`);
        const data = await response.json();
        setProgressData(data);
      } catch (error) {
        console.error("Failed to fetch progress:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgress();
  }, [trackId]);

  // Calculate stats
  const completedTasks = progressData?.progress?.filter(
    (p) => p.status === "completed"
  ).length || 0;
  const inProgressTasks = progressData?.progress?.filter(
    (p) => p.status === "in-progress"
  ).length || 0;
  const totalTasks = track?.milestones?.reduce(
    (sum, m) => sum + m.tasks.length,
    0
  ) || 0;

  // Get current milestone
  const getCurrentMilestone = () => {
    if (!track) return null;
    const completedTaskIds = new Set(
      progressData?.progress?.filter((p) => p.status === "completed").map((p) => p.taskId) || []
    );

    for (const milestone of track.milestones) {
      const allTasksCompleted = milestone.tasks.every((t) =>
        completedTaskIds.has(t.id)
      );
      if (!allTasksCompleted) return milestone;
    }
    return track.milestones[track.milestones.length - 1];
  };

  const currentMilestone = getCurrentMilestone();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-electric" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {session?.user?.name?.split(" ")[0]}!
        </h1>
        <p className="text-gray-600 mt-1">
          {role === "mentee"
            ? "Track your progress and continue learning."
            : role === "mentor"
            ? "Manage your mentees and track their progress."
            : "Oversee the mentorship program."}
        </p>
      </div>

      {/* Role-specific Dashboard */}
      {role === "mentee" && <MenteeDashboard
        track={track}
        progressData={progressData}
        completedTasks={completedTasks}
        inProgressTasks={inProgressTasks}
        totalTasks={totalTasks}
        currentMilestone={currentMilestone}
      />}

      {role === "mentor" && <MentorDashboard />}

      {role === "admin" && <AdminDashboard />}
    </div>
  );
}

// Mentee Dashboard Component
function MenteeDashboard({
  track,
  progressData,
  completedTasks,
  inProgressTasks,
  totalTasks,
  currentMilestone,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  track: any;
  progressData: ProgressData | null;
  completedTasks: number;
  inProgressTasks: number;
  totalTasks: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentMilestone: any;
}) {
  if (!track) {
    return (
      <Card variant="bordered" className="text-center py-12">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Track Selected</h3>
        <p className="text-gray-600 mb-4">You haven&apos;t selected a learning track yet.</p>
        <Link href="/dashboard/settings">
          <Button>Choose Your Track</Button>
        </Link>
      </Card>
    );
  }

  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="bordered" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{completedTasks}</p>
            <p className="text-sm text-gray-600">Tasks Completed</p>
          </div>
        </Card>

        <Card variant="bordered" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{inProgressTasks}</p>
            <p className="text-sm text-gray-600">In Progress</p>
          </div>
        </Card>

        <Card variant="bordered" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {progressData?.completionPercentage || 0}%
            </p>
            <p className="text-sm text-gray-600">Overall Progress</p>
          </div>
        </Card>
      </div>

      {/* Current Track Progress */}
      <Card variant="elevated">
        <div className="flex items-center justify-between mb-6">
          <div>
            <Badge variant="info">{track.name}</Badge>
            <h2 className="text-xl font-bold text-gray-900 mt-2">Your Learning Path</h2>
          </div>
          <Link href="/dashboard/progress">
            <Button variant="ghost" size="sm" className="group">
              View Details
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <ProgressBar
          progress={progressData?.completionPercentage || 0}
          size="lg"
          className="mb-6"
        />

        {/* Current Milestone */}
        {currentMilestone && (
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-purple-electric" />
              <span className="font-medium text-gray-900">Current Milestone</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {currentMilestone.title}
            </h3>
            <p className="text-sm text-gray-600 mb-3">{currentMilestone.description}</p>
            <p className="text-xs text-gray-500">
              Weeks {currentMilestone.weekStart}-{currentMilestone.weekEnd} •{" "}
              {currentMilestone.tasks.length} tasks
            </p>
          </div>
        )}
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card variant="bordered" className="hover:border-purple-electric transition-colors">
          <Link href="/dashboard/progress" className="block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-deep to-purple-electric flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Continue Learning</h3>
                <p className="text-sm text-gray-600">Pick up where you left off</p>
              </div>
            </div>
          </Link>
        </Card>

        <Card variant="bordered" className="hover:border-purple-electric transition-colors">
          <Link href="/dashboard/assignments" className="block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal to-purple-electric flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">View Assignments</h3>
                <p className="text-sm text-gray-600">Check weekly tasks and resources</p>
              </div>
            </div>
          </Link>
        </Card>
      </div>
    </>
  );
}

// Mentor Dashboard Component
function MentorDashboard() {
  const [mentees, setMentees] = useState<Array<{
    id: string;
    name: string;
    trackId: string;
    completionPercentage: number;
  }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMentees = async () => {
      try {
        const response = await fetch("/api/users/mentees");
        const data = await response.json();
        setMentees(data.mentees || []);
      } catch (error) {
        console.error("Failed to fetch mentees:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMentees();
  }, []);

  if (isLoading) {
    return <div className="animate-pulse h-48 bg-gray-100 rounded-xl" />;
  }

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="bordered" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{mentees.length}</p>
            <p className="text-sm text-gray-600">Active Mentees</p>
          </div>
        </Card>

        <Card variant="bordered" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {Math.round(
                mentees.reduce((sum, m) => sum + m.completionPercentage, 0) /
                  (mentees.length || 1)
              )}%
            </p>
            <p className="text-sm text-gray-600">Avg. Progress</p>
          </div>
        </Card>

        <Card variant="bordered" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal/20 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-teal" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="text-sm text-gray-600">Weeks Remaining</p>
          </div>
        </Card>
      </div>

      {/* Mentees List */}
      <Card variant="elevated">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Your Mentees</h2>
          <Link href="/mentor/mentees">
            <Button variant="ghost" size="sm">View All</Button>
          </Link>
        </div>

        {mentees.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No mentees assigned yet.</p>
        ) : (
          <div className="space-y-4">
            {mentees.slice(0, 5).map((mentee) => {
              const track = tracks.find((t) => t.id === mentee.trackId);
              return (
                <div
                  key={mentee.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-deep to-purple-electric flex items-center justify-center text-white font-semibold">
                    {mentee.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{mentee.name}</p>
                    <p className="text-sm text-gray-600">{track?.name || "No track"}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-purple-deep">
                      {mentee.completionPercentage}%
                    </p>
                    <p className="text-xs text-gray-500">Progress</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </>
  );
}

// Admin Dashboard Component
function AdminDashboard() {
  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card variant="bordered" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">500+</p>
            <p className="text-sm text-gray-600">Total Users</p>
          </div>
        </Card>

        <Card variant="bordered" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">7</p>
            <p className="text-sm text-gray-600">Active Tracks</p>
          </div>
        </Card>

        <Card variant="bordered" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
            <Users className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">25</p>
            <p className="text-sm text-gray-600">Active Mentors</p>
          </div>
        </Card>

        <Card variant="bordered" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-teal/20 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-teal" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">1</p>
            <p className="text-sm text-gray-600">Active Programs</p>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <Link href="/admin/users">
          <Card variant="bordered" className="hover:border-purple-electric transition-colors cursor-pointer">
            <h3 className="font-semibold text-gray-900 mb-2">Manage Users</h3>
            <p className="text-sm text-gray-600">View and manage all users in the platform</p>
          </Card>
        </Link>

        <Link href="/admin/programs">
          <Card variant="bordered" className="hover:border-purple-electric transition-colors cursor-pointer">
            <h3 className="font-semibold text-gray-900 mb-2">Manage Programs</h3>
            <p className="text-sm text-gray-600">Create and manage mentorship programs</p>
          </Card>
        </Link>

        <Link href="/admin/assignments">
          <Card variant="bordered" className="hover:border-purple-electric transition-colors cursor-pointer">
            <h3 className="font-semibold text-gray-900 mb-2">Manage Assignments</h3>
            <p className="text-sm text-gray-600">Create and manage weekly assignments</p>
          </Card>
        </Link>
      </div>
    </>
  );
}
