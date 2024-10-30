import { connectDB } from "lib/connectDB";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request, { params }) => {
  try {
    const { email } = params; 

    if (!email) {
      return NextResponse.json(
        { message: "Email is required." },
        { status: 400 }
      );
    }

    const db = await connectDB();
    const bookingsCollection = db.collection("bookings");
    const myBookings = await bookingsCollection.find({ email }).toArray();

    if (myBookings.length === 0) {
      return NextResponse.json(
        { message: "No bookings found for this email." },
        { status: 404 }
      );
    }

    return NextResponse.json({ myBookings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
