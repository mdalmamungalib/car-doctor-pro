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

const Testimonial = () => {
  const testimonials = [
    {
      name: "John Doe",
      productName: "Premium Headphones",
      description:
        "These headphones are fantastic! The sound quality is exceptional, and they're incredibly comfortable to wear for long periods. Highly recommend them!",
      ratingValue: 4,
      userImage:
        "https://images.pexels.com/photos/28578372/pexels-photo-28578372/free-photo-of-portrait-of-senior-man-with-beard-and-chain.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Jane Smith",
      productName: "Smart Watch",
      description:
        "I love this smartwatch. It has all the features I need and looks great on my wrist. The battery life is impressive too.",
      ratingValue: 5,
      userImage:
        "https://images.pexels.com/photos/28578372/pexels-photo-28578372/free-photo-of-portrait-of-senior-man-with-beard-and-chain.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Alice Johnson",
      productName: "Yoga Mat",
      description:
        "This yoga mat is perfect for my daily workouts. It provides great cushioning and grip. The color options are also a nice touch!",
      ratingValue: 3,
      userImage:
        "https://images.pexels.com/photos/28578372/pexels-photo-28578372/free-photo-of-portrait-of-senior-man-with-beard-and-chain.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Michael Brown",
      productName: "Bluetooth Speaker",
      description:
        "The sound quality of this Bluetooth speaker is top-notch. It's portable and has a long battery life. Ideal for both home and outdoor use.",
      ratingValue: 4,
      userImage:
        "https://images.pexels.com/photos/28578372/pexels-photo-28578372/free-photo-of-portrait-of-senior-man-with-beard-and-chain.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Emily Davis",
      productName: "Fitness Tracker",
      description:
        "This fitness tracker is a game-changer. It accurately tracks my workouts and provides insightful health metrics. The design is sleek and modern.",
      ratingValue: 5,
      userImage:
        "https://images.pexels.com/photos/28578372/pexels-photo-28578372/free-photo-of-portrait-of-senior-man-with-beard-and-chain.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "William Harris",
      productName: "Electric Toothbrush",
      description:
        "The electric toothbrush has significantly improved my oral hygiene. It has multiple brushing modes and a long-lasting battery. Worth every penny!",
      ratingValue: 4,
      userImage:
        "https://images.pexels.com/photos/28578372/pexels-photo-28578372/free-photo-of-portrait-of-senior-man-with-beard-and-chain.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  
  useEffect(() => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;

      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;

      // Manually update the navigation buttons
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperRef, prevRef, nextRef]);

  return (
    <div className="my-[132px] px-4 ">
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
                            src={testimonial?.userImage}
                            alt="Image"
                            width={60}
                            height={60}
                            className="w-[60px] h-[60px] rounded-full"
                          />
                        </div>
                        <div>
                          <h2 className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[25px] font-bold text-[#444444]">
                            {testimonial?.name}
                          </h2>
                          <h4 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[20px] font-semibold text-[#737373] mt-[10px]">
                            {testimonial?.productName}
                          </h4>
                        </div>
                      </div>
                      <div className="pr-[40px] md:pr-[80px] lg:pr-[106px]">
                        <Image
                          src={"/assets/icons/quote.svg"}
                          alt="image"
                          width={56}
                          height={56}
                          className="w-[56px] h-[56px]"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-5">
                    <p className="text-sm sm:text-base md:text-[16px] lg:text-base font-normal text-[#737373] leading-[25px] md:leading-[28px] lg:leading-[30px] capitalize">
                      {testimonial?.description}
                    </p>
                    <div className="flex mt-5 space-x-1">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            className={`w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 ${
                              i < testimonial.ratingValue
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M10.788 3.21009C11.236 2.13309 12.764 2.13309 13.212 3.21009L15.294 8.21709L20.698 8.65009C21.862 8.74309 22.334 10.1951 21.447 10.9551L17.33 14.4821L18.587 19.7551C18.858 20.8911 17.623 21.7881 16.627 21.1801L12 18.3541L7.373 21.1801C6.377 21.7881 5.142 20.8901 5.413 19.7551L6.67 14.4821L2.553 10.9551C1.666 10.1951 2.138 8.74309 3.302 8.65009L8.706 8.21709L10.788 3.21109V3.21009Z"
                              fill={
                                i < testimonial.ratingValue
                                  ? "#FF912C"
                                  : "#E5E7EB"
                              }
                            />
                          </svg>
                        ))}
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

export default Testimonial;
