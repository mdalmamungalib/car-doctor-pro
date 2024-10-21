"use client";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import {
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
} from "react-icons/hi";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import HeadLayout from "components/shared/HeadLayout";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "lib/axios";
import LoadingPage from "components/LoadingPage/LoadingPage";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
export const dynamic = "force-dynamic";

const Testimonial = () => {
  const {
    data: testimonials = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/api/get-testimonial`);
      return response.data;
    },
  });

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  // Initialize Swiper navigation
  useEffect(() => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;

      // Ensure navigation buttons are set correctly
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;

      // Initialize and update navigation
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperRef]);

  const StarDrawing = (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.788 3.21009C11.236 2.13309 12.764 2.13309 13.212 3.21009L15.294 8.21709L20.698 8.65009C21.862 8.74309 22.334 10.1951 21.447 10.9551L17.33 14.4821L18.587 19.7551C18.858 20.8911 17.623 21.7881 16.627 21.1801L12 18.3541L7.373 21.1801C6.377 21.7881 5.142 20.8901 5.413 19.7551L6.67 14.4821L2.553 10.9551C1.666 10.1951 2.138 8.74309 3.302 8.65009L8.706 8.21709L10.788 3.21109V3.21009Z"
      fill="#FF912C"
    />
  );

  const customStyles = {
    itemShapes: StarDrawing,
    activeFillColor: "#FF912C",
    inactiveFillColor: "#E5E7EB",
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="my-[132px] px-4 " data-aos="zoom-in-up">
      <HeadLayout
        headTitle="Testimonial"
        title="What Customer Says"
        description="The majority have suffered alteration in some form, by
          injected humour, or randomised words which don't look even
          slightly believable."
      />
      <div className="relative overflow-visible mt-[50px]">
        {/* Swiper Component */}
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
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-center">
                <div className="p-6 md:py-8 md:px-10 lg:py-10 lg:px-12 border rounded-[10px] border-[#F3F3F3] w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[558px] h-[349px]">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-5">
                        <div className="rounded-[60px]">
                          <Image
                            src={testimonial?.userImg}
                            alt="User Image"
                            width={60}
                            height={60}
                            className="w-[60px] h-[60px] rounded-full"
                          />
                        </div>
                        <div>
                          <h2 className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[25px] font-bold text-[#444444]">
                            {testimonial?.userName}
                          </h2>
                          <h4 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[20px] font-semibold text-[#737373] mt-[10px]">
                            {testimonial?.position}
                          </h4>
                        </div>
                      </div>
                      <div className="pr-[40px] md:pr-[80px] lg:pr-[106px]">
                        <Image
                          src={"/assets/icons/quote.svg"}
                          alt="Quote Icon"
                          width={56}
                          height={56}
                          className="w-[56px] h-[56px]"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-5">
                  <p className="text-sm sm:text-base md:text-[16px] lg:text-base font-normal text-[#737373] leading-[25px] md:leading-[28px] lg:leading-[30px] capitalize overflow-auto max-h-[80px]">
                      {testimonial?.description}
                    </p>
                    <div className="flex mt-5 space-x-1">
                      <Rating
                        style={{ maxWidth: 120 }}
                        value={testimonial?.rating}
                        itemStyles={customStyles}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Custom Navigation Buttons */}
        <div
          ref={prevRef}
          onClick={() => swiperRef.current.swiper.slidePrev()}
          className="custom-prev w-[60px] h-[60px] flex justify-center items-center text-[#444444] hover:text-[#FFFFFF] bg-[#F3F3F3] hover:bg-[#FF3811] rounded-full cursor-pointer absolute -left-[30px] top-1/2 transform -translate-y-1/2 z-10"
        >
          <HiOutlineArrowLeft className="h-[24px] w-[24px]" />
        </div>
        <div
          ref={nextRef}
          onClick={() => swiperRef.current.swiper.slideNext()}
          className="custom-next w-[60px] h-[60px] flex justify-center items-center text-[#444444] hover:text-[#FFFFFF] bg-[#F3F3F3] hover:bg-[#FF3811] rounded-full cursor-pointer absolute -right-[30px] top-1/2 transform -translate-y-1/2 z-10"
        >
          <HiOutlineArrowRight className="h-[24px] w-[24px]" />
        </div>
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

export default Testimonial;
