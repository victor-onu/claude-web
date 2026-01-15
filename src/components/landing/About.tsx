"use client";

import { Heart, Globe, Lightbulb, Users2, Shield, Target, Sparkles } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Access for All",
    description: "We remove barriers to tech education and opportunities.",
    gradient: "from-purple-deep to-purple-electric",
    bgColor: "bg-purple-50",
    shadow: "shadow-purple-electric/20",
  },
  {
    icon: Lightbulb,
    title: "Empowerment",
    description: "We equip young people to build sustainable careers and solutions.",
    gradient: "from-yellow-brand to-green-light",
    bgColor: "bg-yellow-50",
    shadow: "shadow-yellow-brand/20",
  },
  {
    icon: Globe,
    title: "Innovation",
    description: "We nurture creativity and problem-solving with a future-focused mindset.",
    gradient: "from-teal to-blue-deep",
    bgColor: "bg-teal/10",
    shadow: "shadow-teal/20",
  },
  {
    icon: Users2,
    title: "Community",
    description: "We foster collaboration, networking, and shared growth.",
    gradient: "from-purple-electric to-teal",
    bgColor: "bg-purple-50",
    shadow: "shadow-purple-electric/20",
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "We remain transparent, ethical, and people-centered in all we do.",
    gradient: "from-green-light to-teal",
    bgColor: "bg-green-50",
    shadow: "shadow-green-light/20",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Colorful background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-white to-teal/5" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-deep via-purple-electric via-teal via-yellow-brand to-green-light" />
      <div className="absolute top-20 right-10 w-48 h-48 bg-gradient-to-br from-yellow-brand/20 to-green-light/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-gradient-to-br from-purple-electric/15 to-teal/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-teal/10 to-blue-deep/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-deep/10 to-purple-electric/10 px-4 py-2 rounded-full mb-4 border border-purple-electric/20">
            <Sparkles className="w-4 h-4 text-purple-electric" />
            <span className="text-purple-electric font-semibold text-sm uppercase tracking-wider">
              About Us
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="text-gray-900">Tekton means </span>
            <span className="bg-gradient-to-r from-purple-deep via-purple-electric to-teal bg-clip-text text-transparent">Builder</span>
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            TektonX Labs is a youth-focused tech empowerment and innovation lab dedicated to
            helping young people across Africa{" "}
            <span className="text-purple-deep font-semibold">discover</span>,{" "}
            <span className="text-purple-electric font-semibold">learn</span>, and{" "}
            <span className="text-teal font-semibold">create</span> in technology.
          </p>
        </div>

        {/* Vision & Mission with colorful cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="group relative p-8 rounded-3xl bg-white border-2 border-purple-electric/20 hover:border-purple-electric/40 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-deep/5 to-purple-electric/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-deep to-purple-electric rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-electric/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-deep to-purple-electric bg-clip-text text-transparent mb-4">Our Vision</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To become Africa&apos;s most impactful launchpad for young innovators, transforming
                untapped potential into{" "}
                <span className="text-purple-electric font-semibold">global tech talent</span> and solutions.
              </p>
            </div>

            {/* Corner decoration */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-purple-electric/10 to-teal/10 rounded-full" />
            {/* Bottom gradient line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-deep to-purple-electric transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </div>

          <div className="group relative p-8 rounded-3xl bg-white border-2 border-teal/20 hover:border-teal/40 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-green-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-teal to-green-light rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-teal/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-teal to-green-light bg-clip-text text-transparent mb-4">Our Mission</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To empower young people with the{" "}
                <span className="text-teal font-semibold">skills</span>,{" "}
                <span className="text-green-600 font-semibold">mentorship</span>, and{" "}
                <span className="text-blue-deep font-semibold">opportunities</span> needed to
                succeed in technology and innovation.
              </p>
            </div>

            {/* Corner decoration */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-teal/10 to-green-light/10 rounded-full" />
            {/* Bottom gradient line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal to-green-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </div>
        </div>

        {/* Core Values with vibrant brand colors */}
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold">
            <span className="text-gray-900">Our </span>
            <span className="bg-gradient-to-r from-yellow-brand via-green-light to-teal bg-clip-text text-transparent">Core Values</span>
          </h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {values.map((value, index) => (
            <div
              key={value.title}
              className={`group relative ${value.bgColor} p-6 rounded-2xl border-2 border-transparent hover:border-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${value.shadow} text-center overflow-hidden`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

              <div className={`w-14 h-14 bg-gradient-to-br ${value.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg ${value.shadow}`}>
                <value.icon className="w-7 h-7 text-white" />
              </div>
              <h4 className={`font-bold text-lg mb-2 bg-gradient-to-r ${value.gradient} bg-clip-text text-transparent`}>
                {value.title}
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed relative">{value.description}</p>

              {/* Hover indicator */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${value.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
