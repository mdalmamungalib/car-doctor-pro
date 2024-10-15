import { connectDB } from "lib/connectDB";
export const dynamic = "force-dynamic";
export const POST = async (request) => {
  try {
    const booking = await request.json();
    const db = await connectDB();
    const bookingCollection = db.collection("bookings");

    const newBooking = await bookingCollection.insertOne(booking);

    return new Response(
      JSON.stringify({
        message: "Service booked successfully",
        bookingId: newBooking.insertedId, 
      }),
      {
        status: 201, 
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error booking service:", error);

    return new Response(
      JSON.stringify({ error: "Failed to book service" }),
      {
        status: 500, 
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
