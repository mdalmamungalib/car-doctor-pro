import { connectDB } from "lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

// Export the PATCH method
export async function PATCH(request, { params }) {
  try {
    const db = await connectDB();
    const userCollection = db.collection("users");

    // Get the user ID from the params
    const { id } = params;

    // Parse request body (for additional data if needed)
    const body = await request.json();

    // Find and update the user role to "admin"
    const filter = { _id: new ObjectId(id) };
    const updateDoc = {
      $set: {
        role: "admin",
      },
    };

    const result = await userCollection.updateOne(
      filter,
      updateDoc
    );

    if (result.modifiedCount === 1) {
      return NextResponse.json({
        message: "User role updated to admin",
      });
    } else {
      return NextResponse.json(
        { error: "Failed to update user role" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json(
      { error: "An error occurred while updating user role" },
      { status: 500 }
    );
  }
}
