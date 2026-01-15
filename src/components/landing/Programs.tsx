"use client";

import {
  GraduationCap,
  Code,
  Trophy,
  Building2,
  Users,
  Rocket,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const programs = [
  {
    icon: GraduationCap,
    title: "From Campus to Tech Careers",
    description:
      "Outreach and awareness sessions across university campuses, inspiring students and building awareness of tech opportunities.",
    color: "from-purple-deep to-purple-electric",
    bgColor: "bg-purple-50",
    shadowColor: "shadow-purple-electric/20",
    number: "01",
  },
  {
    icon: Code,
    title: "Code for Growth",
    description:
      "Structured bootcamps in coding, design, product management, and digital skills for hands-on learning.",
    color: "from-teal to-cyan-500",
    bgColor: "bg-cyan-50",
    shadowColor: "shadow-teal/20",
    number: "02",
  },
  {
    icon: Trophy,
    title: "TektonX Competitions",
    description:
      "Inter-school and inter-community hackathons, coding contests, and innovation challenges.",
    color: "from-yellow-brand to-orange-500",
    bgColor: "bg-yellow-50",
    shadowColor: "shadow-yellow-brand/20",
    number: "03",
  },
  {
    icon: Building2,
    title: "TektonX Hub",
    description:
      "Physical and virtual hub for young innovators with coworking spaces, training programs, and incubation support.",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    shadowColor: "shadow-green-500/20",
    number: "04",
  },
  {
    icon: Users,
    title: "Mentorship & Career Support",
    description:
      "Pairing participants with experienced tech professionals for career guidance and internship support.",
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50",
    shadowColor: "shadow-pink-500/20",
    number: "05",
  },
  {
    icon: Rocket,
    title: "Product-Building Labs",
    description:
      "A space where young people come together to co-create products and solutions for real impact.",
    color: "from-blue-deep to-indigo-600",
    bgColor: "bg-indigo-50",
    shadowColor: "shadow-blue-deep/20",
    number: "06",
  },
];

export default function Programs() {
  return (
    <section id="programs" className="py-24 relative overflow-hidden">
      {/* Colorful background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-purple-50/20 to-white" />

      {/* Decorative blobs */}
      <div className="absolute top-40 -left-20 w-80 h-80 bg-gradient-to-br from-purple-electric/10 to-teal/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 -right-20 w-80 h-80 bg-gradient-to-br from-yellow-brand/10 to-pink-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal/10 to-purple-electric/10 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-teal" />
            <span className="text-teal font-semibold text-sm uppercase tracking-wider">
              What We Offer
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="text-gray-900">Our </span>
            <span className="bg-gradient-to-r from-purple-deep via-purple-electric to-teal bg-clip-text text-transparent">Programs</span>
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            We offer a range of programs designed to meet you where you are and take you
            where you want to go in{" "}
            <span className="text-purple-electric font-semibold">tech</span>.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div
              key={program.title}
              className={`group relative ${program.bgColor} rounded-3xl p-8 border-2 border-transparent hover:border-white shadow-lg ${program.shadowColor} hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Number badge */}
              <div className={`absolute top-4 right-4 text-6xl font-bold bg-gradient-to-br ${program.color} bg-clip-text text-transparent opacity-10 group-hover:opacity-20 transition-opacity`}>
                {program.number}
              </div>

              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              {/* Icon with glow effect */}
              <div className="relative">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${program.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg ${program.shadowColor}`}
                >
                  <program.icon className="w-8 h-8 text-white" />
                </div>
                {/* Glow effect */}
                <div className={`absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300`} />
              </div>

              {/* Content */}
              <h3 className={`relative text-xl font-bold mb-3 bg-gradient-to-r ${program.color} bg-clip-text text-transparent`}>
                {program.title}
              </h3>
              <p className="relative text-gray-600 leading-relaxed mb-4">{program.description}</p>

              {/* Learn more link */}
              <div className={`flex items-center gap-2 text-sm font-semibold bg-gradient-to-r ${program.color} bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                Learn more <ArrowRight className="w-4 h-4" />
              </div>

              {/* Bottom gradient line */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${program.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
