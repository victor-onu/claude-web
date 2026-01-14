import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { assignmentDb, initializeDemoData } from "@/lib/db";

// Get assignments
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    initializeDemoData();

    const { searchParams } = new URL(request.url);
    const trackId = searchParams.get("trackId");
    const week = searchParams.get("week");

    let assignments;
    if (trackId && week) {
      assignments = assignmentDb.findByWeek(trackId, parseInt(week));
    } else if (trackId) {
      assignments = assignmentDb.findByTrack(trackId);
    } else {
      assignments = assignmentDb.findAll();
    }

    return NextResponse.json({ assignments });
  } catch (error) {
    console.error("Assignments fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Create assignment (mentor/admin only)
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Only mentors and admins can create assignments
    if (!["mentor", "admin"].includes(session.user.role)) {
      return NextResponse.json(
        { error: "Only mentors can create assignments" },
        { status: 403 }
      );
    }

    initializeDemoData();

    const body = await request.json();
    const {
      trackId,
      milestoneId,
      taskId,
      title,
      description,
      resourceLinks,
      dueDate,
      week,
    } = body;

    if (!trackId || !title || !week) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const assignment = assignmentDb.create({
      trackId,
      milestoneId: milestoneId || "",
      taskId: taskId || "",
      title,
      description: description || "",
      resourceLinks: resourceLinks || [],
      dueDate: dueDate || "",
      week,
    });

    return NextResponse.json({ assignment }, { status: 201 });
  } catch (error) {
    console.error("Assignment creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Update assignment (mentor/admin only)
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!["mentor", "admin"].includes(session.user.role)) {
      return NextResponse.json(
        { error: "Only mentors can update assignments" },
        { status: 403 }
      );
    }

    initializeDemoData();

    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Assignment ID required" },
        { status: 400 }
      );
    }

    const assignment = assignmentDb.update(id, updates);

    if (!assignment) {
      return NextResponse.json(
        { error: "Assignment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ assignment });
  } catch (error) {
    console.error("Assignment update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Delete assignment (mentor/admin only)
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!["mentor", "admin"].includes(session.user.role)) {
      return NextResponse.json(
        { error: "Only mentors can delete assignments" },
        { status: 403 }
      );
    }

    initializeDemoData();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Assignment ID required" },
        { status: 400 }
      );
    }

    const deleted = assignmentDb.delete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Assignment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Assignment deleted" });
  } catch (error) {
    console.error("Assignment deletion error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
