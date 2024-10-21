"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import {
  HiOutlineArrowRight,
  HiOutlineArrowLeft,
} from "react-icons/hi";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import HeadLayout from "components/shared/HeadLayout";

const Team = () => {
  const members = [
    {
      name: "John Doe",
      position: "Senior Software Engineer",
      image:
        "https://images.pexels.com/photos/5835585/pexels-photo-5835585.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Jane Smith",
      position: "Product Manager",
      image:
        "https://images.pexels.com/photos/5835585/pexels-photo-5835585.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Michael Johnson",
      position: "UX/UI Designer",
      image:
        "https://images.pexels.com/photos/5835585/pexels-photo-5835585.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Emily Davis",
      position: "Marketing Specialist",
      image:
        "https://images.pexels.com/photos/5835585/pexels-photo-5835585.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "David Brown",
      position: "DevOps Engineer",
      image:
        "https://images.pexels.com/photos/5835585/pexels-photo-5835585.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Sophia Wilson",
      position: "Frontend Developer",
      image:
        "https://images.pexels.com/photos/5835585/pexels-photo-5835585.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const swiper = document.querySelector(".swiper").swiper;

    if (prevRef.current && nextRef.current) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, []);

  return (
    <div className="mt-[132px] px-4 relative overflow-visible" data-aos="zoom-in">
    <HeadLayout
      headTitle="Team"
      title="Meet Our Team"
      description="The majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
    />

    {/* Swiper Wrapper */}
    <div className="relative overflow-visible">
      {/* Swiper Component */}
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        }}
      >
        {members.map((member, index) => (
          <SwiperSlide key={index}>
            <div className="mx-auto bg-white border border-gray-200 rounded-lg min-h-[487px] max-w-[364px]">
              <figure className="p-4 sm:p-[20px] md:p-[25px] flex justify-center">
                <Image
                  height={293}
                  width={314}
                  src={member?.image}
                  alt={"image"}
                  className="rounded-[10px] object-cover h-[293px] w-[314px]"
                />
              </figure>
              <div className="px-4 pb-4 text-center sm:px-5 md:px-6 sm:pb-5 md:pb-6">
                <h2 className="font-bold text-[25px] text-[#444444]">
                  {member?.name}
                </h2>
                <h4 className="text-xl font-semibold text-[#737373] mt-[10px]">
                  {member?.position}
                </h4>
                <div className="flex justify-center space-x-3 mt-[15px]">
                  <Image
                    src={"/assets/icons/social/facebook.svg"}
                    alt="svg icon"
                    width={40}
                    height={40}
                    className="h-[40px] w-[40px]"
                  />
                  <Image
                    src={"/assets/icons/social/twitter.svg"}
                    alt="svg icon"
                    width={40}
                    height={40}
                    className="h-[40px] w-[40px]"
                  />
                  <Image
                    src={"/assets/icons/social/linkdin.svg"}
                    alt="svg icon"
                    width={40}
                    height={40}
                    className="h-[40px] w-[40px]"
                  />
                  <Image
                    src={"/assets/icons/social/instagram.svg"}
                    alt="svg icon"
                    width={40}
                    height={40}
                    className="h-[40px] w-[40px]"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div
        ref={prevRef}
        className="custom-prev w-[60px] h-[60px] flex justify-center items-center text-[#444444] hover:text-[#FFFFFF] bg-[#F3F3F3] hover:bg-[#FF3811] rounded-full cursor-pointer absolute -left-[30px] top-1/2 transform -translate-y-1/2 z-10"
      >
        <HiOutlineArrowLeft className="h-[24px] w-[24px]" />
      </div>
      <div
        ref={nextRef}
        className="custom-next w-[60px] h-[60px] flex justify-center items-center text-[#444444] hover:text-[#FFFFFF] bg-[#F3F3F3] hover:bg-[#FF3811] rounded-full cursor-pointer absolute -right-[30px] top-1/2 transform -translate-y-1/2 z-10"
      >
        <HiOutlineArrowRight className="h-[24px] w-[24px]" />
      </div>
    </div>
  </div>
  );
};

export default Team;
