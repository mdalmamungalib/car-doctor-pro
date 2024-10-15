import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
export const dynamic = "force-dynamic";

const Card = ({ service }) => {
  const { price, img, title, _id } = service;
  return (
    <div className="bg-white border border-gray-200 rounded-lg max-w-full sm:max-w-[300px] md:max-w-[340px] lg:max-w-[364px] min-h-[348px] mx-auto">
      <figure className="p-4 sm:p-[20px] md:p-[25px]">
        <Image
          height={208}
          width={314}
          src={img}
          alt={title}
          className="rounded-[10px] object-cover h-[208px] w-[314px]"
        />
      </figure>
      <div className="px-4 pb-4 sm:px-5 md:px-6 sm:pb-5 md:pb-6">
        <h2 className="mb-2 text-xl font-semibold sm:mb-3 md:mb-4 sm:text-xl md:text-2xl">
          {title}
        </h2>
        <div className="flex items-center justify-between">
          <h4 className="text-xl font-bold text-[#FF3811]">Price: ${price}</h4>
          <Link href={`/services/${_id}`}>
            <FaArrowRight className="text-[#FF3811] hover:text-red-500 transition duration-300 ease-in-out cursor-pointer" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
