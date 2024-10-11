"use client";
import { RxCross2 } from "react-icons/rx";
import { PiArrowBendUpLeftBold } from "react-icons/pi";
import { RiDeleteBin5Line, RiUserAddFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import { FaSquareGithub } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

import Link from "next/link";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingPage from "components/LoadingPage/LoadingPage";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "lib/axios";
import Swal from "sweetalert2";

const Page = () => {
  const { data: session } = useSession();

  const {
    data: users = [],
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosSecure.get(
        "/dashboard/admin/all-users/api/users"
      );
      return response.data;
    },
    enabled: !!session?.user?.email,
  });

  // Make a admin
  const handleMakeAdmin = async (id) => {
    try {
      const response = await axiosSecure.patch(
        `/dashboard/admin/all-users/api/update/${id}`, // Ensure this path matches your API route
        {
          role: "admin", // You can send any additional data here
        }
      );

      if (response.status === 200 || response.status === 201) {
        refetch();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "User has been made an admin.",
        });
      }
    } catch (error) {
      console.error("Error making admin:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to make admin.",
      });
    }
  };

  // Delete user

  const handleDeleteUser = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF3811", // Customize the confirm button color
      cancelButtonColor: "#444444", // Customize the cancel button color
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel", // Customize the cancel button text
      buttonsStyling: false, // Disable default button styles
      customClass: {
        popup: "rounded-xl shadow-lg", // Customize the popup style
        title: "text-xl font-bold text-[#444444]", // Customize title font and color
        htmlContainer: "text-sm text-[#555555]", // Customize text inside Swal
        confirmButton:
          "bg-[#FF3811] text-white py-2 px-4 rounded-full mx-2", // Style confirm button
        cancelButton:
          "bg-[#444444] text-white py-2 px-4 rounded-full mx-2", // Style cancel button
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Send DELETE request using Axios to delete a specific user by ID
          const res = await axiosSecure.delete(
            `/dashboard/admin/all-users/api/delete-user/${id}`
          );

          if (res.status === 200) {
            // Show success message
            Swal.fire({
              title: "Deleted!",
              text: "The user has been deleted.",
              icon: "success",
              confirmButtonColor: "#FF3811",
              customClass: {
                confirmButton:
                  "bg-[#FF3811] text-white py-2 px-4 rounded-full",
              },
            });

            // Optionally, refresh data or update the UI after deletion
            refetch(); // If using react-query to refetch the updated list of users
          } else {
            // Show error message if the deletion failed
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the user.",
              icon: "error",
              confirmButtonColor: "#FF3811",
              customClass: {
                confirmButton:
                  "bg-[#FF3811] text-white py-2 px-4 rounded-full",
              },
            });
          }
        } catch (error) {
          console.error("Error deleting user:", error);

          // Show error message if an exception occurs
          Swal.fire({
            title: "Error!",
            text: "An error occurred while deleting the user.",
            icon: "error",
            confirmButtonColor: "#FF3811",
            customClass: {
              confirmButton:
                "bg-[#FF3811] text-white py-2 px-4 rounded-full",
            },
          });
        }
      }
    });
  };

  if (isLoading) return <LoadingPage />;

  if (isError) return <div>Error: {error.message}</div>;

  const provider = (method) => {
    switch (method) {
      case "google":
        return <FcGoogle className="text-3xl " />;
      case "facebook":
        return <ImFacebook2 className="text-3xl text-[#1877F2]" />;
      case "github":
        return (
          <FaSquareGithub className="text-3xl text-[#4078c0]" />
        );
      default:
        return <MdEmail className="text-3xl text-[#004f9f]" />;
    }
  };

  return (
    <div className="p-4">
      <div
        className="w-full min-h-[210px] sm:min-h-[300px] rounded-lg bg-cover bg-no-repeat bg-center flex items-center justify-center relative"
        style={{
          backgroundImage:
            "linear-gradient(90deg, #151515 0%, rgba(21, 21, 21, 0.00) 100%), url('/assets/images/checkout/checkout.png')",
        }}
      >
        <div className="absolute left-0 pl-4 sm:pl-8 md:pl-12 lg:pl-[124px] xl:pl-[124px]">
          <h1 className="text-xl font-bold text-white sm:text-2xl md:text-3xl lg:text-4xl font-inter">
            User Details
          </h1>
          <p className="text-base font-medium text-[#FF3811] mt-2">
          Dashboard - User Details
          </p>
        </div>
      </div>
      <div className="w-full mt-8 overflow-x-auto">
        <table className="min-w-full border-collapse table-auto">
          <thead>
            <tr className="text-sm font-semibold text-left text-gray-700 bg-gray-100">
              <th className="p-3">Actions</th>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Provider</th>
              <th className="p-3">User status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="p-3">
                  <button
                    onClick={() => handleDeleteUser(user?._id)}
                    className="bg-[#444444] hover:bg-[#FF3811] rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF3811]"
                    aria-label="Close"
                  >
                    <RxCross2 className="w-6 h-6 text-white" />
                  </button>
                </td>
                <td className="p-3">
                  {user?.image ? (
                    <Image
                      src={user?.image}
                      alt="User Image"
                      width={150}
                      height={150}
                      className="rounded-lg max-w-[150px] h-[100px]"
                    />
                  ) : (
                    <Image
                      src="https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/3da39-no-user-image-icon-27.png?fit=500%2C500&ssl=1"
                      alt="Default User Image"
                      width={150}
                      height={150}
                      className="rounded-lg max-w-[150px] h-[100px]"
                    />
                  )}
                </td>
                <td className="p-3">
                  <h3 className="text-sm sm:text-lg font-semibold text-[#444444]">
                    {user?.name}
                  </h3>
                </td>
                <td className="p-3">
                  <h3 className="text-sm sm:text-lg font-semibold text-[#444444]">
                    {user?.email || "No user email found"}
                  </h3>
                </td>
                <td className="p-3">
                  <div className="text-sm sm:text-lg font-semibold text-[#444444]">
                    {provider(user?.provider)}
                  </div>
                </td>
                <td className="p-3">
                  {user?.role === "admin" ? (
                    <button className="button bg-success hover:bg-success">
                      Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user?._id)}
                      className="text-2xl button"
                    >
                      <RiUserAddFill />
                    </button>
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

export default Page;
