"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Mail, MapPin, Send, CheckCircle } from "lucide-react";

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
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Info */}
          <div>
            <span className="text-purple-electric font-semibold text-sm uppercase tracking-wider">
              Get in Touch
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-900">
              Let&apos;s Build <span className="gradient-text">Together</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Have questions about our programs? Want to partner with us or become a mentor?
              We&apos;d love to hear from you.
            </p>

            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-deep/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-purple-deep" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email Us</h3>
                  <p className="text-gray-600">hello@tektonxlabs.org</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-electric/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-purple-electric" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Location</h3>
                  <p className="text-gray-600">Africa-wide (Remote & In-person)</p>
                </div>
              </div>
            </div>

            {/* Partnership CTA */}
            <div className="mt-10 p-6 bg-gradient-to-br from-purple-deep/5 to-purple-electric/5 rounded-2xl border border-purple-electric/10">
              <h3 className="font-semibold text-gray-900 mb-2">
                Interested in Partnership?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                We partner with universities, tech companies, NGOs, and government agencies
                to expand our reach and impact.
              </p>
              <a
                href="mailto:partnerships@tektonxlabs.org"
                className="text-purple-electric font-medium hover:underline"
              >
                partnerships@tektonxlabs.org
              </a>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-600">
                  Thank you for reaching out. We&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-electric focus:border-transparent transition-all duration-200 resize-none"
                    required
                  />
                </div>
                <Button type="submit" className="w-full group">
                  Send Message
                  <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
