"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

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
            Welcome Back, Builder
          </h1>
          <p className="text-xl text-white/80">
            Continue your journey to becoming a tech leader. Your progress awaits.
          </p>
        </div>
        <div className="text-white/60 text-sm">
          Building People. Building Products. Building Africa.
        </div>
      </div>

      {/* Right Side - Login Form */}
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

          <h2 className="text-2xl font-bold text-gray-900 mb-2">Log in to your account</h2>
          <p className="text-gray-600 mb-8">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-purple-electric hover:underline font-medium">
              Sign up
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {error}
              </div>
            )}

            <Input
              label="Email Address"
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-2">Demo Accounts</h3>
            <p className="text-sm text-gray-600 mb-2">Use password: <code className="bg-gray-200 px-1 rounded">demo123</code></p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li><strong>Mentor:</strong> mentor.dev@tektonxlabs.org</li>
              <li><strong>Mentee:</strong> mentee1@example.com</li>
              <li><strong>Admin:</strong> admin@tektonxlabs.org</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
