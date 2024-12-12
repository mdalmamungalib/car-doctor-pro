import { connectDB } from "../../../../../../../lib/connectDB";
import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";

export const POST = async (request) => {
    try {
        const service = await request.json();

        const { title, description, price, img } = service;
        if (!title || !description || !price || !img) {
            return NextResponse.json(
                {
                    status: 400,
                    message: "All fields are required.",
                },
                { status: 400 }
            );
        }

        const db = await connectDB();
        const servicesCollection = db.collection("services");

        const newService = await servicesCollection.insertOne(service);

        return NextResponse.json(
            {
                status: 201,
                message: "Service created successfully",
                serviceId: newService.insertedId,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating service:", error);

        return NextResponse.json(
            {
                status: 500,
                message: "Internal Server Error. Please try again later.",
            },
            { status: 500 }
        );
    }
};
