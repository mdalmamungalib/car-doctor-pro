import { connectDB } from "lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";


export async function PATCH(request, { params }) {
  try {
    const db = await connectDB();
    const userCollection = db.collection("users");

    const { id } = params;

    const body = await request.json();

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
