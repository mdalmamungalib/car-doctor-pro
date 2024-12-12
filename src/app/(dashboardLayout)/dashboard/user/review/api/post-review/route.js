import { connectDB } from "lib/connectDB";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export const POST = async (request) => {
  try {
    const review = await request.json();
    const db = await connectDB();
    const result = await db.collection("reviews").insertOne(review);

    return NextResponse.json(
      { message: "Review added successfully", result },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add review", error: error.message },
      { status: 500 }
    );
  }
};
