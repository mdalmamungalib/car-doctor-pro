import { connectDB } from "lib/connectDB";
import { ObjectId } from "mongodb";
import { unstable_noStore as noStore } from "next/cache";
export const dynamic = "force-dynamic";

export const GET = async (request, { params }) => {
  noStore();
  const { id } = params; // Get id from params
  const db = await connectDB();

  try {
    const service = await db
      .collection("services")
      .findOne({ _id: new ObjectId(id) });

    if (!service) {
      return new Response(
        JSON.stringify({ message: "Service not found" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(JSON.stringify(service), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching service:", error);
    return new Response(
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
