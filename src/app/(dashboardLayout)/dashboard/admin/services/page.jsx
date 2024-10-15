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
export const dynamic = "force-dynamic";

const Page = () => {
  const {
    data: services = [],
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/services/api/get-all`
      );
      return response.data.services;
    },
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  const handleDeleteService = async (id) => {
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
          // Perform delete operation
          const res = await axiosSecure.delete(
            `/dashboard/admin/services/api/delete-service/${id}`
          );

          // Check the response status
          if (res.status === 200 || res.status === 204) {
            // Adjust according to your API response
            // Show success message
            Swal.fire({
              title: "Deleted!",
              text: "Service has been deleted.",
              icon: "success",
              confirmButtonColor: "#3085d6",
            });
            // Optionally refetch data
            refetch();
          } else {
            // If the status is not successful, show error message
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the service.",
              icon: "error",
              confirmButtonColor: "#3085d6",
            });
          }
        } catch (error) {
          // Show error notification on request failure
          Swal.fire({
            title: "Error!",
            text: "An error occurred while deleting the service.",
            icon: "error",
            confirmButtonColor: "#3085d6",
          });
        }
      }
    });
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
            Service Details
          </h1>
          <p className="text-base font-medium text-[#FF3811] mt-2">
            Dashboard - Service Details
          </p>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Link href="/dashboard/admin/add-service">
          <button className="flex items-center gap-2 bg-[#FF3811] text-white px-4 py-2 mt-10 rounded-full hover:bg-[#e63610] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF3811]">
            <IoMdAddCircleOutline className="w-6 h-6" />
            <span>Add New Service</span>
          </button>
        </Link>
      </div>
      <div className="w-full mt-8 overflow-x-auto">
        <table className="min-w-full border-collapse table-auto">
          <thead>
            <tr className="text-sm font-semibold text-left text-gray-700 bg-gray-100">
              <th className="p-3">Delete</th>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Edit</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="p-3">
                  <button
                    onClick={() =>
                      handleDeleteService(service?._id)
                    }
                    className="bg-[#444444] hover:bg-[#FF3811] rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF3811]"
                    aria-label="Close"
                  >
                    <RxCross2 className="w-6 h-6 text-white" />
                  </button>
                </td>
                <td className="p-3">
                  <Image
                    src={service?.img}
                    alt="User Image"
                    width={150}
                    height={150}
                    className="rounded-lg max-w-[150px] h-[100px]"
                  />
                </td>
                <td className="p-3">
                  <h3 className="text-sm sm:text-lg font-semibold text-[#444444]">
                    {service?.title}
                  </h3>
                </td>
                <td className="p-3">
                  <h3 className="text-sm sm:text-lg font-semibold text-[#444444]">
                    ${service?.price}
                  </h3>
                </td>
                <td className="p-3">
                  <div className="text-sm sm:text-lg font-semibold text-[#444444]">
                    <Link
                      href={`/dashboard/admin/services/update-service/${service?._id}`}
                    >
                      <button className="text-2xl button">
                        <MdEditSquare />
                      </button>
                    </Link>
                  </div>
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
