import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { progressDb, initializeDemoData } from "@/lib/db";

// Get progress for current user
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    initializeDemoData();

    const { searchParams } = new URL(request.url);
    const trackId = searchParams.get("trackId");

    let progressData;
    if (trackId) {
      progressData = progressDb.findByMenteeAndTrack(session.user.id, trackId);
    } else {
      progressData = progressDb.findByMentee(session.user.id);
    }

    // Calculate completion percentage if trackId is provided
    let completionPercentage;
    if (trackId) {
      completionPercentage = progressDb.getCompletionPercentage(
        session.user.id,
        trackId
      );
    }

    return NextResponse.json({
      progress: progressData,
      completionPercentage,
    });
  } catch (error) {
    console.error("Progress fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Update progress
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    initializeDemoData();

    const body = await request.json();
    const { trackId, milestoneId, taskId, status, submissionLink } = body;

    if (!trackId || !milestoneId || !taskId || !status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate status
    if (!["not-started", "in-progress", "completed"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    // Find or create progress entry
    const progress = progressDb.findOrCreate(
      session.user.id,
      trackId,
      milestoneId,
      taskId
    );

    // Update progress
    const updatedProgress = progressDb.update(progress.id, {
      status,
      submissionLink,
      submittedAt: status === "completed" ? new Date().toISOString() : undefined,
    });

    // Get updated completion percentage
    const completionPercentage = progressDb.getCompletionPercentage(
      session.user.id,
      trackId
    );

    return NextResponse.json({
      progress: updatedProgress,
      completionPercentage,
    });
  } catch (error) {
    console.error("Progress update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
