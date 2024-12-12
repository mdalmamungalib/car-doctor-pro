import { connectDB } from "lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const DELETE = async (request, { params }) => {
  
  const { id } = params; 

  try {
    const db = await connectDB();
    const result = await db
      .collection("services")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return new NextResponse(
        JSON.stringify({ message: "Service deleted successfully" }),
        {
          status: 200,
        }
      );
    } else {
      return new NextResponse(
        JSON.stringify({ message: "Service not found" }),
        {
          status: 404,
        }
      );
    }
  } catch (error) {
    console.error("Error deleting service:", error); 
    return new NextResponse(
      JSON.stringify({
        message: "Error deleting service",
        error: error.message,
      }),
      {
        status: 500,
      }
    );
  }
};
