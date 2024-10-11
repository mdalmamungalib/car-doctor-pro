"use client"
import Image from "next/image";
import React from "react";

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center gap-8 mt-32 lg:flex-row ">
      <div className="relative lg:w-1/2">
        <Image
          width={1000}
          height={1000}
          alt="Person image"
          src={"/assets/images/about_us/person.jpg"}
          className="w-3/4 rounded-lg shadow-2xl"
        />
        <Image
          width={1000}
          height={1000}
          alt="Part image"
          src={"/assets/images/about_us/parts.jpg"}
          className="absolute w-1/2 border-8 border-white rounded-lg shadow-2xl right-5 top-1/2"
        />
      </div>
      <div className="flex flex-col justify-center px-5">
        <h4 className="text-xl font-bold text-[#FF3811]">About Us</h4>
        <h2 className="text-[45px] font-bold max-w-[376px] text-[#151515] mt-5">
          We are qualified & of experience in this field
        </h2>
        <p className="text-base font-normal text-[#737373] max-w-[489px] mt-[30px]">
          There are many variations of passages of Lorem Ipsum
          available, but the majority have suffered alteration in
          some form, by injected humour, or randomised words which
          don't look even slightly believable.
        </p>
        <p className="text-base font-normal text-[#737373] max-w-[489px] mt-5">
          The majority have suffered alteration in some form, by
          injected humour, or randomised words which don't look even
          slightly believable.
        </p>
        <div className="mt-[30px]">
          <button className=" border-[#FF3811] hover:border-[#FF3811] bg-[#FF3811] hover:bg-[#FF3811] text-white px-5 py-3 rounded hover:scale-105 focus:outline-none focus:ring-opacity-50">
            Get More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
