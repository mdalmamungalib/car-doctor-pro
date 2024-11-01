"use client";
import React, { useState } from "react";
import Card from "components/Card/Card";
import HeadImage from "components/HomePage/HeadImage";
import axiosSecure from "lib/axios";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "components/LoadingPage/LoadingPage";
import { FaSearch } from "react-icons/fa";
export const dynamic = "force-dynamic";


const Page = () => {
  const [searchQuery, setSearchQuery] = useState("");

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

  if (isError) {
    return (
      <p className="mt-12 text-center text-red-500">
        Error: {error.message}
      </p>
    );
  }

  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-4">
      {/* Header Image */}
      <HeadImage title={"Service"} subtitle={"Our Service Area"} />

      {/* Search Input */}
      <div className="flex justify-center mt-12 mb-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md bg-white pl-10 w-full focus:outline-none focus:border-[#FF3811] transition duration-300 ease-in-out"
          />
          <FaSearch className="absolute text-gray-500 transform -translate-y-1/2 top-1/2 left-3" />
        </div>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 gap-6 mx-auto my-12 lg:grid-cols-3 sm:grid-cols-2">
        {filteredServices.length > 0 ? (
          filteredServices.map((service, index) => (
            <Card key={index} service={service} />
          ))
        ) : (
          <p className="text-center text-red-500 col-span-full">
            No services found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Page;
