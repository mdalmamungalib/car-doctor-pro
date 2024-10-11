import { connectDB } from "lib/connectDB";
import { NextResponse } from "next/server";

export const DELETE = async (request) => {
  const db = await connectDB();
  const bookingCollection = db.collection("bookings");
  try {
    const res = await bookingCollection.deleteMany({});
    return NextResponse.json({
      message: "All booking have bin cleared",
      response: res,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json("failed to delete booking", {
      status: 500,
    });
  }
};
