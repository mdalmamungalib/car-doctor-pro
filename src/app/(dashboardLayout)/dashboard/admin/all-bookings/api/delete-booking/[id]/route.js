import { connectDB } from "lib/connectDB";
import { ObjectId } from "mongodb";
export const dynamic = "force-dynamic";

export const DELETE = async (request, { params }) => {
  try {
    const { id } = params;
    
    // Connect to the database
    const db = await connectDB();

    // Ensure the ID is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: "Invalid booking ID" }), { status: 400 });
    }

    // Attempt to delete the document
    const result = await db
      .collection("bookings")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ error: "Booking not found" }), { status: 404 });
    }

    // Success response
    return new Response(JSON.stringify({ message: "Booking deleted successfully" }), { status: 200 });
    
  } catch (error) {
    console.error("Error deleting booking:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};
