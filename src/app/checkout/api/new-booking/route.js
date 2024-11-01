import { connectDB } from "lib/connectDB";
import { sendEmail } from "lib/sendEmail"; 

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; 

export const POST = async (request) => {
  try {
    const booking = await request.json();
    const { email, name, service, bookingData: date } = booking;

    const db = await connectDB();
    const bookingCollection = db.collection("bookings");

    const newBooking = await bookingCollection.insertOne(booking);

    const subject = `Booking Confirmation for ${service}`;

    const html = `
  <html>
    <head>
      <style>
        /* Styling for the email */
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
        }
        .container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .header {
          background-color: #FF3811;
          color: #ffffff;
          text-align: center;
          padding: 20px;
        }
        .header img {
          max-width: 150px;
        }
        .content {
          padding: 20px;
          text-align: left;
          color: #333333;
        }
        .content h2 {
          color: #FF3811;
          margin-bottom: 20px;
        }
        .content p {
          font-size: 16px;
          line-height: 1.6;
        }
        .content .booking-info {
          margin: 20px 0;
          padding: 15px;
          background-color: #f9f9f9;
          border-left: 4px solid #FF3811;
          border-radius: 5px;
        }
        .footer {
          text-align: center;
          padding: 20px;
          background-color: #f4f4f4;
          color: #888888;
          font-size: 14px;
        }
        .footer a {
          color: #FF3811;
          text-decoration: none;
        }
        .button {
          display: inline-block;
          padding: 12px 25px;
          background-color: #FF3811;
          color: #ffffff;
          text-decoration: none;
          font-weight: bold;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Email Header -->
        <div class="header">
          <img src="https://i.ibb.co.com/FHWyNB4/logo.png" alt="Company Logo">
          <h1>Booking Confirmation</h1>
        </div>
        
        <!-- Email Content -->
        <div class="content">
          <h2>Hello ${name},</h2>
          <p>Thank you for booking our <strong>${service}</strong> service on <strong>${date}</strong>.</p>
          <div class="booking-info">
            <p><strong>Your Booking ID:</strong> ${newBooking.insertedId}</p>
          </div>
          <p>We look forward to providing you with excellent service.</p>
          <p>If you have any questions, feel free to <a href="mailto:miounhgastembc@gmail.com">contact our support team</a>.</p>
          
          <!-- CTA Button -->
          <p style="text-align: center;">
            <a href="https://car-doctor-pro-delta.vercel.app/dashboard/user/my-booking" class="button" style="color: white; text-decoration: none;">View Booking Details</a>
          </p>
        </div>
        
        <!-- Email Footer -->
        <div class="footer">
          <p>Best regards, <br> Car Doctor Team</p>
          <p><a href="https://car-doctor-pro-delta.vercel.app/">Visit our website</a> | <a href="mailto:miounhgastembc@gmail.com">Contact Support</a></p>
        </div>
      </div>
    </body>
  </html>`;

    const text = `
Hello ${name},

Thank you for booking our ${service} service on ${date}. 
Your booking ID is ${newBooking.insertedId}.

Best regards,
Your Company Team
`;

    const emailResponse = await sendEmail({
      to: email,
      subject,
      text,
      html,
    });

    if (!emailResponse.success) {
      return new NextResponse(
        JSON.stringify({
          message:
            "Service booked, but failed to send confirmation email",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new NextResponse(
      JSON.stringify({
        message:
          "Service booked successfully, confirmation email sent.",
        bookingId: newBooking.insertedId,
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error booking service or sending email:", error);

    return new NextResponse(
      JSON.stringify({
        error: "Failed to book service and send email",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
