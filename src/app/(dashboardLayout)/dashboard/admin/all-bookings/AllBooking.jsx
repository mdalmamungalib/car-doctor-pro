"use client";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "components/LoadingPage/LoadingPage";
import DashboardHeadImage from "components/shared/DashboardHeadImage";
import axiosSecure from "lib/axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
export const dynamic = "force-dynamic";

const AllBooking = () => {
  const [dropdownOpen, setDropdownOpen] = useState({});

  const toggleDropdown = (id) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const {
    data: bookings = [],
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/dashboard/admin/all-bookings/api/get-all-bookings`
      );
      return response.data;
    },
  });

  if (refetch) {
    refetch();
  }

  if (isLoading) {
    return <LoadingPage />;
  }

  const handleStatusUpdate = async (id, status) => {
    setDropdownOpen((prevState) => ({ ...prevState, [id]: false }));

    try {
      const response = await axiosSecure.patch(
        `/dashboard/admin/all-bookings/api/update-status/${id}`,
        { status } 
      );

      if (response.status === 200) {
        refetch();
        
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDeleteBooking = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this booking? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF3811",
      cancelButtonColor: "#444444",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(
            `/dashboard/admin/all-bookings/api/delete-booking/${id}`
          );

          if (res.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "The booking has been deleted successfully.",
              icon: "success",
              confirmButtonColor: "#FF3811",
            });

            refetch();
          } else {
            Swal.fire({
              title: "Error",
              text: "Failed to delete the booking.",
              icon: "error",
              confirmButtonColor: "#FF3811",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "An error occurred while deleting the booking.",
            icon: "error",
            confirmButtonColor: "#FF3811",
          });
        }
      }
    });
  };

  return (
    <div className="p-4">
      <DashboardHeadImage
        title={"Manage All Orders"}
        subTile={"All Orders Details"}
      />
      <div className="w-full mt-8 overflow-x-auto ">
        <table className="min-w-full border-collapse table-auto">
          <thead>
            <tr className="text-sm font-semibold text-left text-gray-700 bg-gray-100">
              <th className="p-3">Delete</th>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Booking Date</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking._id}
                className="border-b border-gray-200"
              >
                <td className="p-3">
                  <button
                    onClick={() => handleDeleteBooking(booking._id)}
                    className="bg-[#444444] hover:bg-[#FF3811] rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF3811]"
                    aria-label="Delete"
                  >
                    <RxCross2 className="w-6 h-6 text-white" />
                  </button>
                </td>
                <td className="p-3">
                  <Image
                    src={booking.image}
                    alt="Service Image"
                    width={150}
                    height={150}
                    className="rounded-lg max-w-[150px] h-[100px]"
                  />
                </td>
                <Link
                  href={`/dashboard/admin/all-bookings/abooking/${booking._id}`}
                >
                  <td className="p-3 align-top cursor-pointer">
                    <h3 className="text-sm sm:text-lg font-semibold text-[#444444] mb-[5px]">
                      {booking.name}
                    </h3>
                    <div className="text-[#A2A2A2] w-full">
                      <p className="mb-1 text-xs sm:text-sm">
                        Service: {booking.service}
                      </p>
                      <p className="text-xs sm:text-sm">
                        Price: ${booking.price}
                      </p>
                    </div>
                  </td>
                </Link>

                <td className="p-3">
                  <h3 className="text-sm sm:text-lg font-semibold text-[#444444]">
                    {booking.email}
                  </h3>
                </td>
                <td className="p-3">
                  <h3 className="text-sm sm:text-lg font-semibold text-[#444444]">
                    {booking.phone}
                  </h3>
                </td>
                <td className="p-3">
                  <h3 className="text-sm sm:text-lg font-semibold text-[#444444]">
                    {new Date(
                      booking.bookingData
                    ).toLocaleDateString()}
                  </h3>
                </td>
                <td className="relative p-3">
                  <button
                    onClick={() => toggleDropdown(booking._id)}
                    className={`inline-flex justify-center w-full px-4 py-2 text-sm font-medium 
      bg-white border 
       rounded-md hover:bg-gray-100
       focus:outline-none ${
         booking.status === "Approved"
           ? "text-[#29B170] border-[#29B170]" 
           : booking.status === "Review"
           ? "text-[#1E90FF] border-[#1E90FF]" 
           : booking.status === "Pending"
           ? "text-[#FF3811] border-[#FF3811]"
           : "text-[#FF3811] border-[#FF3811]" 
       }`}
                  >
                    {booking.status || "Pending"}
                    <svg
                      className="w-5 h-5 ml-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </button>

                  {dropdownOpen[booking._id] && (
                    <div
                      className="absolute right-0 z-50 w-40 mt-2 bg-white rounded-lg shadow-lg"
                      style={{ zIndex: 1000 }}
                    >
                      <div className="py-1">
                        <button
                          onClick={() =>
                            handleStatusUpdate(
                              booking._id,
                              "Approved"
                            )
                          }
                          className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-[#FF3811] hover:text-white"
                        >
                          Approved
                        </button>
                        <button
                          onClick={() =>
                            handleStatusUpdate(
                              booking._id,
                              "Review"
                            )
                          }
                          className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-[#FF3811] hover:text-white"
                        >
                          Review
                        </button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBooking;
