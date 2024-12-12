import { connectDB } from "../../../../../../../lib/connectDB";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export const GET = async (request) => {
  try {
    const db = await connectDB();
    const bookings = await db.collection("bookings").find().toArray();
    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json({ message: "Failed to fetch bookings" }, { status: 500 });
  }
};
