import Link from "next/link";
import Image from "next/image";
import { Twitter, Linkedin, Instagram, Mail } from "lucide-react";

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
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Mail, href: "mailto:hello@tektonxlabs.org", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo-white.png"
                alt="TektonX Labs"
                width={160}
                height={45}
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-4 text-gray-400 max-w-sm">
              Building People. Building Products. Building Africa.
            </p>
            <p className="mt-2 text-gray-400 text-sm">
              Empowering young Africans with the skills, mentorship, and opportunities
              to succeed in technology and innovation.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-purple-deep transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-semibold text-white mb-4">Programs</h3>
            <ul className="space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tracks */}
          <div>
            <h3 className="font-semibold text-white mb-4">Tracks</h3>
            <ul className="space-y-3">
              {footerLinks.tracks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} TektonX Labs. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm">
            Made with love for Africa&apos;s future builders
          </p>
        </div>
      </div>
    </footer>
  );
}
