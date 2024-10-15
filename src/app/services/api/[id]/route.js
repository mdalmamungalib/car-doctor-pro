import { connectDB } from "lib/connectDB";
import { ObjectId } from "mongodb";
export const dynamic = "force-dynamic"; // Import ObjectId from mongodb

export const GET = async (request, { params }) => {
  const db = await connectDB();
  const servicesCollection = db.collection("services");

  try {
    // Convert the params.id to ObjectId for querying
    const serviceId = new ObjectId(params.id); // Convert to ObjectId

    // Find the service by its ObjectId
    const service = await servicesCollection.findOne({
      _id: serviceId,
    });

    if (!service) {
      return new Response(
        JSON.stringify({ message: "Service not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Return the found service
    return new Response(JSON.stringify(service), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching service:", error);
    return new Response(
      JSON.stringify({ message: "Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
