"use client";

import { useSession } from "next-auth/react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { tracks } from "@/data/tracks";
import { User, Mail, BookOpen, Shield } from "lucide-react";

export default function SettingsPage() {
  const { data: session } = useSession();

  const trackId = (session?.user as { trackId?: string })?.trackId;
  const track = trackId ? tracks.find((t) => t.id === trackId) : null;
  const role = session?.user?.role || "mentee";

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-600 mt-1">
          View and manage your account information.
        </p>
      </div>

      {/* Profile Info */}
      <Card variant="bordered">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h2>

        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-deep to-purple-electric flex items-center justify-center text-white">
              <User className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Full Name</p>
              <p className="font-medium text-gray-900">{session?.user?.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <Mail className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email Address</p>
              <p className="font-medium text-gray-900">{session?.user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <div className="flex items-center gap-2">
                <p className="font-medium text-gray-900 capitalize">{role}</p>
                <Badge
                  variant={
                    role === "admin"
                      ? "error"
                      : role === "mentor"
                      ? "info"
                      : "success"
                  }
                >
                  {role}
                </Badge>
              </div>
            </div>
          </div>

          {track && (
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-teal/20 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-teal" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Enrolled Track</p>
                <p className="font-medium text-gray-900">{track.name}</p>
                <p className="text-xs text-gray-500">{track.description}</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Program Info */}
      <Card variant="bordered">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Program Information</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Program Name</span>
            <span className="font-medium text-gray-900">From Campus to Tech Careers 2025</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Duration</span>
            <span className="font-medium text-gray-900">3 Months (12 Weeks)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Format</span>
            <span className="font-medium text-gray-900">Hybrid (Online + In-person)</span>
          </div>
        </div>
      </Card>

      {/* Help */}
      <Card variant="bordered">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h2>
        <p className="text-gray-600 mb-4">
          If you have questions or need assistance, reach out to the TektonX team.
        </p>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:support@tektonxlabs.org" className="text-purple-electric hover:underline">
              support@tektonxlabs.org
            </a>
          </p>
          <p>
            <strong>WhatsApp:</strong> Join the main program group for announcements
          </p>
        </div>
      </Card>
    </div>
  );
}
