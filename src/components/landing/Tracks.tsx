"use client";

import Link from "next/link";
import {
  Code2,
  Palette,
  Smartphone,
  LayoutDashboard,
  ShieldCheck,
  BarChart3,
  Lock,
  ArrowRight,
  Sparkles,
  Clock,
  Target,
} from "lucide-react";
import Button from "@/components/ui/Button";

const tracks = [
  {
    icon: Code2,
    name: "Software Development",
    description: "Frontend & Backend web development",
    skills: ["HTML/CSS", "JavaScript", "Node.js", "APIs"],
    gradient: "from-purple-deep to-purple-electric",
    bgGradient: "from-purple-100 to-purple-50",
    shadowColor: "shadow-purple-electric/30",
  },
  {
    icon: Palette,
    name: "UI/UX Design",
    description: "User interface and experience design",
    skills: ["Design Principles", "Figma", "Prototyping", "User Testing"],
    gradient: "from-pink-500 to-rose-500",
    bgGradient: "from-pink-100 to-pink-50",
    shadowColor: "shadow-pink-500/30",
  },
  {
    icon: Smartphone,
    name: "Mobile Development",
    description: "Cross-platform mobile apps",
    skills: ["Flutter/React Native", "UI Components", "State Management"],
    gradient: "from-teal to-cyan-500",
    bgGradient: "from-cyan-100 to-cyan-50",
    shadowColor: "shadow-teal/30",
  },
  {
    icon: LayoutDashboard,
    name: "Product Management",
    description: "Product lifecycle and strategy",
    skills: ["Agile/Scrum", "PRDs", "User Stories", "Case Studies"],
    gradient: "from-yellow-brand to-orange-500",
    bgGradient: "from-yellow-100 to-yellow-50",
    shadowColor: "shadow-yellow-brand/30",
  },
  {
    icon: ShieldCheck,
    name: "Quality Assurance",
    description: "Software testing and quality",
    skills: ["Test Cases", "Bug Reports", "Automation"],
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-100 to-green-50",
    shadowColor: "shadow-green-500/30",
  },
  {
    icon: BarChart3,
    name: "Data Analysis",
    description: "Data analysis and visualization",
    skills: ["Excel/SQL", "Python/Pandas", "Visualization"],
    gradient: "from-blue-deep to-indigo-600",
    bgGradient: "from-indigo-100 to-indigo-50",
    shadowColor: "shadow-blue-deep/30",
  },
  {
    icon: Lock,
    name: "Cybersecurity",
    description: "Security and defense",
    skills: ["Security Basics", "Encryption", "Threat Analysis"],
    gradient: "from-red-500 to-rose-600",
    bgGradient: "from-red-100 to-red-50",
    shadowColor: "shadow-red-500/30",
  },
];

export default function Tracks() {
  return (
    <section id="tracks" className="py-24 relative overflow-hidden">
      {/* Colorful gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-teal/10" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-deep via-teal via-yellow-brand to-green-light" />
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-purple-electric/10 to-teal/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-gradient-to-br from-yellow-brand/10 to-pink-500/10 rounded-full blur-3xl" />

      {/* Animated floating shapes */}
      <div className="absolute top-40 left-10 w-16 h-16 bg-gradient-to-br from-purple-electric to-teal rounded-xl rotate-12 opacity-10 animate-bounce hidden lg:block" style={{ animationDuration: "4s" }} />
      <div className="absolute bottom-40 right-10 w-12 h-12 bg-gradient-to-br from-yellow-brand to-orange-500 rounded-full opacity-10 animate-bounce hidden lg:block" style={{ animationDuration: "3s", animationDelay: "1s" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-brand/10 to-orange-500/10 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-yellow-600" />
            <span className="text-yellow-600 font-semibold text-sm uppercase tracking-wider">
              Learning Paths
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="text-gray-900">Choose Your </span>
            <span className="bg-gradient-to-r from-purple-deep via-purple-electric to-teal bg-clip-text text-transparent">Track</span>
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Our{" "}
            <span className="text-purple-deep font-semibold">3-month</span> mentorship program offers{" "}
            <span className="text-purple-electric font-semibold">7 specialized tracks</span>. Each track has
            3 milestones with weekly tasks and mentor guidance.
          </p>

          {/* Quick info badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
              <Clock className="w-4 h-4 text-purple-electric" />
              <span className="text-sm font-medium text-gray-700">12 Weeks</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
              <Target className="w-4 h-4 text-teal" />
              <span className="text-sm font-medium text-gray-700">3 Milestones</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md">
              <Sparkles className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium text-gray-700">Expert Mentors</span>
            </div>
          </div>
        </div>

        {/* Tracks Grid with colorful cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tracks.map((track, index) => (
            <div
              key={track.name}
              className={`group relative bg-gradient-to-br ${track.bgGradient} rounded-3xl p-6 border-2 border-white/50 shadow-lg ${track.shadowColor} hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${track.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

              {/* Icon with animated glow */}
              <div className="relative mb-4">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${track.gradient} flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg ${track.shadowColor}`}
                >
                  <track.icon className="w-7 h-7 text-white" />
                </div>
                {/* Glow effect */}
                <div className={`absolute inset-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${track.gradient} opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300`} />
              </div>

              {/* Content */}
              <h3 className={`text-lg font-bold mb-2 bg-gradient-to-r ${track.gradient} bg-clip-text text-transparent`}>
                {track.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">{track.description}</p>

              {/* Skills with colorful tags */}
              <div className="flex flex-wrap gap-2">
                {track.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1 rounded-full bg-white/80 text-gray-700 font-medium shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Bottom gradient line */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${track.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
            </div>
          ))}
        </div>

        {/* CTA with colorful styling */}
        <div className="text-center mt-16">
          <Link href="/signup">
            <Button size="lg" className="group shadow-xl shadow-purple-electric/25 hover:shadow-2xl hover:shadow-purple-electric/40 transition-all duration-300">
              <Sparkles className="mr-2 w-5 h-5" />
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            Join <span className="text-purple-electric font-semibold">500+</span> builders already on the platform
          </p>
        </div>
      </div>
    </section>
  );
}
