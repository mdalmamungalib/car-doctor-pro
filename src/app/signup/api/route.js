import { connectDB } from "lib/connectDB";
import bcrypt from "bcrypt";
export const dynamic = "force-dynamic";

export const POST = async (request) => {
  try {
    const newUser = await request.json(); // Await the request to get the JSON data
    const db = await connectDB();
    const userCollection = db.collection("users");

    // Check if the user already exists
    const existingUser = await userCollection.findOne({
      email: newUser?.email,
    });
    if (existingUser) {
      return new Response(
        JSON.stringify({
          status: 400,
          message: "Email already exists",
        }),
        { status: 400 }
      );
    }

    // Password Security Considerations
    const hashPassword = bcrypt.hashSync(newUser?.password, 14);

    // Insert the new user
    const res = await userCollection.insertOne({
      ...newUser,
      password: hashPassword,
    });

    // Return the created user data
    return new Response(
      JSON.stringify({
        status: 201,
        message: "User created successfully",
        data: res.insertedId,
      }),
      { status: 201 }
    );
  } catch (error) {
    // Handle errors
    console.error("Error creating user:", error);
    return new Response(
      JSON.stringify({
        status: 500,
        message: "Internal Server Error",
      }),
      { status: 500 }
    );
  }
};
