"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#programs", label: "Programs" },
  { href: "#tracks", label: "Tracks" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg shadow-purple-deep/5"
          : "bg-white/80 backdrop-blur-md"
      }`}
    >
      {/* Top colorful accent bar */}
      <div className="h-1 bg-gradient-to-r from-purple-deep via-purple-electric via-teal via-yellow-brand to-green-light" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/images/logo.png"
              alt="TektonX Labs"
              width={140}
              height={40}
              className="h-8 md:h-10 w-auto transition-transform group-hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-gray-600 hover:text-purple-deep font-medium transition-colors group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-deep to-purple-electric group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="hover:text-purple-electric">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="group shadow-lg shadow-purple-electric/25 hover:shadow-xl hover:shadow-purple-electric/40 transition-all">
                <Sparkles className="w-4 h-4 mr-1.5" />
                Join Program
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-purple-electric rounded-lg hover:bg-purple-electric/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-purple-electric/10">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 text-gray-600 hover:text-purple-deep font-medium py-3 px-4 rounded-xl hover:bg-gradient-to-r hover:from-purple-deep/5 hover:to-purple-electric/5 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span
                  className="w-2 h-2 rounded-full bg-gradient-to-r"
                  style={{
                    backgroundImage: [
                      "linear-gradient(to right, #670EB3, #A41AFF)",
                      "linear-gradient(to right, #59D6E6, #002BA1)",
                      "linear-gradient(to right, #FFD761, #BFEE7F)",
                      "linear-gradient(to right, #A41AFF, #59D6E6)",
                    ][index],
                  }}
                />
                {link.label}
              </a>
            ))}
            <div className="pt-4 space-y-3 border-t border-purple-electric/10">
              <Link href="/login" className="block">
                <Button variant="outline" className="w-full border-purple-electric/30 hover:border-purple-electric hover:bg-purple-electric/5">
                  Log in
                </Button>
              </Link>
              <Link href="/signup" className="block">
                <Button className="w-full shadow-lg shadow-purple-electric/25">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Join Program
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
