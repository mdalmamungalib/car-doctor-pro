"use client";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "components/LoadingPage/LoadingPage";
import Image from "next/image";
import axiosSecure from "lib/axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import React from "react";
export const dynamic = "force-dynamic";

const ABooking = ({ id }) => {
  const {
    data: booking = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["booking",id],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/dashboard/admin/all-bookings/api/get-a-booking/${id}`
      );
      return response.data;
    },
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const handleDownloadInvoice = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("INVOICE", 105, 20, null, null, "center");
    doc.setFontSize(12);
    doc.text(
      `Date: ${new Date().toLocaleDateString()}`,
      105,
      30,
      null,
      null,
      "center"
    );

    doc.setFontSize(10);
    doc.text("Car Doctor", 15, 40);
    doc.text("1234 Main Street", 15, 45);
    doc.text("City, Country", 15, 50);
    doc.text("Email: support@company.com", 15, 55);

    doc.text("Customer Name:", 150, 40);
    doc.text(booking.name, 150, 45);
    doc.text("Email:", 150, 50);
    doc.text(booking.email, 150, 55);
    doc.text("Phone:", 150, 60);
    doc.text(booking.phone, 150, 65);

    doc.autoTable({
      startY: 70,
      head: [["Service", "Price", "Booking Date", "Status"]],
      body: [
        [
          booking.service,
          `$${booking.price}`,
          new Date(booking.bookingData).toLocaleDateString(),
          booking.status,
        ],
      ],
      theme: "striped",
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.text(
      "Thank you for your Car Doctor",
      105,
      doc.internal.pageSize.height - 30,
      null,
      null,
      "center"
    );
    doc.setFontSize(8);
    doc.text(
      "For any inquiries, please contact us at support@company.com.",
      105,
      doc.internal.pageSize.height - 20,
      null,
      null,
      "center"
    );

    doc.save(`${booking.name}_invoice.pdf`);
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100 md:p-8 rounded-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
          Booking Details
        </h1>
        <p className="text-xs text-gray-500 md:text-sm">
          Admin Panel / Bookings / {booking.name}
        </p>
      </div>

      {/* Booking Details Section */}
      <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
        <div className="p-4 bg-white rounded-lg shadow-lg md:p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-800 md:text-xl">
            Booking Information
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">Name:</span>
              <span>{booking.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Email:</span>
              <span>{booking.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Phone:</span>
              <span>{booking.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Service:</span>
              <span>{booking.service}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Price:</span>
              <span className="text-green-500">
                ${booking.price}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Booking Date:</span>
              <span>
                {new Date(booking.bookingData).toLocaleDateString()}
              </span>
            </div>
            <div>
              <span className="font-medium">Message:</span>
              <p className="italic text-gray-500">
                {booking.message}
              </p>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Status:</span>
              <span
                className={`px-3 py-1 rounded-md text-white ${
                  booking.status === "Approved"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              >
                {booking.status}
              </span>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-lg md:p-6">
          <Image
            src={booking.image}
            alt={booking.name}
            width={500}
            height={400}
            className="object-cover rounded-md"
          />
        </div>
      </div>

      {/* Admin Controls with Invoice Download */}
      <div className="p-4 mt-6 bg-white rounded-lg shadow-lg md:mt-8">
        <h2 className="mb-4 text-lg font-semibold text-gray-800 md:text-xl">
          Admin Controls
        </h2>
        <div className="flex space-x-4">
          <button
            onClick={handleDownloadInvoice}
            className="px-4 py-2 text-white transition rounded-md shadow-md bg-[#FF3811] hover:bg-[#FF3810]"
          >
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default ABooking;
