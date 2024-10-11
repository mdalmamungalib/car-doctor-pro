"use client";
import HeadImage from "components/HomePage/HeadImage";
import ServiceSide from "components/ServiceSide/ServiceSide";
import Image from "next/image";

import React, { useEffect, useState } from "react";
import LoadingPage from "components/LoadingPage/LoadingPage";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "lib/axios";

const Page = ({ params }) => {
  const [singleService, setSingleService] = useState(null);
  
  
  const fetchServiceById = async (id) => {
    const response = await axiosSecure.get(`/services/api/${id}`);
    return response.data;
  };
  // Fetch services using React Query
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

  useEffect(() => {
    const fetchService = async () => {
      try {
        const serviceData = await fetchServiceById(params.id); // Assuming params.id is passed to the component
        setSingleService(serviceData); // Set fetched service to state
        console.log("Fetched service by id:", serviceData);
      } catch (error) {
        console.error("Error fetching service by id:", error);
      }
    };

    if (params.id) {
      // Ensure there's an id before fetching
      fetchService(); // Call the async function inside useEffect
    }
  }, [params.id]);

  // Handle loading and error states
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
  
  console.log("singleService", singleService)

  const step = [
    {
      selection: "01",
      title: "Step One",
      description: "It uses a dictionary of over 200 .",
    },
    {
      selection: "01",
      title: "Step Two",
      description: "It uses a dictionary of over 200 .",
    },
    {
      selection: "03",
      title: "Step Three",
      description: "It uses a dictionary of over 200 .",
    },
  ];

  const singleServices = [
    {
      name: "Instant Car Services",
      details:
        "Quick and efficient car services available whenever you need them, ensuring that your vehicle is back on the road in no time.",
    },
    {
      name: "24/7 Quality Service",
      details:
        "Round-the-clock support to address any car-related emergencies, providing you with quality service at any hour.",
    },
    {
      name: "Easy Customer Service",
      details:
        "A seamless customer service experience designed to make scheduling, updates, and inquiries as simple and hassle-free as possible.",
    },
    {
      name: "Quality Cost Service",
      details:
        "Get the best value for your money with services designed to provide top-notch quality at competitive rates.",
    },
  ];

  return (
    <div className="mb-[130px]">
      <HeadImage
        title={"Service Details"}
        subtitle={singleService?.title}
      />

      {/* card detail */}
      <div className="flex flex-col lg:flex-row mt-[130px] gap-8">
        {/* Image Section - 70% */}
        <div className="flex-grow lg:basis-[70%]">
          <div className="relative w-full h-[400px]">
            <Image
              src={singleService?.img}
              alt={singleService?.title || "Service Image"}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
              unoptimized
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold mt-[50px]">
              {singleService?.title}
            </h1>
            <p className="text-base font-normal text-[#737373] mt-[30px]">
              {singleService?.description}
            </p>
          </div>
          <div className="mt-[30px] grid grid-cols-1 sm:grid-cols-2 justify-items-center gap-6 ">
            {singleServices?.map((facility, index) => (
              <div
                key={index}
                className="max-w-[364px] min-h-[204] bg-[#F3F3F3] p-[42px] rounded-[10px] border-t-2 border-[#FF3811]"
              >
                <h4 className="text-xl font-bold text-[#444444]">
                  {facility?.name}
                </h4>
                <p className="text-base font-normal text-[#737373] mt-2">
                  {facility?.details}
                </p>
              </div>
            ))}
          </div>
          <div>
            <p className="text-base font-normal text-[#737373] mt-[30px]">
              We offer reliable and efficient car services to keep
              your vehicle running smoothly. Whether you need
              routine maintenance, oil changes, brake repairs, or
              more extensive diagnostics, our certified technicians
              ensure top-quality service every time. We pride
              ourselves on fast, transparent work, using the latest
              tools to guarantee your car's safety and performance.
              With customer satisfaction as our priority, you can
              trust us to deliver honest pricing and exceptional
              care for your vehicle. Book your service today and
              experience the difference!
            </p>
          </div>
          <div>
            <h1 className="text-4xl font-bold mt-[50px]">
              3 Simple Steps to Process
            </h1>
            <p className="text-base font-normal text-[#737373] mt-[30px]">
              There are many variations of passages of Lorem Ipsum
              available, but the majority have suffered alteration
              in some form, by injected humour, or randomised words
              which don't look even slightly believable. If you are
              going to use a passage of Lorem Ipsum, you need to be
              sure there isn't anything embarrassing hidden in the
              middle of text
            </p>
          </div>

          {/* step */}
          <div className="flex flex-wrap justify-center gap-4 mt-[30px]">
            {step.map((step, index) => (
              <div
                key={index}
                className="space-y-5 max-w-[235px] min-h[275px]  border-[1px] border-[#E8E8E8] rounded-[10px] p-[36px]"
              >
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="83"
                    height="83"
                    viewBox="0 0 83 83"
                    fill="none"
                  >
                    <circle
                      cx="41.5"
                      cy="41.5"
                      r="41.5"
                      fill="#FF3811"
                      fill-opacity="0.1"
                    />

                    <circle
                      cx="41.5"
                      cy="41.5"
                      r="27.9795"
                      fill="#FF3811"
                    />

                    <text
                      x="50%"
                      y="50%"
                      text-anchor="middle"
                      dy=".3em"
                      fill="#FFFFFF"
                      font-size="16"
                      font-family="Arial, sans-serif"
                      font-weight="bold"
                    >
                      {step?.selection}
                    </text>
                  </svg>
                </div>

                <h3 className="text-xl font-bold text-[#151515] text-center">
                  {step?.title}
                </h3>
                <p className="text-base font-normal text-[#737373] text-center ">
                  {step?.description}
                </p>
              </div>
            ))}
          </div>

          {/* video */}
          <div className="flex justify-center mt-[30px] w-full max-w-[752px] h-[400px] rounded-[10px]">
            <div className="relative w-full h-full ">
              <iframe
                src="https://www.youtube.com/embed/BjX79GsALd8"
                title="Video title"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full rounded-[10px]"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Additional Content Section - 30% */}
        <div className="flex-grow lg:basis-[30%]">
          <ServiceSide
            services={services}
            service={singleService}
            params={params}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
