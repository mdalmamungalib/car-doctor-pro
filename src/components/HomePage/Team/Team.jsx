"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { HiOutlineArrowRight, HiOutlineArrowLeft } from "react-icons/hi";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import HeadLayout from "components/shared/HeadLayout";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "lib/axios";
import LoadingPage from "components/LoadingPage/LoadingPage";
import Link from "next/link";

const Page = () => {
  const {
    data: members = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/api/get-team`);
      return response.data;
    },
  });

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    const initializeNavigation = () => {
      if (
        swiperRef.current &&
        swiperRef.current.swiper &&
        prevRef.current &&
        nextRef.current
      ) {
        const swiperInstance = swiperRef.current.swiper;

        swiperInstance.params.navigation.prevEl = prevRef.current;
        swiperInstance.params.navigation.nextEl = nextRef.current;

        swiperInstance.navigation.init();
        swiperInstance.navigation.update();
      }
    };

    const timer = setTimeout(initializeNavigation, 100);
    return () => clearTimeout(timer);
  }, [prevRef, nextRef, swiperRef]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <div>Error loading members: {error.message}</div>;
  }

  return (
    <div className="mt-[132px] px-4" data-aos="zoom-in">
      <HeadLayout
        headTitle="Members"
        title="Meet Our Members"
        description="The majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
      />

      {/* Wrapper for Swiper and Buttons */}
      <div className="relative max-w-full p-4 overflow-hidden ">
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
          }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
        >
          {members.map((member, index) => {
            const socials = [
              { icon: "/assets/icons/social/facebook.svg", link: member.facebook || "#" },
              { icon: "/assets/icons/social/twitter.svg", link: member.twitter || "#" },
              { icon: "/assets/icons/social/linkdin.svg", link: member.linkedin || "#" },
              { icon: "/assets/icons/social/instagram.svg", link: member.instagram || "#" },
            ];

            return (
              <SwiperSlide key={index}>
                <div className="mx-auto bg-white border border-gray-200 rounded-lg h-[500px] max-w-[364px]">
                  <figure className="p-4 sm:p-[20px] md:p-[25px] flex justify-center">
                    <Image
                      height={293}
                      width={314}
                      src={member.img}
                      alt="Member Image"
                      className="rounded-[10px] object-cover h-[293px] w-[314px]"
                    />
                  </figure>
                  <div className="px-4 pb-4 text-center space-y-[10px]">
                    <h2 className="font-bold text-[25px] text-[#444444]">{member.name}</h2>
                    <h4 className="text-xl font-semibold text-[#737373]">{member.jobTitle}</h4>
                    <div className="flex justify-center space-x-3">
                      {socials.map((social, i) => (
                        <Link key={i} href={social.link} target="_blank" rel="noopener noreferrer">
                          <Image
                            src={social.icon}
                            alt={`${social.link} icon`}
                            width={40}
                            height={40}
                            className="h-[40px] w-[40px]"
                          />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Navigation Buttons */}
        <div
          ref={prevRef}
          onClick={() => swiperRef.current.swiper.slidePrev()}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-[60px] h-[60px] flex justify-center items-center bg-[#F3F3F3] text-[#444444] hover:text-white hover:bg-[#FF3811] rounded-full cursor-pointer z-10"
        >
          <HiOutlineArrowLeft className="h-[24px] w-[24px]" />
        </div>
        <div
          ref={nextRef}
          onClick={() => swiperRef.current.swiper.slideNext()}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-[60px] h-[60px] flex justify-center items-center bg-[#F3F3F3] text-[#444444] hover:text-white hover:bg-[#FF3811] rounded-full cursor-pointer z-10"
        >
          <HiOutlineArrowRight className="h-[24px] w-[24px]" />
        </div>
      </div>
    </div>
  );
};

export default Page;
