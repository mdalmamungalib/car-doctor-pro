import { connectDB } from "lib/connectDB";
import { ObjectId } from "mongodb";
import { unstable_noStore as noStore } from 'next/cache';
export const dynamic = "force-dynamic";

export const DELETE = async (request, { params }) => {
  noStore()
  const { id } = params; // Extract the id from params

  try {
    const db = await connectDB();
    const result = await db
      .collection("services")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return new Response(
        JSON.stringify({ message: "Service deleted successfully" }),
        {
          status: 200,
        }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Service not found" }),
        {
          status: 404,
        }
      );
    }
  } catch (error) {
    console.error("Error deleting service:", error); // Optional: log for debugging
    return new Response(
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
