import { connectDB } from "../../../lib/connectDB";
import bcrypt from "bcrypt";
import { sendEmail } from "../../../lib/sendEmail";
export const dynamic = "force-dynamic";

export const POST = async (request) => {
  try {
    const newUser = await request.json(); 
    const db = await connectDB();
    const userCollection = db.collection("users");

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
    const hashPassword = bcrypt.hashSync(newUser?.password, 14);

    const res = await userCollection.insertOne({
      ...newUser,
      password: hashPassword,
    });
    const emailSubject = "🌍 Welcome to Our Global Community!";
    const emailText = `Hello ${newUser.name},

Thank you for joining our global community! We are thrilled to have you on board.

Best Regards,
Your Company`;

    const emailHtml = `
      <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 20px;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 10px;
              box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            .header {
              background-color: #FF3811;
              color: white;
              padding: 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
            }
            .content {
              padding: 20px;
              text-align: center;
            }
            .content p {
              line-height: 1.6;
            }
            .button {
              display: inline-block;
              margin-top: 20px;
              padding: 12px 25px;
              background-color: #FF3811;
              color: white;
              text-decoration: none;
              border-radius: 5px;
              font-size: 16px;
              font-weight: bold;
              transition: background-color 0.3s ease;
            }
            .button:hover {
              background-color: #e03b0e;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              color: #777;
              padding: 15px 20px;
              background-color: #f8f8f8;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Our Global Community, ${newUser.name}!</h1>
            </div>
            <div class="content">
              <p>Thank you for registering! You are now part of a worldwide family.</p>
              <p>Explore our services and connect with people around the globe!</p>
              <a href="https://car-doctor-pro-delta.vercel.app/services" class="button">Explore Now</a>
            </div>
            <div class="footer">
              <p>Best Regards,<br>Your Company</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailSent = await sendEmail({
      to: newUser.email,
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    });

    return new Response(
      JSON.stringify({
        status: 201,
        message: "User created successfully",
        data: res.insertedId,
      }),
      { status: 201 }
    );
  } catch (error) {
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
