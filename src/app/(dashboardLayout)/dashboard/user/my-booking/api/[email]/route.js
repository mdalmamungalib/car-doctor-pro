import { connectDB } from "../../../../../../../lib/connectDB";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request, { params }) => {
  try {
    const { email } = params;

    const db = await connectDB();

    const booking = await db
      .collection("bookings")
      .find({ email })
      .toArray();

    return NextResponse.json(booking, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);

    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
};
