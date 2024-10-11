import { connectDB } from "lib/connectDB";

export const POST = async (request) => {
    try {
        const service = await request.json();

        // Input Validation
        const { title, description, price, img } = service;
        if (!title || !description || !price || !img) {
            return new Response(
                JSON.stringify({
                    status: 400,
                    message: "All fields are required.",
                }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        const db = await connectDB();
        const servicesCollection = db.collection("services");

        const newService = await servicesCollection.insertOne(service);

        return new Response(
            JSON.stringify({
                status: 201,
                message: "Service created successfully",
                serviceId: newService.insertedId,
            }),
            {
                status: 201,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        console.error("Error creating service:", error);

        return new Response(
            JSON.stringify({
                status: 500,
                message: "Internal Server Error. Please try again later.",
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
};
