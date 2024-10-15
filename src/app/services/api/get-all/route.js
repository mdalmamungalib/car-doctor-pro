import { connectDB } from "lib/connectDB";
export const dynamic = "force-dynamic";

export const GET = async () => {
  try {
    const db = await connectDB();
    const servicesCollection = db.collection("services");

    // Fetch services from the collection
    const services = await servicesCollection.find().toArray();

    return new Response(JSON.stringify({ services }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    return new Response(
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
