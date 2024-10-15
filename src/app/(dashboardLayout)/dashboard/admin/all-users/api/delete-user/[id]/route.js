import { connectDB } from "lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

// DELETE user API
export const DELETE = async (request, { params }) => {
  try {
    const db = await connectDB();
    const userCollection = db.collection("users");

    const result = await userCollection.deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 1) {
      return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ message: "Failed to delete user" }, { status: 500 });
  }
};
