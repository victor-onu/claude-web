import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { userDb, relationDb, progressDb, initializeDemoData } from "@/lib/db";

// Get mentees for a mentor
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only mentors and admins can view mentees list
    if (!["mentor", "admin"].includes(session.user.role)) {
      return NextResponse.json(
        { error: "Access denied" },
        { status: 403 }
      );
    }

    initializeDemoData();

    let mentees;
    if (session.user.role === "admin") {
      // Admins can see all mentees
      mentees = userDb.findByRole("mentee");
    } else {
      // Mentors see only their assigned mentees
      mentees = relationDb.getMenteesForMentor(session.user.id);
    }

    // Add progress data to each mentee
    const menteesWithProgress = mentees.map((mentee) => {
      const trackId = mentee.trackId || "";
      const completionPercentage = trackId
        ? progressDb.getCompletionPercentage(mentee.id, trackId)
        : 0;
      const progressData = trackId
        ? progressDb.findByMenteeAndTrack(mentee.id, trackId)
        : [];

      return {
        ...mentee,
        completionPercentage,
        progressCount: progressData.filter((p) => p.status === "completed").length,
        inProgressCount: progressData.filter((p) => p.status === "in-progress").length,
      };
    });

    return NextResponse.json({ mentees: menteesWithProgress });
  } catch (error) {
    console.error("Mentees fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
