import { connectDB } from "lib/connectDB";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  try {
    const db = await connectDB();
    const messages = await db
      .collection("messages")
      .find({})
      .toArray();

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error retrieving messages:", error);
    return NextResponse.json(
      { error: "Failed to retrieve messages" },
      { status: 500 }
    );
  }
};
