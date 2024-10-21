"use client";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "components/LoadingPage/LoadingPage";
import axiosSecure from "lib/axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import React from "react";
import { GoArrowRight } from "react-icons/go";
import { HiOutlineDocumentChartBar } from "react-icons/hi2";

export const dynamic = "force-dynamic";

const ServiceSide = ({ services,  params }) => {
  const currentPath = usePathname(); // Get the current pathname
  
  const {
    data: service = {},
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["service", params?.id],
    queryFn: async () => {
      const response = await axiosSecure.get(`/services/api/${params?.id}`);
      return response.data;
    },
  });
  
  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="space-y-[30px] ">
      {/* services section */}
      <div className="rounded-[10px] bg-[#F3F3F3] p-10 h-full ">
        <h3 className="mb-5 text-2xl font-bold text-black">
          Services
        </h3>
        {services.map((service, index) => (
          <Link href={`/services/${service._id}`} key={index}>
            <div
              className={`p-[18px] rounded-[5px] flex justify-between items-center group ${
                currentPath === `/services/${service._id}`
                  ? "bg-[#FF3811] text-white"
                  : "bg-white hover:bg-[#FF3811] group"
              } ${index > 0 ? "mt-5" : ""}`}
            >
              <h1
                className={
                  currentPath === `/services/${service._id}`
                    ? "text-white"
                    : "text-black group-hover:text-white"
                }
              >
                {service.title}
              </h1>

              <GoArrowRight
                className={`${
                  currentPath === `/services/${service._id}`
                    ? "text-white text-2xl"
                    : "text-[#FF3811] group-hover:text-white text-2xl"
                }`}
              />
            </div>
          </Link>
        ))}
      </div>

      {/* document download section */}
      <div className="w-full h-full rounded-[10px] bg-black p-10">
        <h1 className="mb-5 text-2xl font-bold text-white">
          Download
        </h1>
        <div className="flex items-center justify-between mb-5">
          {" "}
          {/* Add mb-5 */}
          <div className="flex gap-[10px] items-center">
            <HiOutlineDocumentChartBar className="text-3xl text-white" />
            <div>
              <h5 className="text-lg font-semibold text-white">
                Our Brochure
              </h5>
              <p className="text-base font-normal text-[#A2A2A2]">
                Download
              </p>
            </div>
          </div>
          <button className="button w-[56px] h-[56px] text-2xl">
            <GoArrowRight />
          </button>
        </div>
        <div className="flex items-center justify-between">
          {" "}
          {/* Second div */}
          <div className="flex gap-[10px] items-center">
            <HiOutlineDocumentChartBar className="text-3xl text-white justify-items-center" />
            <div>
              <h5 className="text-lg font-semibold text-white">
                Our Brochure
              </h5>
              <p className="text-base font-normal text-[#A2A2A2]">
                Download
              </p>
            </div>
          </div>
          <button className="button w-[56px] h-[56px] text-2xl">
            <GoArrowRight />
          </button>
        </div>
      </div>
      {/* logo card */}
      <div className="w-full h-full rounded-[10px] bg-black p-12 flex flex-col justify-center items-center">
        <div className="flex flex-col items-center text-center">
          <Image
            width={133}
            height={72}
            src={"/assets/car.svg"}
            alt="logo"
          />
          <h2 className="text-[27px] font-bold text-white">
            Car Doctor
          </h2>
          <h3 className="mt-5 text-xl font-bold text-white">
            Need Help? We Are Here To Help You
          </h3>
        </div>
        <div
          className="relative max-w-[270px] min-h-[126px] mt-[30px]
    bg-white rounded-[10px] px-11 py-5 text-center"
        >
          <h2 className="text-xl font-bold text-black whitespace-nowrap">
            <span className="text-[#FF3811]">Car Doctor</span>{" "}
            Special
          </h2>

          <h3 className="text-base font-bold text-[#737373] mt-3">
            Save up to{" "}
            <span className="text-[#FF3811]">60% off</span>
          </h3>

          {/* Button positioned to overlap the card */}
          <button className="absolute left-1/2 bottom-[-25px] transform -translate-x-1/2 button whitespace-nowrap">
            Get A Quote
          </button>
        </div>
      </div>

      {/* price section */}
      <div>
        <h1 className="text-4xl font-bold text-black">
          Price ${service?.price}
        </h1>
      </div>
      <div>
        <Link href={`/checkout/${service?._id}`}>
          <button className="w-full border-[#FF3811] hover:border-[#FF3811] bg-[#FF3811] hover:bg-[#FF3811] text-white px-5 py-3 rounded hover:scale-105 focus:outline-none focus:ring-opacity-50">
            Proceed Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceSide;
