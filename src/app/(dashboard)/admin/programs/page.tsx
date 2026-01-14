"use client";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { tracks } from "@/data/tracks";
import { Calendar, Users, BookOpen, CheckCircle } from "lucide-react";

export default function AdminProgramsPage() {
  // Current active program
  const currentProgram = {
    id: "program-2025-q1",
    name: "From Campus to Tech Careers 2025",
    description: "3-month mentorship program for young African tech enthusiasts",
    startDate: "2025-01-01",
    endDate: "2025-03-31",
    status: "active" as const,
    totalMentees: 500,
    totalMentors: 25,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Program Management</h1>
        <p className="text-gray-600 mt-1">
          View and manage mentorship programs.
        </p>
      </div>

      {/* Current Program */}
      <Card variant="elevated">
        <div className="flex items-start justify-between mb-6">
          <div>
            <Badge variant="success">Active Program</Badge>
            <h2 className="text-xl font-bold text-gray-900 mt-2">
              {currentProgram.name}
            </h2>
            <p className="text-gray-600 mt-1">{currentProgram.description}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <Calendar className="w-6 h-6 text-purple-electric" />
            <div>
              <p className="text-sm text-gray-600">Duration</p>
              <p className="font-semibold text-gray-900">3 Months</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <Users className="w-6 h-6 text-teal" />
            <div>
              <p className="text-sm text-gray-600">Mentees</p>
              <p className="font-semibold text-gray-900">{currentProgram.totalMentees}+</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <Users className="w-6 h-6 text-purple-deep" />
            <div>
              <p className="text-sm text-gray-600">Mentors</p>
              <p className="font-semibold text-gray-900">{currentProgram.totalMentors}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
            <BookOpen className="w-6 h-6 text-green-500" />
            <div>
              <p className="text-sm text-gray-600">Tracks</p>
              <p className="font-semibold text-gray-900">{tracks.length}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Tracks Overview */}
      <Card variant="elevated">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Available Tracks</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="p-4 border border-gray-200 rounded-xl hover:border-purple-electric transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: track.color }}
                />
                <h3 className="font-semibold text-gray-900">{track.name}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">{track.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>{track.milestones.length} milestones</span>
                <span>
                  {track.milestones.reduce((sum, m) => sum + m.tasks.length, 0)} tasks
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Program Timeline */}
      <Card variant="elevated">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Program Timeline</h2>
        <div className="space-y-4">
          {[
            { week: "Week 1", title: "Kickoff & Introductions", status: "completed" },
            { week: "Weeks 1-4", title: "Milestone 1: Foundations", status: "completed" },
            { week: "Weeks 5-8", title: "Milestone 2: Core Skills", status: "in-progress" },
            { week: "Weeks 9-12", title: "Milestone 3: Advanced & Projects", status: "upcoming" },
            { week: "Week 12", title: "Demo Day & Graduation", status: "upcoming" },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  item.status === "completed"
                    ? "bg-green-100"
                    : item.status === "in-progress"
                    ? "bg-yellow-100"
                    : "bg-gray-100"
                }`}
              >
                {item.status === "completed" ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <div
                    className={`w-3 h-3 rounded-full ${
                      item.status === "in-progress" ? "bg-yellow-500" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-500">{item.week}</p>
              </div>
              <Badge
                variant={
                  item.status === "completed"
                    ? "success"
                    : item.status === "in-progress"
                    ? "warning"
                    : "default"
                }
              >
                {item.status === "completed"
                  ? "Completed"
                  : item.status === "in-progress"
                  ? "In Progress"
                  : "Upcoming"}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
