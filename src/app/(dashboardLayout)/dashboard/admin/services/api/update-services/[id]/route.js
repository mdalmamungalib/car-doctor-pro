import { connectDB } from "lib/connectDB";
import { ObjectId } from "mongodb";
import { unstable_noStore as noStore } from "next/cache";
export const dynamic = "force-dynamic";

export const PATCH = async (request, { params }) => {
  noStore();
  try {
    // Get the service ID from params
    const { id } = params;

    // Parse the request body to get the update data
    const body = await request.json();

    // Connect to the database
    const db = await connectDB();

    // Perform the update operation
    const result = await db.collection("services").updateOne(
      { _id: new ObjectId(id) }, // Query to find the document by ID
      { $set: body } // Update the document with new data
    );

    // Check if the update was successful
    if (result.matchedCount === 0) {
      return new Response(
        JSON.stringify({ message: "Service not found" }),
        {
          status: 404,
        }
      );
    }

    return new Response(
      JSON.stringify({ message: "Service updated successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error updating service:", error);
    return new Response(
      JSON.stringify({ message: "Error updating service" }),
      {
        status: 500,
      }
    );
  }
};
