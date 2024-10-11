import { connectDB } from "lib/connectDB";
import { services } from "lib/services";

export const GET = async () => {
  try {
    const db = await connectDB();
    const servicesCollection = db.collection("services");

    // Clear existing data
    await servicesCollection.deleteMany();

    // Insert new data
    const res = await servicesCollection.insertMany(services);

    return new Response(
      JSON.stringify({
        message: "Seeded Successfully",
        insertedCount: res.insertedCount,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error seeding services:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to seed services",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};
