import { connectDB } from "lib/connectDB";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// post team
export const POST = async (request) => {
  try {
    const team = await request.json();

    const db = await connectDB();
    const result = await db.collection("team").insertOne(team);

    return NextResponse.json({
      message: "Team added successfully",
      insertedId: result.insertedId,
    }, { status: 201 });

  } catch (error) {
    console.error("Error inserting team:", error);
    return NextResponse.json({
      message: "Failed to add team",
      error: error.message,
    }, { status: 500 });
  }
};

// get tem
export const GET = async (request, { params }) => {
    try {
      const db = await connectDB();
      const teamMembers = await db.collection("team").find({}).toArray();
  
      return NextResponse.json(teamMembers, { status: 200 });
    } catch (error) {
      console.error("Error fetching team members:", error);
  
      return NextResponse.json(
        { message: "Failed to fetch team members" },
        { status: 500 }
      );
    }
  };
