"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import { ArrowRight, Users, Rocket, Award, Code, Sparkles, Zap, Database, Globe, Terminal } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "Young Builders", color: "#A41AFF" },
  { icon: Rocket, value: "7", label: "Tech Tracks", color: "#59D6E6" },
  { icon: Award, value: "3 Months", label: "Program Duration", color: "#FFD761" },
];

const floatingIcons = [
  { icon: Code, position: "top-32 left-[10%]", delay: "0s", bg: "#670EB3" },
  { icon: Database, position: "top-48 right-[15%]", delay: "1s", bg: "#59D6E6" },
  { icon: Globe, position: "bottom-48 left-[15%]", delay: "2s", bg: "#FFD761" },
  { icon: Terminal, position: "bottom-32 right-[10%]", delay: "0.5s", bg: "#BFEE7F" },
  { icon: Sparkles, position: "top-40 left-[30%]", delay: "1.5s", bg: "#A41AFF" },
  { icon: Zap, position: "bottom-40 right-[30%]", delay: "2.5s", bg: "#002BA1" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50 to-cyan-50" />

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full blur-3xl animate-pulse" style={{ background: "radial-gradient(circle, rgba(164,26,255,0.2) 0%, rgba(103,14,179,0.1) 100%)" }} />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full blur-3xl animate-pulse" style={{ background: "radial-gradient(circle, rgba(89,214,230,0.2) 0%, rgba(0,43,161,0.1) 100%)", animationDelay: "1s" }} />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl animate-pulse" style={{ background: "radial-gradient(circle, rgba(255,215,97,0.15) 0%, rgba(191,238,127,0.1) 100%)", animationDelay: "2s" }} />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(103,14,179,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(103,14,179,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Floating shapes */}
        <div className="absolute top-1/4 right-1/4 w-24 h-24 rounded-2xl rotate-12 opacity-20 animate-bounce hidden lg:block" style={{ background: "linear-gradient(135deg, #A41AFF, #59D6E6)", animationDuration: "3s" }} />
        <div className="absolute bottom-1/3 left-1/3 w-20 h-20 rounded-full opacity-25 animate-bounce hidden lg:block" style={{ background: "linear-gradient(135deg, #FFD761, #BFEE7F)", animationDuration: "4s", animationDelay: "1s" }} />
      </div>

      {/* Floating Icons */}
      {floatingIcons.map((item, index) => (
        <div
          key={index}
          className={`absolute ${item.position} hidden lg:flex items-center justify-center animate-bounce`}
          style={{ animationDelay: item.delay, animationDuration: "4s" }}
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg opacity-70" style={{ backgroundColor: item.bg }}>
            <item.icon className="w-6 h-6 text-white" />
          </div>
        </div>
      ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-purple-200 shadow-lg">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: "#BFEE7F" }}></span>
              <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: "#BFEE7F" }}></span>
            </span>
            <span style={{ color: "#670EB3" }}>Now accepting applications for 2025</span>
            <Sparkles className="w-4 h-4" style={{ color: "#FFD761" }} />
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="text-gray-900">Building </span>
            <span style={{ color: "#A41AFF" }}>Africa&apos;s</span>
            <br />
            <span style={{ color: "#59D6E6" }}>Future </span>
            <span style={{ color: "#670EB3" }}>Tech Leaders</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-8 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            TektonX Labs equips young Africans with{" "}
            <span className="font-semibold" style={{ color: "#670EB3" }}>practical tech skills</span>,{" "}
            <span className="font-semibold" style={{ color: "#59D6E6" }}>industry insights</span>, and{" "}
            <span className="font-semibold" style={{ color: "#A41AFF" }}>mentorship</span> to thrive in the digital economy.
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="group shadow-xl hover:shadow-2xl transition-all duration-300">
                <Sparkles className="mr-2 w-5 h-5" />
                Join the Program
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#programs">
              <Button variant="outline" size="lg" className="border-2 hover:bg-purple-50 transition-all duration-300" style={{ borderColor: "#A41AFF", color: "#670EB3" }}>
                Explore Programs
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="group relative flex flex-col items-center p-6 rounded-2xl bg-white/90 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg"
                  style={{ backgroundColor: stat.color }}
                >
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <span className="text-4xl font-bold" style={{ color: stat.color }}>
                  {stat.value}
                </span>
                <span className="text-sm text-gray-600 mt-1 font-medium">{stat.label}</span>

                {/* Bottom accent */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ backgroundColor: stat.color }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="url(#heroWaveGradient)"
            fillOpacity="0.2"
          />
          <defs>
            <linearGradient id="heroWaveGradient" x1="0" y1="0" x2="1440" y2="0">
              <stop stopColor="#670EB3" />
              <stop offset="0.25" stopColor="#A41AFF" />
              <stop offset="0.5" stopColor="#59D6E6" />
              <stop offset="0.75" stopColor="#BFEE7F" />
              <stop offset="1" stopColor="#FFD761" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
