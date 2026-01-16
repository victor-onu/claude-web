"use client";

import { Heart, Globe, Lightbulb, Users2, Shield, Target, Sparkles } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Access for All",
    description: "We remove barriers to tech education and opportunities.",
    color: "#670EB3",
    bgColor: "#f3e8ff",
  },
  {
    icon: Lightbulb,
    title: "Empowerment",
    description: "We equip young people to build sustainable careers and solutions.",
    color: "#FFD761",
    bgColor: "#fef9c3",
  },
  {
    icon: Globe,
    title: "Innovation",
    description: "We nurture creativity and problem-solving with a future-focused mindset.",
    color: "#59D6E6",
    bgColor: "#cffafe",
  },
  {
    icon: Users2,
    title: "Community",
    description: "We foster collaboration, networking, and shared growth.",
    color: "#A41AFF",
    bgColor: "#f3e8ff",
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "We remain transparent, ethical, and people-centered in all we do.",
    color: "#BFEE7F",
    bgColor: "#ecfccb",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-white to-cyan-50/30" />

      {/* Top accent bar */}
      <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #670EB3, #A41AFF, #59D6E6, #FFD761, #BFEE7F)" }} />

      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-48 h-48 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(255,215,97,0.2) 0%, rgba(191,238,127,0.1) 100%)" }} />
      <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(164,26,255,0.15) 0%, rgba(89,214,230,0.1) 100%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-purple-200">
            <Sparkles className="w-4 h-4" style={{ color: "#A41AFF" }} />
            <span className="font-semibold text-sm uppercase tracking-wider" style={{ color: "#A41AFF" }}>
              About Us
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="text-gray-900">Tekton means </span>
            <span style={{ color: "#A41AFF" }}>Builder</span>
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            TektonX Labs is a youth-focused tech empowerment and innovation lab dedicated to
            helping young people across Africa{" "}
            <span className="font-semibold" style={{ color: "#670EB3" }}>discover</span>,{" "}
            <span className="font-semibold" style={{ color: "#A41AFF" }}>learn</span>, and{" "}
            <span className="font-semibold" style={{ color: "#59D6E6" }}>create</span> in technology.
          </p>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Vision */}
          <div className="group relative p-8 rounded-3xl bg-white border-2 border-purple-100 hover:border-purple-300 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <div className="relative">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-all duration-300"
                style={{ backgroundColor: "#670EB3" }}
              >
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: "#670EB3" }}>Our Vision</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To become Africa&apos;s most impactful launchpad for young innovators, transforming
                untapped potential into{" "}
                <span className="font-semibold" style={{ color: "#A41AFF" }}>global tech talent</span> and solutions.
              </p>
            </div>
            {/* Bottom accent */}
            <div
              className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
              style={{ backgroundColor: "#670EB3" }}
            />
          </div>

          {/* Mission */}
          <div className="group relative p-8 rounded-3xl bg-white border-2 border-cyan-100 hover:border-cyan-300 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <div className="relative">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-all duration-300"
                style={{ backgroundColor: "#59D6E6" }}
              >
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: "#59D6E6" }}>Our Mission</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To empower young people with the{" "}
                <span className="font-semibold" style={{ color: "#59D6E6" }}>skills</span>,{" "}
                <span className="font-semibold" style={{ color: "#BFEE7F" }}>mentorship</span>, and{" "}
                <span className="font-semibold" style={{ color: "#002BA1" }}>opportunities</span> needed to
                succeed in technology and innovation.
              </p>
            </div>
            {/* Bottom accent */}
            <div
              className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
              style={{ backgroundColor: "#59D6E6" }}
            />
          </div>
        </div>

        {/* Core Values */}
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold">
            <span className="text-gray-900">Our </span>
            <span style={{ color: "#FFD761" }}>Core </span>
            <span style={{ color: "#BFEE7F" }}>Values</span>
          </h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="group relative p-6 rounded-2xl border-2 border-transparent hover:border-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl text-center overflow-hidden"
              style={{ backgroundColor: value.bgColor, animationDelay: `${index * 0.1}s` }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg"
                style={{ backgroundColor: value.color }}
              >
                <value.icon className="w-7 h-7 text-white" />
              </div>
              <h4 className="font-bold text-lg mb-2" style={{ color: value.color }}>
                {value.title}
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
              {/* Bottom accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ backgroundColor: value.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
