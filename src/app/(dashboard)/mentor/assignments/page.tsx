"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Modal from "@/components/ui/Modal";
import { tracks } from "@/data/tracks";
import {
  Plus,
  Calendar,
  Edit2,
  Trash2,
  ExternalLink,
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

const trackOptions = tracks.map((t) => ({ value: t.id, label: t.name }));
const weekOptions = Array.from({ length: 12 }, (_, i) => ({
  value: String(i + 1),
  label: `Week ${i + 1}`,
}));

export default function MentorAssignmentsPage() {
  const { data: session } = useSession();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
  const [formData, setFormData] = useState({
    trackId: "",
    title: "",
    description: "",
    week: "",
    dueDate: "",
    resourceLinks: [] as { title: string; url: string; type: string }[],
  });
  const [newResource, setNewResource] = useState({ title: "", url: "", type: "article" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mentorTrackId = (session?.user as { trackId?: string })?.trackId;

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const url = mentorTrackId
          ? `/api/assignments?trackId=${mentorTrackId}`
          : "/api/assignments";
        const response = await fetch(url);
        const data = await response.json();
        setAssignments(data.assignments || []);
      } catch (error) {
        console.error("Failed to fetch assignments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssignments();
  }, [mentorTrackId]);

  const openCreateModal = () => {
    setEditingAssignment(null);
    setFormData({
      trackId: mentorTrackId || "",
      title: "",
      description: "",
      week: "",
      dueDate: "",
      resourceLinks: [],
    });
    setIsModalOpen(true);
  };

  const openEditModal = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setFormData({
      trackId: assignment.trackId,
      title: assignment.title,
      description: assignment.description,
      week: String(assignment.week),
      dueDate: assignment.dueDate,
      resourceLinks: assignment.resourceLinks.map((r) => ({
        title: r.title,
        url: r.url,
        type: r.type,
      })),
    });
    setIsModalOpen(true);
  };

  const addResource = () => {
    if (newResource.title && newResource.url) {
      setFormData((prev) => ({
        ...prev,
        resourceLinks: [...prev.resourceLinks, { ...newResource }],
      }));
      setNewResource({ title: "", url: "", type: "article" });
    }
  };

  const removeResource = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      resourceLinks: prev.resourceLinks.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const method = editingAssignment ? "PUT" : "POST";
      const body = editingAssignment
        ? { id: editingAssignment.id, ...formData, week: parseInt(formData.week) }
        : { ...formData, week: parseInt(formData.week) };

      const response = await fetch("/api/assignments", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (editingAssignment) {
        setAssignments((prev) =>
          prev.map((a) => (a.id === editingAssignment.id ? data.assignment : a))
        );
      } else {
        setAssignments((prev) => [...prev, data.assignment]);
      }

      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to save assignment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteAssignment = async (id: string) => {
    if (!confirm("Are you sure you want to delete this assignment?")) return;

    try {
      await fetch(`/api/assignments?id=${id}`, { method: "DELETE" });
      setAssignments((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      console.error("Failed to delete assignment:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-electric" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Assignments</h1>
          <p className="text-gray-600 mt-1">
            Create and manage weekly assignments and resources for your mentees.
          </p>
        </div>
        <Button onClick={openCreateModal}>
          <Plus className="w-5 h-5 mr-2" />
          New Assignment
        </Button>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {assignments.length === 0 ? (
          <Card variant="bordered" className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Assignments Yet</h3>
            <p className="text-gray-600 mb-4">
              Create your first assignment to get started.
            </p>
            <Button onClick={openCreateModal}>
              <Plus className="w-5 h-5 mr-2" />
              Create Assignment
            </Button>
          </Card>
        ) : (
          assignments.map((assignment) => {
            const track = tracks.find((t) => t.id === assignment.trackId);
            return (
              <Card key={assignment.id} variant="bordered">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="info">Week {assignment.week}</Badge>
                      <Badge variant="default">{track?.name}</Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {assignment.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{assignment.description}</p>

                    {/* Resource Links */}
                    {assignment.resourceLinks.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {assignment.resourceLinks.map((resource, index) => (
                          <a
                            key={index}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                          >
                            <LinkIcon className="w-4 h-4" />
                            {resource.title}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditModal(assignment)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteAssignment(assignment.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingAssignment ? "Edit Assignment" : "Create Assignment"}
        className="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Track"
              id="trackId"
              options={trackOptions}
              value={formData.trackId}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, trackId: e.target.value }))
              }
              required
            />
            <Select
              label="Week"
              id="week"
              options={weekOptions}
              value={formData.week}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, week: e.target.value }))
              }
              required
            />
          </div>

          <Input
            label="Title"
            id="title"
            type="text"
            placeholder="Assignment title"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-electric resize-none"
              rows={3}
              placeholder="What should mentees do this week?"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
            />
          </div>

          <Input
            label="Due Date (optional)"
            id="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, dueDate: e.target.value }))
            }
          />

          {/* Resource Links */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resource Links
            </label>
            {formData.resourceLinks.length > 0 && (
              <div className="space-y-2 mb-4">
                {formData.resourceLinks.map((resource, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                  >
                    <span className="flex-1 text-sm truncate">{resource.title}</span>
                    <Badge variant="default">{resource.type}</Badge>
                    <button
                      type="button"
                      onClick={() => removeResource(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="grid grid-cols-3 gap-2">
              <Input
                id="resourceTitle"
                type="text"
                placeholder="Title"
                value={newResource.title}
                onChange={(e) =>
                  setNewResource((prev) => ({ ...prev, title: e.target.value }))
                }
              />
              <Input
                id="resourceUrl"
                type="url"
                placeholder="https://..."
                value={newResource.url}
                onChange={(e) =>
                  setNewResource((prev) => ({ ...prev, url: e.target.value }))
                }
              />
              <Button type="button" variant="outline" onClick={addResource}>
                Add
              </Button>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting
                ? "Saving..."
                : editingAssignment
                ? "Update Assignment"
                : "Create Assignment"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
