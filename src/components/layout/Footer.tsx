"use client";

import Link from "next/link";
import Image from "next/image";
import { Twitter, Linkedin, Instagram, Mail, Heart, ArrowUpRight } from "lucide-react";

const footerLinks = {
  programs: [
    { label: "From Campus to Tech Careers", href: "#" },
    { label: "Code for Growth", href: "#" },
    { label: "Mentorship", href: "#" },
    { label: "TektonX Hub", href: "#" },
  ],
  tracks: [
    { label: "Software Development", href: "#" },
    { label: "UI/UX Design", href: "#" },
    { label: "Mobile Development", href: "#" },
    { label: "Product Management", href: "#" },
    { label: "Data Science", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Contact", href: "#contact" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter", color: "hover:bg-teal hover:shadow-teal/50" },
  { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:bg-blue-deep hover:shadow-blue-deep/50" },
  { icon: Instagram, href: "#", label: "Instagram", color: "hover:bg-purple-electric hover:shadow-purple-electric/50" },
  { icon: Mail, href: "mailto:hello@tektonxlabs.org", label: "Email", color: "hover:bg-yellow-brand hover:text-gray-900 hover:shadow-yellow-brand/50" },
];

export default function Footer() {
  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* Top colorful accent bar */}
      <div className="h-1 bg-gradient-to-r from-purple-deep via-purple-electric via-teal via-yellow-brand to-green-light" />

      {/* Decorative gradient blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-deep/10 to-purple-electric/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-teal/10 to-blue-deep/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block group">
              <Image
                src="/images/logo-white.png"
                alt="TektonX Labs"
                width={160}
                height={45}
                className="h-10 w-auto transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="mt-4 text-xl font-semibold">
              <span className="bg-gradient-to-r from-purple-electric via-teal to-green-light bg-clip-text text-transparent">
                Building People. Building Products. Building Africa.
              </span>
            </p>
            <p className="mt-3 text-gray-400 text-sm leading-relaxed max-w-sm">
              Empowering young Africans with the skills, mentorship, and opportunities
              to succeed in technology and innovation.
            </p>

            {/* Social Links with colorful hovers */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className={`p-3 bg-gray-800/50 rounded-xl text-gray-400 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-deep to-purple-electric" />
              Programs
            </h3>
            <ul className="space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-1 text-gray-400 hover:text-purple-electric transition-colors"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tracks */}
          <div>
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-teal to-green-light" />
              Tracks
            </h3>
            <ul className="space-y-3">
              {footerLinks.tracks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-1 text-gray-400 hover:text-teal transition-colors"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-brand to-green-light" />
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-1 text-gray-400 hover:text-yellow-brand transition-colors"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-purple-deep/20 via-purple-electric/10 to-teal/20 border border-purple-electric/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold text-white">Stay Updated</h3>
              <p className="text-gray-400 text-sm mt-1">Get the latest news about programs and opportunities.</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-electric transition-colors"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-purple-deep to-purple-electric text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-electric/30 transition-all hover:-translate-y-0.5">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} TektonX Labs. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center gap-2">
            Made with{" "}
            <Heart className="w-4 h-4 text-purple-electric animate-pulse" />{" "}
            for Africa&apos;s future{" "}
            <span className="bg-gradient-to-r from-purple-electric to-teal bg-clip-text text-transparent font-semibold">
              builders
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
