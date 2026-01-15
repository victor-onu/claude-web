"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Mail, MapPin, Send, CheckCircle, Sparkles, Users, Handshake, MessageCircle } from "lucide-react";

const contactOptions = [
  {
    icon: Mail,
    title: "Email Us",
    description: "hello@tektonxlabs.org",
    gradient: "from-purple-deep to-purple-electric",
    shadow: "shadow-purple-electric/20",
  },
  {
    icon: MapPin,
    title: "Location",
    description: "Africa-wide (Remote & In-person)",
    gradient: "from-teal to-blue-deep",
    shadow: "shadow-teal/20",
  },
  {
    icon: MessageCircle,
    title: "Social Media",
    description: "@tektonxlabs on all platforms",
    gradient: "from-yellow-brand to-green-light",
    shadow: "shadow-yellow-brand/20",
  },
];

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this to an API
    console.log("Form submitted:", formState);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Colorful background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-white to-teal/10" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-deep via-purple-electric via-teal via-yellow-brand to-green-light" />
      <div className="absolute top-20 -left-20 w-80 h-80 bg-gradient-to-br from-purple-electric/10 to-teal/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -right-20 w-80 h-80 bg-gradient-to-br from-yellow-brand/10 to-green-light/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-deep/10 to-teal/10 px-4 py-2 rounded-full mb-4 border border-purple-electric/20">
            <Sparkles className="w-4 h-4 text-purple-electric" />
            <span className="text-purple-electric font-semibold text-sm uppercase tracking-wider">
              Get in Touch
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="text-gray-900">Let&apos;s Build </span>
            <span className="bg-gradient-to-r from-purple-deep via-purple-electric to-teal bg-clip-text text-transparent">Together</span>
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Have questions about our programs? Want to partner with us or become a mentor?
            We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Info */}
          <div>
            {/* Contact Options */}
            <div className="space-y-4 mb-10">
              {contactOptions.map((option) => (
                <div
                  key={option.title}
                  className="group flex items-start gap-4 p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 hover:border-purple-electric/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${option.gradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${option.shadow} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <option.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`font-semibold bg-gradient-to-r ${option.gradient} bg-clip-text text-transparent`}>
                      {option.title}
                    </h3>
                    <p className="text-gray-600">{option.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Partnership CTA */}
            <div className="group relative p-6 bg-gradient-to-br from-purple-deep/5 via-purple-electric/5 to-teal/5 rounded-2xl border-2 border-purple-electric/20 hover:border-purple-electric/40 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-deep/5 to-teal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-electric to-teal rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-electric/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Handshake className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg bg-gradient-to-r from-purple-deep to-purple-electric bg-clip-text text-transparent mb-2">
                    Interested in Partnership?
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    We partner with universities, tech companies, NGOs, and government agencies
                    to expand our reach and impact.
                  </p>
                  <a
                    href="mailto:partnerships@tektonxlabs.org"
                    className="inline-flex items-center gap-2 text-purple-electric font-semibold hover:text-purple-deep transition-colors"
                  >
                    partnerships@tektonxlabs.org
                    <Send className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Bottom gradient line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-deep via-purple-electric to-teal transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>

            {/* Become a Mentor CTA */}
            <div className="group relative mt-4 p-6 bg-gradient-to-br from-yellow-brand/5 via-green-light/5 to-teal/5 rounded-2xl border-2 border-yellow-brand/20 hover:border-yellow-brand/40 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-brand/5 to-green-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-brand to-green-light rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-yellow-brand/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg bg-gradient-to-r from-yellow-brand to-green-light bg-clip-text text-transparent mb-2">
                    Become a Mentor
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Share your expertise and help shape the next generation of African tech talent.
                  </p>
                  <a
                    href="mailto:mentors@tektonxlabs.org"
                    className="inline-flex items-center gap-2 text-yellow-700 font-semibold hover:text-yellow-800 transition-colors"
                  >
                    mentors@tektonxlabs.org
                    <Send className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Bottom gradient line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-brand via-green-light to-teal transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="relative">
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-purple-electric/10 hover:border-purple-electric/20 transition-colors">
              {/* Decorative corner */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-electric/20 to-teal/20 rounded-full blur-2xl" />

              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-light to-teal rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-light/30">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-green-light to-teal bg-clip-text text-transparent mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-gray-600">
                    Thank you for reaching out. We&apos;ll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Send us a Message</h3>
                    <p className="text-sm text-gray-500 mt-1">We&apos;ll respond within 24 hours</p>
                  </div>

                  <Input
                    label="Your Name"
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="Email Address"
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    required
                  />
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="How can we help you?"
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-electric/50 focus:border-purple-electric transition-all duration-200 resize-none"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full group shadow-lg shadow-purple-electric/25 hover:shadow-xl hover:shadow-purple-electric/40 transition-all">
                    <Sparkles className="mr-2 w-5 h-5" />
                    Send Message
                    <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
