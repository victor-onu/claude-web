"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { tracks } from "@/data/tracks";
import {
  Calendar,
  ExternalLink,
  FileText,
  Video,
  BookOpen,
  Code,
  Link as LinkIcon,
} from "lucide-react";
import { ResourceLink } from "@/types";

interface Assignment {
  id: string;
  trackId: string;
  title: string;
  description: string;
  resourceLinks: ResourceLink[];
  dueDate: string;
  week: number;
}

const resourceTypeIcons: Record<string, typeof FileText> = {
  video: Video,
  article: FileText,
  documentation: BookOpen,
  tutorial: Code,
  other: LinkIcon,
};

export default function AssignmentsPage() {
  const { data: session } = useSession();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

  const trackId = (session?.user as { trackId?: string })?.trackId;
  const track = trackId ? tracks.find((t) => t.id === trackId) : null;

  useEffect(() => {
    const fetchAssignments = async () => {
      if (!trackId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/assignments?trackId=${trackId}`);
        const data = await response.json();
        setAssignments(data.assignments || []);
      } catch (error) {
        console.error("Failed to fetch assignments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignments();
  }, [trackId]);

  // Generate week assignments from track data if no custom assignments exist
  const getWeekContent = (week: number) => {
    // Check for custom assignments first
    const customAssignment = assignments.find((a) => a.week === week);
    if (customAssignment) return customAssignment;

    // Otherwise, get task from track data
    if (!track) return null;

    for (const milestone of track.milestones) {
      const task = milestone.tasks.find((t) => t.week === week);
      if (task) {
        return {
          id: task.id,
          trackId: track.id,
          title: task.title,
          description: task.description,
          resourceLinks: task.resourceLinks,
          dueDate: "",
          week: task.week,
          milestone: milestone.title,
        };
      }
    }
    return null;
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
        <p className="text-gray-600">Please select a track to view assignments.</p>
      </Card>
    );
  }

  const weeks = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Badge variant="info" className="mb-2">{track.name}</Badge>
        <h1 className="text-2xl font-bold text-gray-900">Weekly Assignments</h1>
        <p className="text-gray-600 mt-1">
          View your weekly tasks, resources, and learning materials.
        </p>
      </div>

      {/* Week Selector */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedWeek === null ? "primary" : "outline"}
          size="sm"
          onClick={() => setSelectedWeek(null)}
        >
          All Weeks
        </Button>
        {weeks.map((week) => (
          <Button
            key={week}
            variant={selectedWeek === week ? "primary" : "outline"}
            size="sm"
            onClick={() => setSelectedWeek(week)}
          >
            Week {week}
          </Button>
        ))}
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {weeks
          .filter((week) => selectedWeek === null || selectedWeek === week)
          .map((week) => {
            const content = getWeekContent(week);
            if (!content) return null;

            return (
              <Card key={week} variant="bordered">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-purple-electric" />
                      <Badge variant="info">Week {week}</Badge>
                      {"milestone" in content && (
                        <Badge variant="default">{content.milestone}</Badge>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {content.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{content.description}</p>

                    {/* Resource Links */}
                    {content.resourceLinks && content.resourceLinks.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">Resources:</p>
                        <div className="flex flex-wrap gap-2">
                          {content.resourceLinks.map((resource: ResourceLink) => {
                            const Icon = resourceTypeIcons[resource.type] || LinkIcon;
                            return (
                              <a
                                key={resource.id}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors"
                              >
                                <Icon className="w-4 h-4" />
                                {resource.title}
                                <ExternalLink className="w-3 h-3 text-gray-400" />
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Due Date */}
                    {content.dueDate && (
                      <p className="text-sm text-gray-500 mt-4">
                        Due: {new Date(content.dueDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
      </div>

      {/* Empty State */}
      {selectedWeek !== null && !getWeekContent(selectedWeek) && (
        <Card variant="bordered" className="text-center py-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Assignment for Week {selectedWeek}
          </h3>
          <p className="text-gray-600">
            Check back later or contact your mentor for guidance.
          </p>
        </Card>
      )}
    </div>
  );
}
