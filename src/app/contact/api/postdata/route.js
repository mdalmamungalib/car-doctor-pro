import { connectDB } from "lib/connectDB";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async (request) => {
  try {
    const message = await request.json();
    const db = await connectDB();
    const res = await db.collection("messages").insertOne(message);
    return NextResponse.json({ success: true, data: res });
  } catch (error) {
    console.error("Error inserting message:", error);
    return NextResponse.json(
      { success: false, error: "Failed to insert message" },
      { status: 500 }
    );
  }
};
