import { connectDB } from "lib/connectDB";
import { getServerSession } from "next-auth/next";
import { authOptions } from "app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { headers, cookies } from "next/headers"; // Get headers and cookies

// Mock the `req` and `res` objects
function mockRequestResponse() {
  const req = {
    headers: headers(),
    cookies: cookies(),
  };

  // Mock a response object with only needed methods
  const res = {
    getHeader() {
      return null;
    },
    setHeader() {
      return null;
    },
  };

  return { req, res };
}

export const GET = async () => {
  try {
    const { req, res } = mockRequestResponse();

    // Use getServerSession with the mocked req and res objects
    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    const db = await connectDB();
    const userCollection = db.collection("users");

    // Find the admin user by email
    const user = await userCollection.findOne({
      email: session.user.email,
    });

    if (!user) {
      return NextResponse.json(
        { message: "No admin user found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
};
