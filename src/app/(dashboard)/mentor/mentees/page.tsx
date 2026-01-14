"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import Modal from "@/components/ui/Modal";
import { tracks } from "@/data/tracks";
import {
  Users,
  CheckCircle2,
  Clock,
  ChevronRight,
  MessageSquare,
} from "lucide-react";

interface Mentee {
  id: string;
  name: string;
  email: string;
  trackId: string;
  completionPercentage: number;
  progressCount: number;
  inProgressCount: number;
}

interface MenteeProgress {
  id: string;
  taskId: string;
  milestoneId: string;
  status: string;
  submissionLink?: string;
  feedback?: string;
}

export default function MenteesPage() {
  const [mentees, setMentees] = useState<Mentee[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMentee, setSelectedMentee] = useState<Mentee | null>(null);
  const [menteeProgress, setMenteeProgress] = useState<MenteeProgress[]>([]);
  const [feedbackModal, setFeedbackModal] = useState<{
    isOpen: boolean;
    progressId: string;
    taskTitle: string;
  }>({ isOpen: false, progressId: "", taskTitle: "" });
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const viewMenteeDetails = async (mentee: Mentee) => {
    setSelectedMentee(mentee);
    // In a real app, fetch this mentee's progress
    // For now, we'll simulate with empty progress
    setMenteeProgress([]);
  };

  const submitFeedback = async () => {
    if (!feedback.trim()) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/progress/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          progressId: feedbackModal.progressId,
          feedback,
        }),
      });

      // Update local state
      setMenteeProgress((prev) =>
        prev.map((p) =>
          p.id === feedbackModal.progressId ? { ...p, feedback } : p
        )
      );

      setFeedbackModal({ isOpen: false, progressId: "", taskTitle: "" });
      setFeedback("");
    } catch (error) {
      console.error("Failed to submit feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-electric" />
      </div>
    );
  }

  // Mentee Details View
  if (selectedMentee) {
    const track = tracks.find((t) => t.id === selectedMentee.trackId);

    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => setSelectedMentee(null)}>
            ← Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{selectedMentee.name}</h1>
            <p className="text-gray-600">{selectedMentee.email}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="bordered">
            <p className="text-sm text-gray-600 mb-1">Track</p>
            <p className="font-semibold text-gray-900">{track?.name || "N/A"}</p>
          </Card>
          <Card variant="bordered">
            <p className="text-sm text-gray-600 mb-1">Progress</p>
            <ProgressBar
              progress={selectedMentee.completionPercentage}
              size="sm"
              showLabel={false}
            />
            <p className="text-sm font-semibold text-gray-900 mt-2">
              {selectedMentee.completionPercentage}% Complete
            </p>
          </Card>
          <Card variant="bordered">
            <p className="text-sm text-gray-600 mb-1">Tasks</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="font-semibold">{selectedMentee.progressCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-yellow-500" />
                <span className="font-semibold">{selectedMentee.inProgressCount}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Progress by Milestone */}
        {track && (
          <Card variant="elevated">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Progress by Milestone</h2>
            <div className="space-y-4">
              {track.milestones.map((milestone) => {
                const completedTasks = menteeProgress.filter(
                  (p) => p.milestoneId === milestone.id && p.status === "completed"
                ).length;
                const progress = Math.round(
                  (completedTasks / milestone.tasks.length) * 100
                );

                return (
                  <div key={milestone.id} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{milestone.title}</h3>
                      <Badge variant={progress === 100 ? "success" : "default"}>
                        {completedTasks}/{milestone.tasks.length}
                      </Badge>
                    </div>
                    <ProgressBar progress={progress} showLabel={false} size="sm" />

                    {/* Tasks */}
                    <div className="mt-4 space-y-2">
                      {milestone.tasks.map((task) => {
                        const taskProgress = menteeProgress.find(
                          (p) => p.taskId === task.id
                        );
                        return (
                          <div
                            key={task.id}
                            className="flex items-center justify-between p-3 bg-white rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              {taskProgress?.status === "completed" ? (
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                              ) : taskProgress?.status === "in-progress" ? (
                                <Clock className="w-5 h-5 text-yellow-500" />
                              ) : (
                                <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                              )}
                              <span className="text-sm text-gray-700">{task.title}</span>
                            </div>
                            {taskProgress?.status === "completed" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  setFeedbackModal({
                                    isOpen: true,
                                    progressId: taskProgress.id,
                                    taskTitle: task.title,
                                  })
                                }
                              >
                                <MessageSquare className="w-4 h-4" />
                                {taskProgress.feedback ? "Edit Feedback" : "Add Feedback"}
                              </Button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        {/* Feedback Modal */}
        <Modal
          isOpen={feedbackModal.isOpen}
          onClose={() => setFeedbackModal({ isOpen: false, progressId: "", taskTitle: "" })}
          title="Provide Feedback"
        >
          <div className="space-y-4">
            <p className="text-gray-600">
              Add feedback for &quot;{feedbackModal.taskTitle}&quot;
            </p>
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-electric resize-none"
              rows={4}
              placeholder="Great work! Here are some suggestions..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setFeedbackModal({ isOpen: false, progressId: "", taskTitle: "" })}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={submitFeedback}
                disabled={isSubmitting || !feedback.trim()}
              >
                {isSubmitting ? "Submitting..." : "Submit Feedback"}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  // Mentees List View
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Mentees</h1>
        <p className="text-gray-600 mt-1">
          Track progress and provide feedback to your assigned mentees.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="bordered" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{mentees.length}</p>
            <p className="text-sm text-gray-600">Total Mentees</p>
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
            <p className="text-sm text-gray-600">Average Progress</p>
          </div>
        </Card>

        <Card variant="bordered" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {mentees.filter((m) => m.completionPercentage < 25).length}
            </p>
            <p className="text-sm text-gray-600">Need Attention</p>
          </div>
        </Card>
      </div>

      {/* Mentees List */}
      <Card variant="elevated">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">All Mentees</h2>

        {mentees.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Mentees Yet</h3>
            <p className="text-gray-600">
              You don&apos;t have any assigned mentees yet. Check back later.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {mentees.map((mentee) => {
              const track = tracks.find((t) => t.id === mentee.trackId);
              return (
                <button
                  key={mentee.id}
                  onClick={() => viewMenteeDetails(mentee)}
                  className="w-full flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-left"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-deep to-purple-electric flex items-center justify-center text-white font-semibold">
                    {mentee.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{mentee.name}</p>
                    <p className="text-sm text-gray-600 truncate">{track?.name || "No track"}</p>
                  </div>
                  <div className="hidden sm:block w-32">
                    <ProgressBar
                      progress={mentee.completionPercentage}
                      showLabel={false}
                      size="sm"
                    />
                    <p className="text-xs text-gray-500 text-center mt-1">
                      {mentee.completionPercentage}%
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{mentee.progressCount}</span>
                    </div>
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
