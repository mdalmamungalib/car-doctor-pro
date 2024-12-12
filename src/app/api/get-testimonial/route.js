import { connectDB } from "../../../lib/connectDB";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export const GET = async (request, { params }) => {
  try {
    const db = await connectDB();
    const reviews = await db.collection("reviews").find().toArray();

    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);

    return NextResponse.json(
      { message: "Error fetching reviews" },
      { status: 500 }
    );
  }
};
