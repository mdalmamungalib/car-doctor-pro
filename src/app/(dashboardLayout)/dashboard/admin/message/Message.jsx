"use client";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "components/LoadingPage/LoadingPage";
import axiosSecure from "lib/axios";
import Image from "next/image";
import Link from "next/link";
import { MdEditSquare } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { IoMdAddCircleOutline } from "react-icons/io";
import Swal from "sweetalert2";
import DashboardHeadImage from "components/shared/DashboardHeadImage";

export const dynamic = "force-dynamic";

const Message = () => {
  const {
    data: massages = [],
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["massages"],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/dashboard/admin/message/api/getmessage`
      );
      return response.data;
    },
  });
  if (isLoading) {
    return <LoadingPage />;
  }

  const handleDeleteMessage = async (id) => {
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
            `/dashboard/admin/message/api/messageid/${id}`
          );

          if (res.status === 200 || res.status === 204) {
            Swal.fire({
              title: "Deleted!",
              text: "Message has been deleted.",
              icon: "success",
              confirmButtonColor: "#3085d6",
            });
            refetch();
          } else {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the message.",
              icon: "error",
              confirmButtonColor: "#3085d6",
            });
          }
        } catch (error) {
          console.error("Error deleting message:", error);
          Swal.fire({
            title: "Error!",
            text: "An error occurred while deleting the message.",
            icon: "error",
            confirmButtonColor: "#3085d6",
          });
        }
      }
    });
  };

  return (
    <div className="p-4 ">
      <DashboardHeadImage
        title={"Manage All Messages"}
        subTile={"All Messages Details"}
      />
      <div className="w-full mt-8 overflow-x-auto">
        <table className="min-w-full border-collapse table-auto">
          <thead>
            <tr className="text-sm font-semibold text-left text-gray-700 bg-gray-100">
              <th className="p-3">Delete</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Message</th>
            </tr>
          </thead>
          <tbody>
            {massages.map((message, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="p-3">
                  <button
                    onClick={() =>
                      handleDeleteMessage(message?._id)
                    }
                    className="bg-[#444444] hover:bg-[#FF3811] rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF3811]"
                    aria-label="Close"
                  >
                    <RxCross2 className="w-6 h-6 text-white" />
                  </button>
                </td>

                <td className="p-3">
                  <h3 className="text-sm sm:text-lg font-semibold text-[#444444]">
                    {message?.name}
                  </h3>
                </td>
                <td className="p-3">
                  <h3 className="text-sm sm:text-lg font-semibold text-[#444444]">
                    {message?.email}
                  </h3>
                </td>
                <td className="p-3">
                  <p className="text-sm sm:text-base md:text-[16px] lg:text-base font-normal text-[#737373] leading-[25px] md:leading-[28px] lg:leading-[30px] capitalize overflow-auto max-h-[80px] max-w-[560px]">
                    {message?.text}
                  </p>
                </td>
              </tr>
            ))}
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

export default Message;
