"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import { ArrowRight, Users, Rocket, Award, Code, Sparkles, Zap } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "Young Builders", color: "from-purple-deep to-purple-electric" },
  { icon: Rocket, value: "7", label: "Tech Tracks", color: "from-teal to-blue-deep" },
  { icon: Award, value: "3 Months", label: "Program Duration", color: "from-yellow-brand to-orange-500" },
];

const floatingIcons = [
  { icon: Code, position: "top-20 left-10", delay: "0s", color: "text-purple-electric" },
  { icon: Sparkles, position: "top-40 right-20", delay: "1s", color: "text-yellow-brand" },
  { icon: Zap, position: "bottom-40 left-20", delay: "2s", color: "text-teal" },
  { icon: Rocket, position: "bottom-20 right-10", delay: "0.5s", color: "text-green-light" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-white via-purple-50/30 to-teal/5">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large gradient orbs */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-purple-electric/30 to-purple-deep/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-teal/30 to-blue-deep/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-yellow-brand/20 to-green-light/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(103,14,179,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(103,14,179,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        {/* Floating gradient shapes */}
        <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-gradient-to-br from-purple-electric to-teal rounded-2xl rotate-12 opacity-20 animate-bounce" style={{ animationDuration: "3s" }} />
        <div className="absolute bottom-1/3 left-1/3 w-16 h-16 bg-gradient-to-br from-yellow-brand to-green-light rounded-full opacity-30 animate-bounce" style={{ animationDuration: "4s", animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-gradient-to-br from-teal to-purple-deep rounded-lg rotate-45 opacity-25 animate-bounce" style={{ animationDuration: "3.5s", animationDelay: "0.5s" }} />
      </div>

      {/* Floating Icons */}
      {floatingIcons.map((item, index) => (
        <div
          key={index}
          className={`absolute ${item.position} hidden lg:block animate-bounce opacity-40`}
          style={{ animationDelay: item.delay, animationDuration: "4s" }}
        >
          <item.icon className={`w-8 h-8 ${item.color}`} />
        </div>
      ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-deep/10 via-purple-electric/10 to-teal/10 text-purple-deep px-6 py-3 rounded-full text-sm font-semibold mb-8 border border-purple-electric/20 shadow-lg shadow-purple-electric/10">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-light opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-light"></span>
            </span>
            <span className="bg-gradient-to-r from-purple-deep to-purple-electric bg-clip-text text-transparent">
              Now accepting applications for 2025
            </span>
            <Sparkles className="w-4 h-4 text-yellow-brand" />
          </div>

          {/* Headline with colorful gradient */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-purple-deep to-gray-900 bg-clip-text text-transparent">Building</span>{" "}
            <span className="bg-gradient-to-r from-purple-deep via-purple-electric to-teal bg-clip-text text-transparent animate-pulse">Africa&apos;s</span>
            <br />
            <span className="bg-gradient-to-r from-purple-electric via-teal to-green-light bg-clip-text text-transparent">Future Tech Leaders</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-8 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            TektonX Labs equips young Africans with{" "}
            <span className="text-purple-deep font-semibold">practical tech skills</span>,{" "}
            <span className="text-teal font-semibold">industry insights</span>, and{" "}
            <span className="text-purple-electric font-semibold">mentorship</span> to thrive in the digital economy.
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="group shadow-xl shadow-purple-electric/25 hover:shadow-2xl hover:shadow-purple-electric/40 transition-all duration-300">
                <Sparkles className="mr-2 w-5 h-5" />
                Join the Program
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#programs">
              <Button variant="outline" size="lg" className="border-2 hover:bg-gradient-to-r hover:from-purple-deep hover:to-purple-electric hover:text-white hover:border-transparent transition-all duration-300">
                Explore Programs
              </Button>
            </Link>
          </div>

          {/* Stats with colorful gradients */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="group relative flex flex-col items-center p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 hover:border-purple-electric/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />

                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <span className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </span>
                <span className="text-sm text-gray-600 mt-1 font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="url(#gradient)"
            fillOpacity="0.1"
          />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="1440" y2="0">
              <stop stopColor="#670EB3" />
              <stop offset="0.5" stopColor="#A41AFF" />
              <stop offset="1" stopColor="#59D6E6" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
