import { connectDB } from "lib/connectDB";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request) => {
  try {
    const db = await connectDB();
    
    // Fetch all products from the database
    const products = await db.collection("products").find({}).toArray();
    
    // Return the response as JSON
    return NextResponse.json(products);
  } catch (error) {
    // Handle any errors that occur during the database operation
    return NextResponse.json(
      { message: "Failed to fetch products", error: error.message },
      { status: 500 }
    );
  }
};
