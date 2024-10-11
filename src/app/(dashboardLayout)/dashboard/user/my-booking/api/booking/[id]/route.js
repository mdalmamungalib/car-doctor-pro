import { connectDB } from "lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const DELETE = async (request, { params }) => {
  const db = await connectDB();
  const bookingCollection = db.collection("bookings");

  try {
    // Ensure the id is converted to ObjectId
    const res = await bookingCollection.deleteOne({
      _id: new ObjectId(params.id),
    });

    // Check if the deletion was successful
    if (res.deletedCount === 1) {
      return new NextResponse(
        JSON.stringify({
          message: "Booking deleted successfully",
          response: res,
        }),
        { status: 200 }
      );
    } else {
      return new NextResponse(
        JSON.stringify({ message: "Booking not found" }),
        { status: 404 }
      );
    }
  } catch (error) {
    console.log("Error deleting booking:", error);
    return new NextResponse(
      JSON.stringify({ message: "Error deleting booking" }),
      { status: 500 }
    );
  }
};
