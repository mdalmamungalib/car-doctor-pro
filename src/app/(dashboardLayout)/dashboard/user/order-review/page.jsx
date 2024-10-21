"use client";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "components/LoadingPage/LoadingPage";
import DashboardHeadImage from "components/shared/DashboardHeadImage";
import axiosSecure from "lib/axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdEditSquare } from "react-icons/md";
import { PiArrowBendUpLeftBold } from "react-icons/pi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
export const dynamic = "force-dynamic";

const Page = () => {
  const { data: session } = useSession();

  const {
    data: reviews = [],
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["reviews", session?.user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/dashboard/user/order-review/api/get-review/${session?.user?.email}`
      );
      return response.data;
    },
    enabled: !!session?.user?.email,
  });

  const handleDeleteReview = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF3811",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(
            `/dashboard/user/order-review/api/areview/${id}`
          );

          if (res.status === 200 || res.status === 204) {
            Swal.fire({
              title: "Deleted!",
              text: "Review has been deleted.",
              icon: "success",
              confirmButtonColor: "#3085d6",
            });
            refetch();
          } else {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the Review.",
              icon: "error",
              confirmButtonColor: "#3085d6",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "An error occurred while deleting the Review.",
            icon: "error",
            confirmButtonColor: "#3085d6",
          });
        }
      }
    });
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="mb-[130px]">
      <DashboardHeadImage
        title={"Manage All Review"}
        subTile={"Review Details"}
      />
      <div className="w-full overflow-x-auto mt-[130px]">
        <table className="min-w-full border-collapse table-auto md:table-auto">
          <tbody>
            {reviews && reviews.length > 0 ? (
              reviews?.map((review, index) => (
                <tr
                  key={index}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center justify-center ">
                    <td className="p-3">
                      <button
                        onClick={() =>
                          handleDeleteReview(review?._id)
                        }
                        className="bg-[#444444] rounded-full p-3 hover:bg-[#FF3811] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF3811]"
                        aria-label="Close"
                      >
                        <RxCross2 className="w-6 h-6 text-white" />
                      </button>
                    </td>
                    <td className="p-3">
                      <div className="w-[150px] h-[150px]">
                        <Image
                          src={review?.userImg}
                          alt="title"
                          width={150}
                          height={150}
                          className="rounded-[10px] w-[150px] h-[150px]"
                        />
                      </div>
                    </td>
                    <td className="p-3">
                      <h3 className="text-sm sm:text-lg md:text-xl font-semibold text-[#444444]">
                        {review?.userName}
                      </h3>
                    </td>
                  </div>
                  <td className="p-3">
                    <h3 className="text-sm sm:text-lg md:text-xl font-semibold text-[#444444]">
                      {review?.position}
                    </h3>
                  </td>
                  <td className="p-3">
                    <p className="text-sm sm:text-base md:text-[16px] lg:text-base font-normal text-[#737373] leading-[25px] md:leading-[28px] lg:leading-[30px] capitalize overflow-auto w-[230px] max-h-[80px]">
                      {review?.description}
                    </p>
                  </td>
                  <td className="p-3">
                    <div className="text-sm sm:text-lg font-semibold text-[#444444]">
                      <Link
                        href={`/dashboard/user/order-review/update-review/${review?._id}`}
                      >
                        <button className="text-2xl button">
                          <MdEditSquare />
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="p-3 text-center text-sm sm:text-base md:text-lg lg:text-xl font-medium text-[#FF3811]"
                >
                  No Review found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <style jsx global>{`
        /* Custom scrollbar styles for WebKit browsers */
        .overflow-auto::-webkit-scrollbar {
          width: 8px;
        }

        .overflow-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        .overflow-auto::-webkit-scrollbar-thumb {
          background: #888;
        }

        .overflow-auto::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default Page;
