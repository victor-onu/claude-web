"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";
import { ArrowRight, Users, Rocket, Award } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "Young Builders" },
  { icon: Rocket, value: "7", label: "Tech Tracks" },
  { icon: Award, value: "3 Months", label: "Program Duration" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-electric/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-light/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-purple-deep/10 text-purple-deep px-4 py-2 rounded-full text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-green-light rounded-full animate-pulse" />
            Now accepting applications for 2025
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="text-gray-900">Building</span>{" "}
            <span className="gradient-text">Africa&apos;s</span>
            <br />
            <span className="text-gray-900">Future Tech Leaders</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            TektonX Labs equips young Africans with practical tech skills, industry insights,
            and mentorship to thrive in the digital economy.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="group">
                Join the Program
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#programs">
              <Button variant="outline" size="lg">
                Explore Programs
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center p-4 rounded-2xl bg-white/50 backdrop-blur border border-gray-100"
              >
                <stat.icon className="w-8 h-8 text-purple-electric mb-2" />
                <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                <span className="text-sm text-gray-600">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
