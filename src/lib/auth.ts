import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { userDb, initializeDemoData } from "./db";

// Password storage (in production, store hashed passwords in the user record)
const passwordStore: Record<string, string> = {};

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Register a new user
export async function registerUser(
  email: string,
  password: string,
  name: string,
  role: "mentor" | "mentee",
  trackId?: string
): Promise<{ success: boolean; error?: string; userId?: string }> {
  // Initialize demo data if not already done
  initializeDemoData();

  // Check if user already exists
  const existingUser = userDb.findByEmail(email);
  if (existingUser) {
    return { success: false, error: "User with this email already exists" };
  }

  // Validate role and track
  if (role === "mentee" && !trackId) {
    return { success: false, error: "Mentees must select a track" };
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create user
  const user = userDb.create({
    email,
    name,
    role,
    trackId,
  });

  // Store password
  passwordStore[user.id] = hashedPassword;

  return { success: true, userId: user.id };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter email and password");
        }

        // Initialize demo data
        initializeDemoData();

        // Find user
        const user = userDb.findByEmail(credentials.email);
        if (!user) {
          throw new Error("No user found with this email");
        }

        // For demo purposes, allow login with password "demo123" for demo users
        const storedPassword = passwordStore[user.id];
        if (storedPassword) {
          const isValid = await verifyPassword(
            credentials.password,
            storedPassword
          );
          if (!isValid) {
            throw new Error("Invalid password");
          }
        } else {
          // Demo mode: accept "demo123" for pre-seeded users
          if (credentials.password !== "demo123") {
            throw new Error("Invalid password (hint: use 'demo123' for demo accounts)");
          }
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          trackId: user.trackId,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role: string }).role;
        token.trackId = (user as { trackId?: string }).trackId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id: string }).id = token.id as string;
        (session.user as { role: string }).role = token.role as string;
        (session.user as { trackId?: string }).trackId = token.trackId as string | undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};

// Extend NextAuth types
declare module "next-auth" {
  interface User {
    id: string;
    role: string;
    trackId?: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      trackId?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    trackId?: string;
  }
}
