import { connectDB } from "lib/connectDB";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request, { params }) => {
  try {
    const { email } = params; // Ensure 'email' is part of the params

    // Connect to the database
    const db = await connectDB();

    // Fetch reviews by email
    const reviews = await db.collection("reviews").find({ email }).toArray();

    // Return the result as a JSON response
    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);

    // Return error response in case of failure
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
};
