import { connectDB } from "lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const PATCH = async (request, { params }) => {
  try {
    const { id } = params; 
    const body = await request.json(); 

    const db = await connectDB();
    const res = await db.collection("reviews").updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...body } }
    );

    
    if (res.matchedCount === 0) {
      return NextResponse.json({ message: "Review not found" }, { status: 404 });
    }

    if (res.modifiedCount > 0) {
      return NextResponse.json({ message: "Review updated successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "No changes made" }, { status: 200 });
    }
  } catch (error) {
    console.error("Error updating review:", error);

    // Handle any errors and return a 500 response
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
  }
};
