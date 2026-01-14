"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { ArrowLeft, Loader2, Check } from "lucide-react";
import { tracks } from "@/data/tracks";

const roleOptions = [
  { value: "mentee", label: "Mentee - I want to learn and be mentored" },
  { value: "mentor", label: "Mentor - I want to guide and teach others" },
];

const trackOptions = tracks.map((track) => ({
  value: track.id,
  label: track.name,
}));

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    trackId: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (formData.role === "mentee" && !formData.trackId) {
      setError("Please select a track");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          trackId: formData.trackId || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      // Redirect to login on success
      router.push("/login?registered=true");
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const canProceedToStep2 = formData.name && formData.email && formData.password && formData.confirmPassword;

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-deep to-purple-electric p-12 flex-col justify-between">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
        <div>
          <Image
            src="/images/logo-white.png"
            alt="TektonX Labs"
            width={200}
            height={60}
            className="h-12 w-auto mb-8"
          />
          <h1 className="text-4xl font-bold text-white mb-4">
            Start Your Tech Journey
          </h1>
          <p className="text-xl text-white/80">
            Join a community of builders shaping Africa&apos;s tech future. Get mentorship, build skills, and grow together.
          </p>

          {/* Features */}
          <div className="mt-8 space-y-4">
            {[
              "3-month structured mentorship program",
              "7 specialized tech tracks",
              "Weekly tasks with mentor guidance",
              "Track your progress and achievements",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-light/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-light" />
                </div>
                <span className="text-white/90">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="text-white/60 text-sm">
          Building People. Building Products. Building Africa.
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="TektonX Labs"
                width={160}
                height={45}
                className="h-10 w-auto"
              />
            </Link>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">Create your account</h2>
          <p className="text-gray-600 mb-8">
            Already have an account?{" "}
            <Link href="/login" className="text-purple-electric hover:underline font-medium">
              Log in
            </Link>
          </p>

          {/* Progress Steps */}
          <div className="flex items-center gap-4 mb-8">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
              step >= 1 ? "bg-purple-electric text-white" : "bg-gray-200 text-gray-600"
            }`}>
              1
            </div>
            <div className={`flex-1 h-1 rounded ${step >= 2 ? "bg-purple-electric" : "bg-gray-200"}`} />
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
              step >= 2 ? "bg-purple-electric text-white" : "bg-gray-200 text-gray-600"
            }`}>
              2
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            {step === 1 && (
              <>
                <Input
                  label="Full Name"
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />

                <Input
                  label="Email Address"
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                />

                <Input
                  label="Password"
                  id="password"
                  type="password"
                  placeholder="Create a password (min. 6 characters)"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  required
                />

                <Input
                  label="Confirm Password"
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  required
                />

                <Button
                  type="button"
                  className="w-full"
                  onClick={() => {
                    if (canProceedToStep2) {
                      if (formData.password !== formData.confirmPassword) {
                        setError("Passwords do not match");
                        return;
                      }
                      setStep(2);
                    }
                  }}
                  disabled={!canProceedToStep2}
                >
                  Continue
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <Select
                  label="I want to join as a..."
                  id="role"
                  options={roleOptions}
                  value={formData.role}
                  onChange={(e) => handleChange("role", e.target.value)}
                  required
                />

                {formData.role === "mentee" && (
                  <Select
                    label="Select Your Track"
                    id="trackId"
                    options={trackOptions}
                    value={formData.trackId}
                    onChange={(e) => handleChange("trackId", e.target.value)}
                    required
                  />
                )}

                {formData.role === "mentor" && (
                  <Select
                    label="Select Track to Mentor (Optional)"
                    id="trackId"
                    options={trackOptions}
                    value={formData.trackId}
                    onChange={(e) => handleChange("trackId", e.target.value)}
                  />
                )}

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isLoading || !formData.role || (formData.role === "mentee" && !formData.trackId)}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
