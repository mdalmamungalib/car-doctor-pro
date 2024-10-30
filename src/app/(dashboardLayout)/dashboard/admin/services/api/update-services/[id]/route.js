import { connectDB } from "lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export const PATCH = async (request, { params }) => {
  try {

    const { id } = params;
    const body = await request.json();

    const db = await connectDB();
    const result = await db.collection("services").updateOne(
      { _id: new ObjectId(id) }, 
      { $set: body }
    );

    if (result.matchedCount === 0) {
      return new NextResponse(
        JSON.stringify({ message: "Service not found" }),
        {
          status: 404,
        }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Service updated successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error updating service:", error);
    return new NextResponse(
      JSON.stringify({ message: "Error updating service" }),
      {
        status: 500,
      }
    );
  }
};
