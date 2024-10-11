import { connectDB } from "lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    // Connect to the database
    const db = await connectDB();
    const bookingsCollection = db.collection("bookings");

    // Find bookings based on email
    const myBookings = await bookingsCollection
      .find({ email: params?.email })
      .toArray();

    // Check if bookings were found, return appropriate response
    if (myBookings.length === 0) {
      return NextResponse.json(
        { message: "No bookings found for this email." },
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Return the bookings if found
    return NextResponse.json(
      { myBookings },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
