import { connectDB } from "lib/connectDB";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export const GET = async (request) => {
  try {
    const db = await connectDB();
    const users = await db.collection("users").find().toArray();
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
};
