import { connectDB } from "../../../lib/connectDB";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request, { params }) => {
  try {
    const db = await connectDB();
    const teamMembers = await db
      .collection("team")
      .find({})
      .toArray();

    return NextResponse.json(teamMembers, { status: 200 });
  } catch (error) {
    console.error("Error fetching team members:", error);

    return NextResponse.json(
      { message: "Failed to fetch team members" },
      { status: 500 }
    );
  }
};
