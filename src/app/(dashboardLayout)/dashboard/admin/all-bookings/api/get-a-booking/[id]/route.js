import { connectDB } from "lib/connectDB";
import { ObjectId } from "mongodb";
export const dynamic = "force-dynamic";

export const GET = async (request, { params }) => {
  try {
    const { id } = params;

    const db = await connectDB();
    const booking = await db
      .collection("bookings")
      .findOne({ _id: new ObjectId(id) });
    if (!booking) {
      return new Response("Booking not found", { status: 404 });
    }

    return new Response(JSON.stringify(booking), {
      status: 200,
      headers: { "Content-type": "application/json" },
    });
  } catch (error) {
    console.log("Error fetching booking:", error);
    return new Response("Internal server error", { status: 500 });
  }
};
