"use client";
import LoadingPage from "components/LoadingPage/LoadingPage";
import Image from "next/image";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { PiArrowBendUpLeftBold } from "react-icons/pi";
import { RiDeleteBin5Line } from "react-icons/ri";
import Link from "next/link";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../../../lib/axios";
import { useSession } from "next-auth/react";
import DashboardHeadImage from "components/shared/DashboardHeadImage";

export const dynamic = "force-dynamic";

const MyBooking = () => {
  const { data: session, status } = useSession();
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    data: bookings = [],
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["bookings", session?.user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/dashboard/my-booking/api/${session?.user?.email}`
      );
      return response.data;
    },
    enabled: !!session?.user?.email,
  });

  // Delete a single booking
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF3811",
      cancelButtonColor: "#444444",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsDeleting(true);
        try {
          const res = await axiosSecure.delete(
            `/dashboard/user/my-booking/api/booking/${id}`
          );
          if (res.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
              confirmButtonColor: "#FF3811",
            }).then(() => {
              window.location.reload();
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete booking.",
              icon: "error",
              confirmButtonColor: "#FF3811",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "An error occurred while deleting.",
            icon: "error",
            confirmButtonColor: "#FF3811",
          });
        } finally {
          setIsDeleting(false);
        }
      }
    });
  };

  // Delete all bookings
  const handleDeleteAllBookings = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF3811",
      cancelButtonColor: "#444444",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsDeleting(true);
        try {
          const res = await axiosSecure.delete(
            `/dashboard/user/my-booking/api/delete-all`
          );
          if (res.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "All your bookings have been deleted.",
              icon: "success",
              confirmButtonColor: "#FF3811",
            }).then(() => {
              window.location.reload();
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete all bookings.",
              icon: "error",
              confirmButtonColor: "#FF3811",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "An error occurred while deleting all bookings.",
            icon: "error",
            confirmButtonColor: "#FF3811",
          });
        } finally {
          setIsDeleting(false);
        }
      }
    });
  };

  if (isError) {
    return (
      <div className="p-5">
        <h2 className="text-lg text-red-600">
          Error: {error.message}
        </h2>
      </div>
    );
  }

  if (isLoading) {
    return <LoadingPage />;
  }
  if (status === "loading") {
    return <LoadingPage />;
  }
  if (isDeleting) {
    return <LoadingPage />;
  }

  return (
    <div className="">
      <DashboardHeadImage
        title={"Manage All Bookings"}
        subTile={"All Booking Details"}
      />
      <div className="w-full overflow-x-auto mt-[130px]">
        <table className="min-w-full border-collapse table-auto md:table-auto">
          <tbody>
            {bookings && bookings.length > 0 ? (
              bookings?.map((booking, index) => (
                <tr
                  key={index}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center justify-center ">
                    <td className="p-3">
                      <button
                        onClick={() => handleDelete(booking?._id)}
                        className="bg-[#444444] rounded-full p-3 hover:bg-[#FF3811] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF3811]"
                        aria-label="Close"
                      >
                        <RxCross2 className="w-6 h-6 text-white" />
                      </button>
                    </td>
                    <td className="p-3">
                      <div className="w-[150px] h-[150px]">
                        <Image
                          src={booking?.image}
                          alt="title"
                          width={150}
                          height={150}
                          className="rounded-[10px] w-[150px] h-[150px]"
                        />
                      </div>
                    </td>
                    <td className="p-3">
                      <h3 className="text-sm sm:text-lg md:text-xl font-semibold text-[#444444]">
                        {booking?.service}
                      </h3>
                    </td>
                  </div>
                  <td className="p-3">
                    <h3 className="text-sm sm:text-lg md:text-xl font-semibold text-[#444444]">
                      ${booking?.price}
                    </h3>
                  </td>
                  <td className="p-3">
                    <h3 className="text-sm sm:text-lg md:text-xl font-semibold text-[#444444]">
                      {new Date(
                        booking.bookingData
                      ).toLocaleDateString()}
                    </h3>
                  </td>
                  <td className="p-3">
                    {booking?.status === "Pending" ? (
                      <button className="text-white bg-[#FF3811] py-2 px-4 rounded-2xl transition-transform transform hover:scale-105 focus:outline-none">
                        {booking?.status}
                      </button>
                    ) : booking?.status === "Approved" ? (
                      <button className="bg-[#29B170] text-white py-2 px-4 rounded-2xl transition-transform transform hover:scale-105 focus:outline-none">
                        {booking?.status}
                      </button>
                    ) : booking?.status === "Review" ? (
                      <Link href={"/dashboard/user/review"}>
                        <button className="bg-[#1E90FF] text-white py-2 px-4 rounded-2xl transition-transform transform hover:scale-105 focus:outline-none">
                          {booking?.status}
                        </button>
                      </Link>
                    ) : (
                      <button className="bg-[#FF3811] text-white py-2 px-4 rounded-2xl transition-transform transform hover:scale-105 focus:outline-none">
                        Pending
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="p-3 text-center text-sm sm:text-base md:text-lg lg:text-xl font-medium text-[#FF3811]"
                >
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-[50px]">
        {/* Continue Shopping Section */}
        <Link href={"/services"}>
          <div className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-[#444444] flex gap-5 items-center">
            <PiArrowBendUpLeftBold />
            <p>Continue Shopping</p>
          </div>
        </Link>

        {/* Clear Shopping Cart Section */}

        <div
          onClick={() => handleDeleteAllBookings()}
          className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-[#444444] flex gap-5 items-center cursor-pointer hover:text-[#FF3811]"
        >
          <RiDeleteBin5Line />
          <p>Clear Shopping Cart</p>
        </div>
      </div>
    </div>
  );
};

export default MyBooking;
