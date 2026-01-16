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
    color: "#670EB3",
    bgColor: "#f3e8ff",
    number: "01",
  },
  {
    icon: Code,
    title: "Code for Growth",
    description:
      "Structured bootcamps in coding, design, product management, and digital skills for hands-on learning.",
    color: "#59D6E6",
    bgColor: "#cffafe",
    number: "02",
  },
  {
    icon: Trophy,
    title: "TektonX Competitions",
    description:
      "Inter-school and inter-community hackathons, coding contests, and innovation challenges.",
    color: "#FFD761",
    bgColor: "#fef9c3",
    number: "03",
  },
  {
    icon: Building2,
    title: "TektonX Hub",
    description:
      "Physical and virtual hub for young innovators with coworking spaces, training programs, and incubation support.",
    color: "#BFEE7F",
    bgColor: "#ecfccb",
    number: "04",
  },
  {
    icon: Users,
    title: "Mentorship & Career Support",
    description:
      "Pairing participants with experienced tech professionals for career guidance and internship support.",
    color: "#A41AFF",
    bgColor: "#f3e8ff",
    number: "05",
  },
  {
    icon: Rocket,
    title: "Product-Building Labs",
    description:
      "A space where young people come together to co-create products and solutions for real impact.",
    color: "#002BA1",
    bgColor: "#dbeafe",
    number: "06",
  },
];

export default function Programs() {
  return (
    <section id="programs" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-purple-50/20 to-white" />

      {/* Decorative blobs */}
      <div className="absolute top-40 -left-20 w-80 h-80 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(164,26,255,0.1) 0%, rgba(89,214,230,0.1) 100%)" }} />
      <div className="absolute bottom-40 -right-20 w-80 h-80 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(255,215,97,0.1) 0%, rgba(191,238,127,0.1) 100%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-cyan-200">
            <Sparkles className="w-4 h-4" style={{ color: "#59D6E6" }} />
            <span className="font-semibold text-sm uppercase tracking-wider" style={{ color: "#59D6E6" }}>
              What We Offer
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="text-gray-900">Our </span>
            <span style={{ color: "#A41AFF" }}>Programs</span>
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            We offer a range of programs designed to meet you where you are and take you
            where you want to go in{" "}
            <span className="font-semibold" style={{ color: "#A41AFF" }}>tech</span>.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div
              key={program.title}
              className="group relative rounded-3xl p-8 border-2 border-transparent hover:border-white shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2"
              style={{ backgroundColor: program.bgColor, animationDelay: `${index * 0.1}s` }}
            >
              {/* Number badge */}
              <div className="absolute top-4 right-4 text-6xl font-bold opacity-10 group-hover:opacity-20 transition-opacity" style={{ color: program.color }}>
                {program.number}
              </div>

              {/* Icon */}
              <div className="relative">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg"
                  style={{ backgroundColor: program.color }}
                >
                  <program.icon className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Content */}
              <h3 className="relative text-xl font-bold mb-3" style={{ color: program.color }}>
                {program.title}
              </h3>
              <p className="relative text-gray-600 leading-relaxed mb-4">{program.description}</p>

              {/* Learn more link */}
              <div className="flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: program.color }}>
                Learn more <ArrowRight className="w-4 h-4" />
              </div>

              {/* Bottom accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ backgroundColor: program.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
