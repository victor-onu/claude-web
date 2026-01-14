import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { progressDb, initializeDemoData } from "@/lib/db";

// Add feedback to a mentee's progress (mentor only)
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only mentors and admins can give feedback
    if (!["mentor", "admin"].includes(session.user.role)) {
      return NextResponse.json(
        { error: "Only mentors can provide feedback" },
        { status: 403 }
      );
    }

    initializeDemoData();

    const body = await request.json();
    const { progressId, feedback } = body;

    if (!progressId || !feedback) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Update progress with feedback
    const updatedProgress = progressDb.update(progressId, {
      feedback,
      feedbackBy: session.user.id,
      feedbackAt: new Date().toISOString(),
    });

    if (!updatedProgress) {
      return NextResponse.json(
        { error: "Progress entry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ progress: updatedProgress });
  } catch (error) {
    console.error("Feedback error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
