import { connectDB } from "lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";

export const GET = async (request, { params }) => {
  try {
    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid booking ID" }, { status: 400 });
    }

    const db = await connectDB();
    const booking = await db.collection("bookings").findOne({ _id: new ObjectId(id) });

    if (!booking) {
      return NextResponse.json({ message: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json(booking, { status: 200 });
  } catch (error) {
    console.error("Error fetching booking:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};
