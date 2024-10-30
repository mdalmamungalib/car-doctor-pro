import { connectDB } from "lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const PATCH = async (request, { params }) => {
  const { id } = params; 
  const { status } = await request.json(); 

  try {
    const db = await connectDB();
    const result = await db.collection("bookings").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    if (result.modifiedCount === 1) {
      return new NextResponse(
        JSON.stringify({ message: "Booking status updated successfully" }),
        { status: 200 }
      );
    } else {
      return new NextResponse(
        JSON.stringify({ message: "Booking not found or status unchanged" }),
        { status: 404 }
      );
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error updating booking status", error }),
      { status: 500 }
    );
  }
};
