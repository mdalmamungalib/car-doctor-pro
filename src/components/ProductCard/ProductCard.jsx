import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

const ProductCard = ({ service }) => {
  const { price, img, title, _id } = service;
  return (
    <div className="bg-white border border-gray-200 rounded-lg max-w-full sm:max-w-[300px] md:max-w-[340px] lg:max-w-[364px] min-h-[348px] mx-auto">
      <figure className="p-4 sm:p-[20px] md:p-[25px]">
        <Image
          height={250}
          width={364}
          src={img}
          alt={title}
          className="rounded-[10px] object-cover w-[364px]  h-[250px]"
        />
      </figure>
      <div className="px-4 pb-4 space-y-2 text-center sm:px-5 md:px-6 sm:pb-5 md:pb-6">
        <div className="gap-1 rating">
          <input
            name="rating-2"
            className="bg-orange-400 mask mask-star-2"
          />
          <input
            name="rating-2"
            className="bg-orange-400 mask mask-star-2"
            defaultChecked
          />
          <input
            name="rating-2"
            className="bg-orange-400 mask mask-star-2"
          />
          <input
            name="rating-2"
            className="bg-orange-400 mask mask-star-2"
          />
          <input
            name="rating-2"
            className="bg-orange-400 mask mask-star-2"
          />
        </div>
        <h2 className="text-xl font-semibold sm:text-xl md:text-2xl">
          {title}
        </h2>
        <h4 className="text-xl font-bold text-[#FF3811]">${price}</h4>
      </div>
      
    </div>
  );
};

export default ProductCard;
