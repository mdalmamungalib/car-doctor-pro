import { connectDB } from "../../../../../../../../lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

//delete product
export const DELETE = async (request, { params }) => {
  const { id } = params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: "Invalid ID format" },
      { status: 400 }
    );
  }

  try {
    const db = await connectDB();

    const result = await db
      .collection("products")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Service deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting service:", error);

    return NextResponse.json(
      { message: "Error deleting service", error: error.message },
      { status: 500 }
    );
  }
};

// get a single product
export const GET = async (request, { params }) => {
  const { id } = params;
  
  try {
    const db = await connectDB();
    const product = await db.collection("products").findOne({ _id: new ObjectId(id) });
    
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    
    return NextResponse.json(product, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({ message: "Error fetching product", error }, { status: 500 });
  }
};

//update a product
export const PATCH = async (request, { params }) => {
  const { id } = params;
  
  try {
    const db = await connectDB();
    const productData = await request.json();
    
    const result = await db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      { $set: productData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product updated successfully" }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({ message: "Error updating product", error }, { status: 500 });
  }
};