import { connectDB } from "../../../../../../../../lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export const DELETE = async (request, { params }) => {
  try {
    const { id } = params;
    
    const db = await connectDB();

    if (!ObjectId.isValid(id)) {
      return new NextResponse(JSON.stringify({ error: "Invalid booking ID" }), { status: 400 });
    }

    const result = await db
      .collection("bookings")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new NextResponse(JSON.stringify({ error: "Booking not found" }), { status: 404 });
    }

    return new NextResponse(JSON.stringify({ message: "Booking deleted successfully" }), { status: 200 });
    
  } catch (error) {
    console.error("Error deleting booking:", error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};
