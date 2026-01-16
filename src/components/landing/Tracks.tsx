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
    color: "#670EB3",
    bgColor: "#f3e8ff",
  },
  {
    icon: Palette,
    name: "UI/UX Design",
    description: "User interface and experience design",
    skills: ["Design Principles", "Figma", "Prototyping", "User Testing"],
    color: "#A41AFF",
    bgColor: "#fae8ff",
  },
  {
    icon: Smartphone,
    name: "Mobile Development",
    description: "Cross-platform mobile apps",
    skills: ["Flutter/React Native", "UI Components", "State Management"],
    color: "#59D6E6",
    bgColor: "#cffafe",
  },
  {
    icon: LayoutDashboard,
    name: "Product Management",
    description: "Product lifecycle and strategy",
    skills: ["Agile/Scrum", "PRDs", "User Stories", "Case Studies"],
    color: "#FFD761",
    bgColor: "#fef9c3",
  },
  {
    icon: ShieldCheck,
    name: "Quality Assurance",
    description: "Software testing and quality",
    skills: ["Test Cases", "Bug Reports", "Automation"],
    color: "#BFEE7F",
    bgColor: "#ecfccb",
  },
  {
    icon: BarChart3,
    name: "Data Analysis",
    description: "Data analysis and visualization",
    skills: ["Excel/SQL", "Python/Pandas", "Visualization"],
    color: "#002BA1",
    bgColor: "#dbeafe",
  },
  {
    icon: Lock,
    name: "Cybersecurity",
    description: "Security and defense",
    skills: ["Security Basics", "Encryption", "Threat Analysis"],
    color: "#670EB3",
    bgColor: "#ede9fe",
  },
];

const infoBadges = [
  { icon: Clock, label: "12 Weeks", color: "#670EB3" },
  { icon: Target, label: "3 Milestones", color: "#59D6E6" },
  { icon: Sparkles, label: "Expert Mentors", color: "#FFD761" },
];

export default function Tracks() {
  return (
    <section id="tracks" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-white to-cyan-50/30" />

      {/* Top accent bar */}
      <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #670EB3, #A41AFF, #59D6E6, #FFD761, #BFEE7F)" }} />

      {/* Decorative blobs */}
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(164,26,255,0.1) 0%, rgba(89,214,230,0.1) 100%)" }} />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(255,215,97,0.1) 0%, rgba(191,238,127,0.1) 100%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-yellow-200">
            <Sparkles className="w-4 h-4" style={{ color: "#FFD761" }} />
            <span className="font-semibold text-sm uppercase tracking-wider" style={{ color: "#d97706" }}>
              Learning Paths
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="text-gray-900">Choose Your </span>
            <span style={{ color: "#A41AFF" }}>Track</span>
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Our{" "}
            <span className="font-semibold" style={{ color: "#670EB3" }}>3-month</span> mentorship program offers{" "}
            <span className="font-semibold" style={{ color: "#A41AFF" }}>7 specialized tracks</span>. Each track has
            3 milestones with weekly tasks and mentor guidance.
          </p>

          {/* Info badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {infoBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-gray-100">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: badge.color }}
                >
                  <badge.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tracks Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tracks.map((track, index) => (
            <div
              key={track.name}
              className="group relative rounded-3xl p-6 border-2 border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              style={{ backgroundColor: track.bgColor, animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="relative mb-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg"
                  style={{ backgroundColor: track.color }}
                >
                  <track.icon className="w-7 h-7 text-white" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold mb-2" style={{ color: track.color }}>
                {track.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">{track.description}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {track.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1 rounded-full bg-white/80 text-gray-700 font-medium shadow-sm border border-gray-100"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Bottom accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ backgroundColor: track.color }}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link href="/signup">
            <Button size="lg" className="group shadow-xl hover:shadow-2xl transition-all duration-300">
              <Sparkles className="mr-2 w-5 h-5" />
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            Join <span className="font-semibold" style={{ color: "#A41AFF" }}>500+</span> builders already on the platform
          </p>
        </div>
      </div>
    </section>
  );
}
