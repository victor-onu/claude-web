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
    color: "#670EB3",
  },
  {
    icon: MapPin,
    title: "Location",
    description: "Africa-wide (Remote & In-person)",
    color: "#59D6E6",
  },
  {
    icon: MessageCircle,
    title: "Social Media",
    description: "@tektonxlabs on all platforms",
    color: "#FFD761",
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
    console.log("Form submitted:", formState);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-white to-cyan-50/20" />

      {/* Top accent bar */}
      <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #670EB3, #A41AFF, #59D6E6, #FFD761, #BFEE7F)" }} />

      {/* Decorative blobs */}
      <div className="absolute top-20 -left-20 w-80 h-80 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(164,26,255,0.1) 0%, rgba(89,214,230,0.1) 100%)" }} />
      <div className="absolute bottom-20 -right-20 w-80 h-80 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(255,215,97,0.1) 0%, rgba(191,238,127,0.1) 100%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-purple-200">
            <Sparkles className="w-4 h-4" style={{ color: "#A41AFF" }} />
            <span className="font-semibold text-sm uppercase tracking-wider" style={{ color: "#A41AFF" }}>
              Get in Touch
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            <span className="text-gray-900">Let&apos;s Build </span>
            <span style={{ color: "#A41AFF" }}>Together</span>
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Have questions about our programs? Want to partner with us or become a mentor?
            We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column */}
          <div>
            {/* Contact Options */}
            <div className="space-y-4 mb-10">
              {contactOptions.map((option) => (
                <div
                  key={option.title}
                  className="group flex items-start gap-4 p-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-all duration-300"
                    style={{ backgroundColor: option.color }}
                  >
                    <option.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold" style={{ color: option.color }}>
                      {option.title}
                    </h3>
                    <p className="text-gray-600">{option.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Partnership CTA */}
            <div className="group relative p-6 bg-purple-50 rounded-2xl border-2 border-purple-100 hover:border-purple-300 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden mb-4">
              <div className="relative flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-all duration-300"
                  style={{ backgroundColor: "#A41AFF" }}
                >
                  <Handshake className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: "#670EB3" }}>
                    Interested in Partnership?
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    We partner with universities, tech companies, NGOs, and government agencies
                    to expand our reach and impact.
                  </p>
                  <a
                    href="mailto:partnerships@tektonxlabs.org"
                    className="inline-flex items-center gap-2 font-semibold hover:underline"
                    style={{ color: "#A41AFF" }}
                  >
                    partnerships@tektonxlabs.org
                    <Send className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <div
                className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ backgroundColor: "#A41AFF" }}
              />
            </div>

            {/* Mentor CTA */}
            <div className="group relative p-6 bg-yellow-50 rounded-2xl border-2 border-yellow-100 hover:border-yellow-300 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="relative flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-all duration-300"
                  style={{ backgroundColor: "#FFD761" }}
                >
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: "#d97706" }}>
                    Become a Mentor
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Share your expertise and help shape the next generation of African tech talent.
                  </p>
                  <a
                    href="mailto:mentors@tektonxlabs.org"
                    className="inline-flex items-center gap-2 font-semibold hover:underline"
                    style={{ color: "#d97706" }}
                  >
                    mentors@tektonxlabs.org
                    <Send className="w-4 h-4" />
                  </a>
                </div>
              </div>
              <div
                className="absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ backgroundColor: "#FFD761" }}
              />
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="relative">
            <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-purple-100 hover:border-purple-200 transition-colors">
              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg"
                    style={{ backgroundColor: "#BFEE7F" }}
                  >
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2" style={{ color: "#59D6E6" }}>
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
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-all duration-200 resize-none"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full group shadow-lg hover:shadow-xl transition-all">
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
