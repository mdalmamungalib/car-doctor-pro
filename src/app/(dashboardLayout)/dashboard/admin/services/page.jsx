"use client";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "components/LoadingPage/LoadingPage";
import axiosSecure from "lib/axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const Page = () => {
  const [dropdownOpen, setDropdownOpen] = useState({});

  const toggleDropdown = (id) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const {
    data: services = [],
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

  const handleStatusUpdate = (id, status) => {
    console.log(`Service ${id} status updated to ${status}`);
    setDropdownOpen((prevState) => ({ ...prevState, [id]: false }));
    // Implement the API call to update the service status here
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
      <div className="w-full mt-8 overflow-x-auto">
        <table className="min-w-full border-collapse table-auto">
          <thead>
            <tr className="text-sm font-semibold text-left text-gray-700 bg-gray-100">
              <th className="p-3">Delete</th>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Edit</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="p-3">
                  <button
                    onClick={() => handleDeleteUser(service?._id)}
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
                    <button
                      onClick={() => handleMakeAdmin(user?._id)}
                      className="text-2xl button"
                    >
                      <MdEditSquare />
                    </button>
                  </div>
                </td>
                <td className="relative p-3">
                  <button
                    onClick={() => toggleDropdown(service._id)}
                    className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none"
                  >
                    {service.status || "Pending"}
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
                  {dropdownOpen[service._id] && (
                    <div className="absolute right-0 w-40 mt-2 bg-white rounded-lg shadow-lg">
                      <div className="py-1">
                        <button
                          onClick={() =>
                            handleStatusUpdate(
                              service._id,
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
                              service._id,
                              "Approved"
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

export default Page;
