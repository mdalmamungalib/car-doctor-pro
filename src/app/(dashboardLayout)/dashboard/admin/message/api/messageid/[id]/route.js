import { connectDB } from "lib/connectDB";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb"; 

export const dynamic = "force-dynamic";

export const DELETE = async (request, { params }) => {
    const { id } = params;

    try {
        const db = await connectDB();
        const res = await db.collection("messages").deleteOne({ _id: new ObjectId(id) }); 

        if (res.deletedCount === 1) {
            return NextResponse.json({ message: "Message deleted successfully" });
        } else {
            return NextResponse.json({ message: "Message not found" }, { status: 404 });
        }
    } catch (error) {
        console.error("Error deleting message:", error);
        return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
    }
};
