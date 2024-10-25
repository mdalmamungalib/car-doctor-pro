import { connectDB } from "lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const DELETE = async (request, { params }) => {
  const { id } = params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: "Invalid team ID", status: 400 },
      { status: 400 }
    );
  }

  try {
    const db = await connectDB();

    const result = await db
      .collection("team")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return NextResponse.json(
        { message: "Team deleted successfully", status: 200 },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Team not found", status: 404 },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error deleting team member:", error);
    return NextResponse.json(
      { message: "Internal server error", status: 500 },
      { status: 500 }
    );
  }
};

export const PATCH = async (request, { params }) => {
  const { id } = params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "Invalid ID format" },
      { status: 400 }
    );
  }

  const body = await request.json();

  try {
    const db = await connectDB();

    const result = await db
      .collection("team")
      .updateOne({ _id: new ObjectId(id) }, { $set: { ...body } });

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { message: "No documents were updated." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Team member updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating team member:", error);
    return NextResponse.json(
      {
        error: "An error occurred while updating the team member.",
      },
      { status: 500 }
    );
  }
};

export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    const db = await connectDB();
    const res = await db
      .collection("team")
      .findOne({ _id: new ObjectId(id) });

    if (!res) {
      return NextResponse.json(
        { error: "Team member not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(res);
  } catch (error) {
    console.error("Database fetch error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
