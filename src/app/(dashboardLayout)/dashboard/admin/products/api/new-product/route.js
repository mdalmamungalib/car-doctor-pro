// app/api/products/route.js

import { connectDB } from "../../../../../../../lib/connectDB";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const POST = async (request) => {
  try {
    const product = await request.json();

    const db = await connectDB();
    const res = await db.collection("products").insertOne(product);

    return NextResponse.json(
      {
        message: "Product added successfully",
        productId: res.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add product", error: error.message },
      { status: 500 }
    );
  }
};

export const GET = async (request, { params }) => {
  try {
    const db = await connectDB();
    const products = await db.collection("products").find({}).toArray();

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);

    return NextResponse.json(
      { message: "Error fetching products", error: error.message },
      { status: 500 }
    );
  }
};

