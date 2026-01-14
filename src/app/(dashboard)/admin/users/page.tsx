"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { tracks } from "@/data/tracks";
import { Users, Search, Filter } from "lucide-react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  trackId?: string;
  createdAt: string;
}

const roleOptions = [
  { value: "", label: "All Roles" },
  { value: "mentor", label: "Mentors" },
  { value: "mentee", label: "Mentees" },
  { value: "admin", label: "Admins" },
];

const trackOptions = [
  { value: "", label: "All Tracks" },
  ...tracks.map((t) => ({ value: t.id, label: t.name })),
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [trackFilter, setTrackFilter] = useState("");

  useEffect(() => {
    // Simulate fetching users
    const fetchUsers = async () => {
      // In a real app, this would fetch from the API
      setTimeout(() => {
        setUsers([
          {
            id: "1",
            name: "Admin User",
            email: "admin@tektonxlabs.org",
            role: "admin",
            createdAt: new Date().toISOString(),
          },
          {
            id: "2",
            name: "John Developer",
            email: "mentor.dev@tektonxlabs.org",
            role: "mentor",
            trackId: "software-development",
            createdAt: new Date().toISOString(),
          },
          {
            id: "3",
            name: "Jane Designer",
            email: "mentor.design@tektonxlabs.org",
            role: "mentor",
            trackId: "ui-ux-design",
            createdAt: new Date().toISOString(),
          },
          {
            id: "4",
            name: "Alice Student",
            email: "mentee1@example.com",
            role: "mentee",
            trackId: "software-development",
            createdAt: new Date().toISOString(),
          },
          {
            id: "5",
            name: "Bob Learner",
            email: "mentee2@example.com",
            role: "mentee",
            trackId: "ui-ux-design",
            createdAt: new Date().toISOString(),
          },
        ]);
        setIsLoading(false);
      }, 500);
    };

    fetchUsers();
  }, []);

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = !roleFilter || user.role === roleFilter;
    const matchesTrack = !trackFilter || user.trackId === trackFilter;
    return matchesSearch && matchesRole && matchesTrack;
  });

  // Count by role
  const mentorCount = users.filter((u) => u.role === "mentor").length;
  const menteeCount = users.filter((u) => u.role === "mentee").length;
  const adminCount = users.filter((u) => u.role === "admin").length;

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
      <div>
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600 mt-1">
          View and manage all users in the platform.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card variant="bordered" className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            <p className="text-sm text-gray-600">Total Users</p>
          </div>
        </Card>

        <Card variant="bordered">
          <p className="text-sm text-gray-600">Mentors</p>
          <p className="text-2xl font-bold text-purple-deep">{mentorCount}</p>
        </Card>

        <Card variant="bordered">
          <p className="text-sm text-gray-600">Mentees</p>
          <p className="text-2xl font-bold text-teal">{menteeCount}</p>
        </Card>

        <Card variant="bordered">
          <p className="text-sm text-gray-600">Admins</p>
          <p className="text-2xl font-bold text-gray-900">{adminCount}</p>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="search"
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="w-full md:w-48">
          <Select
            id="roleFilter"
            options={roleOptions}
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          />
        </div>
        <div className="w-full md:w-48">
          <Select
            id="trackFilter"
            options={trackOptions}
            value={trackFilter}
            onChange={(e) => setTrackFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Users Table */}
      <Card variant="elevated">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 font-medium text-gray-600">User</th>
                <th className="text-left py-4 px-4 font-medium text-gray-600">Role</th>
                <th className="text-left py-4 px-4 font-medium text-gray-600">Track</th>
                <th className="text-left py-4 px-4 font-medium text-gray-600">Joined</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => {
                const track = tracks.find((t) => t.id === user.trackId);
                return (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-deep to-purple-electric flex items-center justify-center text-white font-semibold">
                          {user.name[0]}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        variant={
                          user.role === "admin"
                            ? "error"
                            : user.role === "mentor"
                            ? "info"
                            : "success"
                        }
                      >
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      {track ? (
                        <span className="text-gray-700">{track.name}</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No users match your filters.</p>
          </div>
        )}
      </Card>
    </div>
  );
}
