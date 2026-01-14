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
} from "lucide-react";
import Button from "@/components/ui/Button";

const tracks = [
  {
    icon: Code2,
    name: "Software Development",
    description: "Frontend & Backend web development",
    skills: ["HTML/CSS", "JavaScript", "Node.js", "APIs"],
    color: "#670EB3",
  },
  {
    icon: Palette,
    name: "UI/UX Design",
    description: "User interface and experience design",
    skills: ["Design Principles", "Figma", "Prototyping", "User Testing"],
    color: "#A41AFF",
  },
  {
    icon: Smartphone,
    name: "Mobile Development",
    description: "Cross-platform mobile apps",
    skills: ["Flutter/React Native", "UI Components", "State Management", "APIs"],
    color: "#59D6E6",
  },
  {
    icon: LayoutDashboard,
    name: "Product Management",
    description: "Product lifecycle and strategy",
    skills: ["Agile/Scrum", "PRDs", "User Stories", "Case Studies"],
    color: "#FFD761",
  },
  {
    icon: ShieldCheck,
    name: "Quality Assurance",
    description: "Software testing and quality",
    skills: ["Test Cases", "Bug Reports", "Automation", "Selenium/Cypress"],
    color: "#BFEE7F",
  },
  {
    icon: BarChart3,
    name: "Data Analysis",
    description: "Data analysis and visualization",
    skills: ["Excel/SQL", "Python/Pandas", "Data Cleaning", "Visualization"],
    color: "#002BA1",
  },
  {
    icon: Lock,
    name: "Cybersecurity",
    description: "Security and defense",
    skills: ["Security Basics", "Encryption", "App Security", "Threat Analysis"],
    color: "#670EB3",
  },
];

export default function Tracks() {
  return (
    <section id="tracks" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-purple-electric font-semibold text-sm uppercase tracking-wider">
            Learning Paths
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
            Choose Your <span className="gradient-text">Track</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Our 3-month mentorship program offers 7 specialized tracks. Each track has
            3 milestones with weekly tasks and mentor guidance.
          </p>
        </div>

        {/* Tracks Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tracks.map((track) => (
            <div
              key={track.name}
              className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300"
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${track.color}15` }}
              >
                <track.icon
                  className="w-6 h-6"
                  style={{ color: track.color }}
                />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {track.name}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{track.description}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {track.skills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href="/signup">
            <Button size="lg" className="group">
              Apply Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
