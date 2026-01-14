"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import { tracks } from "@/data/tracks";
import {
  CheckCircle2,
  Circle,
  Clock,
  ChevronDown,
  ChevronUp,
  Link as LinkIcon,
  ExternalLink,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressItem {
  id: string;
  taskId: string;
  milestoneId: string;
  status: "not-started" | "in-progress" | "completed";
  submissionLink?: string;
  feedback?: string;
}

export default function ProgressPage() {
  const { data: session } = useSession();
  const [progressData, setProgressData] = useState<{
    progress: ProgressItem[];
    completionPercentage: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedMilestones, setExpandedMilestones] = useState<Set<string>>(new Set());
  const [submissionModal, setSubmissionModal] = useState<{
    isOpen: boolean;
    task: { id: string; title: string; milestoneId: string } | null;
  }>({ isOpen: false, task: null });
  const [submissionLink, setSubmissionLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

        // Expand first incomplete milestone by default
        if (track) {
          const progressMap = new Map<string, ProgressItem>(
            (data.progress || []).map((p: ProgressItem) => [p.taskId, p])
          );
          for (const milestone of track.milestones) {
            const allCompleted = milestone.tasks.every(
              (t) => progressMap.get(t.id)?.status === "completed"
            );
            if (!allCompleted) {
              setExpandedMilestones(new Set([milestone.id]));
              break;
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch progress:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProgress();
  }, [trackId, track]);

  const toggleMilestone = (milestoneId: string) => {
    setExpandedMilestones((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(milestoneId)) {
        newSet.delete(milestoneId);
      } else {
        newSet.add(milestoneId);
      }
      return newSet;
    });
  };

  const getTaskProgress = (taskId: string): ProgressItem | undefined => {
    return progressData?.progress?.find((p) => p.taskId === taskId);
  };

  const updateTaskStatus = async (
    taskId: string,
    milestoneId: string,
    status: "not-started" | "in-progress" | "completed",
    submissionLink?: string
  ) => {
    if (!trackId) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trackId,
          milestoneId,
          taskId,
          status,
          submissionLink,
        }),
      });

      const data = await response.json();
      setProgressData((prev) => ({
        progress: [
          ...(prev?.progress.filter((p) => p.taskId !== taskId) || []),
          data.progress,
        ],
        completionPercentage: data.completionPercentage,
      }));
    } catch (error) {
      console.error("Failed to update progress:", error);
    } finally {
      setIsSubmitting(false);
      setSubmissionModal({ isOpen: false, task: null });
      setSubmissionLink("");
    }
  };

  const handleSubmitTask = () => {
    if (submissionModal.task) {
      updateTaskStatus(
        submissionModal.task.id,
        submissionModal.task.milestoneId,
        "completed",
        submissionLink
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-electric" />
      </div>
    );
  }

  if (!track) {
    return (
      <Card variant="bordered" className="text-center py-12">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Track Selected</h3>
        <p className="text-gray-600">Please select a track in your settings to track progress.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Badge variant="info" className="mb-2">{track.name}</Badge>
        <h1 className="text-2xl font-bold text-gray-900">Your Progress</h1>
        <p className="text-gray-600 mt-1">
          Track your journey through {track.milestones.length} milestones over 12 weeks.
        </p>
      </div>

      {/* Overall Progress */}
      <Card variant="elevated">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Overall Progress</h2>
        <ProgressBar
          progress={progressData?.completionPercentage || 0}
          size="lg"
        />
        <div className="mt-4 flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <span className="text-gray-600">
              {progressData?.progress?.filter((p) => p.status === "completed").length || 0} Completed
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-yellow-500" />
            <span className="text-gray-600">
              {progressData?.progress?.filter((p) => p.status === "in-progress").length || 0} In Progress
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Circle className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">
              {track.milestones.reduce((sum, m) => sum + m.tasks.length, 0) -
                (progressData?.progress?.length || 0)} Not Started
            </span>
          </div>
        </div>
      </Card>

      {/* Milestones */}
      <div className="space-y-4">
        {track.milestones.map((milestone, index) => {
          const isExpanded = expandedMilestones.has(milestone.id);
          const completedTasks = milestone.tasks.filter(
            (t) => getTaskProgress(t.id)?.status === "completed"
          ).length;
          const milestoneProgress = Math.round(
            (completedTasks / milestone.tasks.length) * 100
          );

          return (
            <Card
              key={milestone.id}
              variant="bordered"
              className={cn(
                "transition-all",
                milestoneProgress === 100 && "border-green-200 bg-green-50/50"
              )}
            >
              {/* Milestone Header */}
              <button
                onClick={() => toggleMilestone(milestone.id)}
                className="w-full flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center font-semibold",
                      milestoneProgress === 100
                        ? "bg-green-500 text-white"
                        : "bg-purple-deep/10 text-purple-deep"
                    )}
                  >
                    {milestoneProgress === 100 ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">{milestone.title}</h3>
                    <p className="text-sm text-gray-600">
                      Weeks {milestone.weekStart}-{milestone.weekEnd} •{" "}
                      {completedTasks}/{milestone.tasks.length} tasks
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden sm:block w-32">
                    <ProgressBar progress={milestoneProgress} showLabel={false} size="sm" />
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>

              {/* Tasks */}
              {isExpanded && (
                <div className="mt-6 space-y-3">
                  <p className="text-sm text-gray-600 mb-4">{milestone.description}</p>
                  {milestone.tasks.map((task) => {
                    const taskProgress = getTaskProgress(task.id);
                    const status = taskProgress?.status || "not-started";

                    return (
                      <div
                        key={task.id}
                        className={cn(
                          "p-4 rounded-xl border transition-colors",
                          status === "completed"
                            ? "bg-green-50 border-green-200"
                            : status === "in-progress"
                            ? "bg-yellow-50 border-yellow-200"
                            : "bg-gray-50 border-gray-200"
                        )}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              {status === "completed" ? (
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                              ) : status === "in-progress" ? (
                                <Clock className="w-5 h-5 text-yellow-500" />
                              ) : (
                                <Circle className="w-5 h-5 text-gray-400" />
                              )}
                              <span className="font-medium text-gray-900">{task.title}</span>
                              <Badge
                                variant={
                                  status === "completed"
                                    ? "success"
                                    : status === "in-progress"
                                    ? "warning"
                                    : "default"
                                }
                              >
                                Week {task.week}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 ml-7">{task.description}</p>

                            {/* Submission Link */}
                            {taskProgress?.submissionLink && (
                              <a
                                href={taskProgress.submissionLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 mt-2 ml-7 text-sm text-purple-electric hover:underline"
                              >
                                <LinkIcon className="w-4 h-4" />
                                View Submission
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            )}

                            {/* Feedback */}
                            {taskProgress?.feedback && (
                              <div className="mt-2 ml-7 p-3 bg-white rounded-lg border border-gray-200">
                                <p className="text-sm font-medium text-gray-700">Mentor Feedback:</p>
                                <p className="text-sm text-gray-600">{taskProgress.feedback}</p>
                              </div>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex-shrink-0">
                            {status === "not-started" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  updateTaskStatus(task.id, milestone.id, "in-progress")
                                }
                                disabled={isSubmitting}
                              >
                                Start
                              </Button>
                            )}
                            {status === "in-progress" && (
                              <Button
                                size="sm"
                                onClick={() =>
                                  setSubmissionModal({
                                    isOpen: true,
                                    task: { id: task.id, title: task.title, milestoneId: milestone.id },
                                  })
                                }
                                disabled={isSubmitting}
                              >
                                Complete
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Submission Modal */}
      <Modal
        isOpen={submissionModal.isOpen}
        onClose={() => setSubmissionModal({ isOpen: false, task: null })}
        title="Submit Task"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            Mark &quot;{submissionModal.task?.title}&quot; as completed. Add a link to your work (optional).
          </p>
          <Input
            label="Submission Link (optional)"
            id="submissionLink"
            type="url"
            placeholder="https://github.com/your-project"
            value={submissionLink}
            onChange={(e) => setSubmissionLink(e.target.value)}
          />
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setSubmissionModal({ isOpen: false, task: null })}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={handleSubmitTask}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Submit
                </>
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
