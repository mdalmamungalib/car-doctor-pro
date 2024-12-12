import { connectDB } from "../../../../lib/connectDB";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export const GET = async () => {
  try {
    const db = await connectDB();
    const servicesCollection = db.collection("services");

    const services = await servicesCollection.find({}).toArray();

    return new NextResponse(JSON.stringify({ services }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    return new NextResponse(
      JSON.stringify({
        message: "Failed to fetch services",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
