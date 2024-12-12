import { connectDB } from "../../../../../../../../lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request, { params }) => {

  const { id } = params; 
  const db = await connectDB();

  try {
    const service = await db
      .collection("services")
      .findOne({ _id: new ObjectId(id) });

    if (!service) {
      return new NextResponse(
        JSON.stringify({ message: "Service not found" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new NextResponse(JSON.stringify(service), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching service:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
