import { connectDB } from "lib/connectDB";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";

export const PATCH = async (request, { params }) => {
  const { id } = params; // Extract the id from params
  const { status } = await request.json(); // Extract status from request body

  try {
    const db = await connectDB();
    const result = await db.collection("bookings").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    if (result.modifiedCount === 1) {
      return new Response(
        JSON.stringify({ message: "Booking status updated successfully" }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Booking not found or status unchanged" }),
        { status: 404 }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Error updating booking status", error }),
      { status: 500 }
    );
  }
};
