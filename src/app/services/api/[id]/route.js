import { connectDB } from "../../../../lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic"; 

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const servicesCollection = db.collection("services");

  try {
    const serviceId = new ObjectId(params.id); 

    const service = await servicesCollection.findOne({
      _id: serviceId,
    });

    if (!service) {
      return new NextResponse(
        JSON.stringify({ message: "Service not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new NextResponse(JSON.stringify(service), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching service:", error);
    return new NextResponse(
      JSON.stringify({ message: "Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
